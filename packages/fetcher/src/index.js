import {parse, stringify, stringifyParameter} from 'util/url';
import {abort} from 'util/promise';
import {whichDevice} from 'util/device';
import constant from 'constant';

const {ios, android, isLCAPP, mobile} = whichDevice();
let message = null;
if (mobile) {
    // eslint-disable-next-line
    require('antd-mobile/lib/toast/style/css');
    // eslint-disable-next-line
    message = require('antd-mobile/lib/toast');
    message.error = message.fail;
} else {
    // eslint-disable-next-line
    require('antd/lib/message/style/css');
    // eslint-disable-next-line
    message = require('antd/lib/message').default;
}
const LOGIN_URL = constant.login;

class DataFormatError extends Error {
    constructor(errorMessage = '数据错误') {
        super();
        this.message = 'data format Error';
        this.errorMessage = errorMessage;
    }
}

const {toString} = Object.prototype;

/**
 * 使用fetcher下载文件
 * @param url
 * @param option
 * @param option.method
 * @param option.body
 * @param option.headers
 */
export function downloadWithFetcher(url, option = {}) {
    return oriFetch(url, option).then(res => res.blob().then(blob => {
        const a = document.createElement('a');
        const url = window.URL.createObjectURL(blob);
        const filename = res.headers.get('Content-Disposition');
        a.download = filename ? decodeURIComponent(/filename=(.+)/.exec(filename)[1]) : filename;
        a.href = url;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        window.URL.revokeObjectURL(url);
    }));
}

/**
 * 用于需要原始返回数据的情况
 * @param url
 * @param option
 * @param option.method
 * @param option.body
 * @param option.headers
 */
export function oriFetch(url, option = {}) {
    delete option.format;
    const method = (option.method || 'get').toLowerCase();
    let o = {};
    let contentType = '';
    // 针对不同请求方式 添加请求头 或 参数处理
    switch (method) {
        case 'get':
            // get、delete 请求 body 可以传入一个对象
            if (typeof option.body !== 'object') break;
            o = parse(url);
            o.query = Object.assign(o.query, option.body);
            delete option.body;
            url = stringify(o);
            break;
        case 'post':
        case 'put':
        case 'delete':
            // post、put 请求 根据请求头类型自动处理 body
            if (option.FormData || option.body instanceof FormData) {
                for (const i in option.body) {
                    if (option.body[i] === undefined) delete option.body[i];
                }
                break;
            }
            contentType = (option.headers && option.headers['Content-Type']) || '';
            if (~(contentType.toLowerCase().indexOf('x-www-form-urlencoded'))) {
                option.body = stringifyParameter(option.body);
            } else {
                option.body = JSON.stringify(option.body);
                option.headers = option.headers || {};
                option.headers['Content-Type'] = 'application/json';
            }
            break;
        default:
            break;
    }

    option = {
        credentials: 'same-origin',
        ...option,
    };

    // 请求头带上Token
    if (window.token) {
        option.headers = option.headers || {};
        option.headers.Token = window.token;
    }

    return fetch(url, option);
}

/**
 * 附带展示错误信息的fetch, 插入，更新，删除使用接口自带信息提示，获取使用自定义信息提示
 * @param url
 * @param option
 * @param eMsg {String|Object|Function}
 * 可选值：array/object/string/boolean/number/null/自定义错误信息/data=>String
 * @returns {*}
 */
export function fetcherWithMsg(url, option = {}, eMsg) {
    return fetcher(url, option).then(data => {
        if (data && !data.success) {
            // 业务端用errorMessage，基础服务貌似用的errorMsg
            let msg = data.errorMessage || data.errorMsg;
            if (msg === '系统异常' || !msg) {
                msg = '操作失败';
            }

            eMsg = typeof eMsg === 'function' ? eMsg(data) : eMsg;

            if (data.errorCode === 'B10') {
                eMsg = '没有权限';
            }

            message.error(eMsg || msg);
        }

        return data;
    });
}

/**
 * 一般接口
 * @param url
 * @param option
 * @param option.method
 * @param option.body
 * @param option.headers
 * @param format  {String|Object}   String 类型，值为 format.type
 *  1. 验证数据格式 {success, result}
 *  2. 验证 data.result 数据类型
 * @param format.type       String  数据类型，array/object/string/boolean/number/null
 * @param format.message    String  默认：''，数据类型验证失败提示
 * @param format.complete   Boolean 默认：true，data.result 为 null 时，根据 format.type 补全默认数据
 */
let timeSpan = 0;
const typeSet = new Set(['array', 'object', 'string', 'boolean', 'number', 'null']);
const typeDefault = {
    array: [],
    object: {},
    string: '',
    null: null,
};
export default function fetcher(url, option = {}, format) {
    // 登录过期回调
    const errorCallback = data => {
        try {
            if (isLCAPP) {
                if (android) {
                    window.jsObj.loginApp();
                }
                if (ios) {
                    window.webkit.messageHandlers
                        .loginApp.postMessage({});
                }
            } else {
                window.location.href = `${LOGIN_URL}?redirect=${
                    encodeURIComponent(window.location.href)}`;
            }
            return data;
        } catch (e) {
            // console.log('device', e);
        }
    };

    return abort(() => oriFetch(url, option)
        .then(res => res.json())
        .then(data => { // 传入 format 参数 会进行数据格式验证
            // 字符串类型且在
            if (typeof format === 'string' && typeSet.has(format)) {
                format = {type: format};
            }

            // format.type 为可选值时才进行格式校验
            if (typeof format !== 'object' || !typeSet.has(format.type)) return data;

            const {complete = true, type} = format;
            const dataFormatError = new DataFormatError(format.message);

            // 字段验证 success result
            if (toString.call(data) !== '[object Object]'
                || !('success' in data)
                || !('result' in data)
            ) {
                throw dataFormatError;
            }

            // data.success 为 false 交给业务端处理
            if (!data.success) return data;

            // data.result 数据类型验证
            const dataType = toString.call(data.result).toLowerCase();

            // data.result 类型不正确
            if (dataType !== `[object ${type}]`) {
                // data.result 必须是指定的类型
                // data.result 不是 null 或 undefined(一般不可能)
                if (complete === false || data.result != null) {
                    throw dataFormatError;
                }

                // success 为true，result 为null或undefined 说明后端已经处理，但是没设默认值
                // 设置默认值
                data.result = typeDefault[type];
            }

            return data;
        })
        .then(data => {
            if (data.errorCode === 'LOGIN_ERROR' || data.errorCode === 'C10') {
                return message.error(
                    '登录信息过期，请重新登录', 1.5,
                    () => errorCallback(data),
                );
            }

            if (data.errorMessage === '登录失败' && process.env.ori) {
                return setTimeout(() => {
                    window.location.href = `/login.html?last=${window.location.href}`;
                }, 1000);
            }

            return data;
        })
        .catch(e => {
            console.log('fetcher error >> ', e);
            // 合并错误提示
            if (new Date() - timeSpan < 3000) return;
            timeSpan = new Date().getTime();
            message.error(e.constructor === DataFormatError ? e.errorMessage : '网络错误');
        }))();
}

/**
 * 接口要提交form形式的参数
 * @param url
 * @param option
 * @returns {*}
 */
export function fetcherForm(url, option = {}) {
    option.headers = option.headers || {};
    option.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=gbk';
    return fetcher(url, option);
}

let count = 0;

function noop() {}

/**
 * jsonp 请求
 * @param opts {Object}
 * @param opts.url {String} 请求路径
 * @param opts.data {Object} 请求参数
 * @param opts.withoutTime {boolean} 是否加时间戳  默认：true
 * @param opts.name {String} 回调函数名 若缺省则取 data.callback
 * @param opts.timeout {Number} 超时事件
 * @param fn
 */
export function jsonp(opts, fn) {
    const data = opts.data || {};
    const id = opts.name || data.callback || `callback_${count += 1}`;
    const timeout = opts.timeout != null ? opts.timeout : 16000;
    // enc = encodeURIComponent,
    const target = document.getElementsByTagName('script')[0] || document.head;
    const script = document.createElement('script');

    let timer;
    let {url} = opts;
    let params = opts.withoutTime === false ? [] : [`_t=${new Date() - 0}`];

    if (!opts.url) return fn(new Error('url required'));

    // timeout 不是 falsy
    if (timeout) {
        timer = setTimeout(() => {
            cleanup();
            if (fn) fn(new Error('Timeout'));
        }, timeout);
    }

    // 封装jsonp 回调函数
    window[id] = data => {
        cleanup();
        if (fn) fn(null, data);
    };

    for (const i in data) {
        if (Object.prototype.hasOwnProperty.call(data, i)) {
            typeof data[i] !== 'undefined' && params.push(`${i}=${data[i]}`);
        }
    }

    params = params.join('&');
    url += `${~url.indexOf('?') ? '&' : '?'}${params}`;
    url = url.replace('?&', '?');

    // script标签
    script.src = url;
    target.parentNode.insertBefore(script, target);

    function cleanup() {
        if (script.parentNode) script.parentNode.removeChild(script);
        // 防止响应时报错
        window[id] = noop;
        if (timer) clearTimeout(timer);
    }

    // 取消
    function cancel() {
        if (window[id]) {
            cleanup();
        }
    }

    return cancel;
}

/**
 * 对JSONP请求封装Promise
 * @param opts
 * @returns {Promise<any>}
 */
export function jsonPromise(opts) {
    return new Promise((resolve, reject) => {
        jsonp(opts, (err, data) => {
            if (err) return reject(err);
            resolve(data);
        });
    });
}