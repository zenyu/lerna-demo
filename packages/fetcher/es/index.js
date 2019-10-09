import { message } from 'antd';
import { Toast } from 'antd-mobile';
import { parse, stringify, stringifyParameter } from '@ruhnn/util/url';
import { abort } from '@ruhnn/util/promise';
import { whichDevice } from '@ruhnn/util/device';
import { isObject, isString, isNull, isPlainObject, isBoolean, isFunction } from '@ruhnn/util/type';
import constant from '@ruhnn/constant';
const {
  ios,
  android,
  isLCAPP,
  mobile
} = whichDevice();
let Message = null;

if (mobile) {
  Message = Toast;
  Message.error = Toast.fail;
} else {
  Message = message;
}

const LOGIN_URL = constant.login;

class DataFormatError extends Error {
  constructor(errorMessage) {
    super();
    this.message = 'Data Format Invalid';
    this.errorMessage = errorMessage;
  }

}

const {
  toString
} = Object.prototype;
/**
 * 功能等同于 fetch 只做了 content-type 和 请求参数 处理 和 Token 设置
 * @param url
 * @param option
 */

export function oriFetch(url, option = {}) {
  const opt = {
    credentials: 'same-origin',
    ...(isObject(option) ? option : {})
  };
  opt.headers = opt.headers || {};
  let urlObj = {}; // 针对不同请求方式 添加请求头 或 参数处理

  switch ((opt.method || 'get').toLowerCase()) {
    case 'get':
      // get 请求 body 可以传入一个对象
      if (!opt.body || typeof opt.body !== 'object') break;
      urlObj = parse(url);
      urlObj.query = Object.assign(urlObj.query, opt.body);
      delete opt.body;
      url = stringify(urlObj);
      break;

    case 'post':
    case 'put':
    case 'delete':
      // post、put 请求 根据请求头类型自动处理 body
      if (opt.FormData || opt.body instanceof FormData) {
        for (const i in opt.body) {
          if (opt.body[i] === undefined) delete opt.body[i];
        }

        break;
      }

      if (~(opt.headers['Content-Type'] || '').toLowerCase().indexOf('x-www-form-urlencoded')) {
        opt.body = stringifyParameter(opt.body);
      } else {
        opt.body = JSON.stringify(opt.body);
        opt.headers['Content-Type'] = 'application/json';
      }

      break;

    default:
      break;
  } // 请求头带上Token


  if (window.token) {
    opt.headers.Token = 'token' in opt.headers || 'Token' in opt.headers ? opt.headers.Token : window.token;
  }

  return fetch(url, opt);
}
/**
 * 登录验证
 * @param data
 * @return {*}
 */

const loginFulfill = data => {
  // 未登录会跳转登录页
  const delay = () => new Promise((resolve, reject) => setTimeout(reject, 99999, data));

  const errorCallback = () => {
    try {
      if (isLCAPP) {
        android && window.jsObj.loginApp();
        ios && window.webkit.messageHandlers.loginApp.postMessage({});
      } else {
        window.location.href = `${LOGIN_URL}?redirect=${encodeURIComponent(window.location.href)}`;
      }

      return data;
    } catch (e) {// console.log('device', e);
    }
  };

  if (!isObject(data)) return data;

  if (data.errorCode === 'LOGIN_ERROR' || data.errorCode === 'C10') {
    Message.error('登录信息过期，请重新登录', 1.5, errorCallback);
    return delay();
  } // TODO lc 不用后再删


  if (data.errorMessage === '登录失败' && process.env.ori) {
    setTimeout(() => {
      window.location.href = `/login.html?last=${window.location.href}`;
    }, 1000);
    return delay();
  }

  return data;
};
/**
 * 服务端错误信息提示
 * @param error         String|Object|Boolean|data => String
 *  String|Boolean|Function<String> 时，值作为 error.message
 * @param error.message  {String|Boolean} 提示服务端错误信息 errorMessage为空时，用error.message提示
 *  1. String           提示 error.message
 *  2. false            不提示
 *  3. true             提示服务端错误信息，若错误信息为空则提示 '操作失败'
 *  3. data => String   提示函数返回值
 * @param error.always  Boolean  默认：false。 是否忽略后端错误信息，总是提示 error.message
 * @return {Function}
 */


const errorFulfill = error => data => {
  const {
    always
  } = error;
  let msg = error.message; // 请求错误或响应成功 则不提示

  if (!isPlainObject(data) || data.success) return data; // 服务端错误处理

  let serverError = data.errorMessage || data.errorMsg;
  if (serverError === '系统错误') serverError = '操作失败';
  if (data.errorCode === 'B10') serverError = '没有权限'; // 错误信息不存在 且 message===false 则不提示

  if (msg === false && !serverError) return data; // error.message 处理

  if (isFunction(msg)) msg = msg(data);
  if (msg === true) msg = serverError || '操作失败';
  Message.error(always ? msg : serverError || msg);
  return data;
};

const typeDefault = {
  array: [],
  object: {},
  string: '',
  boolean: undefined,
  number: undefined,
  null: null
};
/**
 * 数据格式校验，若验证失败，则抛出 '数据错误' 提示
 *  1. data 字段验证 包含：success=true result|errorCode|errorMessage 存在
 *  2. data.result 数据类型验证
 *  3. data.result===null 时补充默认值（typeDefault）
 *
 * @param dataType {String|Object}   String 类型时，值作为 dataType.type
 * @param dataType.type       String  数据类型，array/object/string/boolean/number/null
 * @param dataType.message    String  默认：'数据错误'，数据类型验证失败提示
 * @param dataType.canBeNull  Boolean 默认：true，data.result 为 null 时，根据 dataType.type 补全默认数据
 * @param dataType.always     Boolean 默认：false .catch是否给业务端返回值 {result: 补全默认值}
 * @return {Function}
 */

const validateFulfill = dataType => data => {
  const {
    canBeNull = true,
    message = '数据错误',
    type
  } = dataType;
  const dataFormatError = new DataFormatError(message); // 1

  if (!isObject(data)) throw dataFormatError;
  if (data.success !== true) return data;

  if (!('result' in data || 'errorCode' in data || 'errorMessage' in data)) {
    throw dataFormatError;
  } //  canBeNull 为 false 或者 data.result 不是null 则报错
  //  canBeNull 为 true 且 data.result 为 null 则补全默认值


  const resultType = toString.call(data.result).toLowerCase();

  if (resultType !== `[object ${type}]`) {
    // 2
    if (canBeNull === false || !isNull(data.result)) {
      throw dataFormatError;
    }

    data.result = typeDefault[type]; // 3
  }

  return data;
};

let timeSpan = 0;
/**
 * 错误处理
 * @param type
 * @param always
 * @return {Function}
 */

const errorReject = ({
  type,
  always
}) => e => {
  console.log('Fetcher', e); // 合并错误提示

  if (new Date() - timeSpan < 3000) return e;
  timeSpan = new Date().getTime();
  Message.error(e.constructor === DataFormatError ? e.errorMessage : '网络错误');
  if (always) return {
    result: type ? typeDefault[type] : undefined
  };
  return e;
};
/**
 * 一般 json 请求接口
 * @param url
 * @param option
 * @param option.method
 * @param option.body
 * @param option.headers
 * @param option....     原生 fetch 的第二个参数
 * ************************ 自定义参数 ************************
 * @param option.error 参考 errorFulfill ↑↑↑
 * @param option.dataType 参考 validateFulfill ↑↑↑
 */


function fetcher(url, option = {}) {
  // 自定义参数处理
  let {
    dataType,
    error
  } = option; // dataType

  if (isString(dataType)) dataType = {
    type: dataType
  };
  if (!isObject(dataType) || !(dataType.type in typeDefault)) dataType = null;
  const toValid = isObject(dataType); // error

  if (isString(error) || isBoolean(error) || isFunction(error)) error = {
    message: error
  };
  if (!isObject(error)) error = null;
  const toMessage = isObject(error); // 过滤自定义参数

  const opt = { ...option,
    dataType: undefined,
    error: undefined
  };

  const func = () => oriFetch(url, opt).then(res => res.json()) // 登录验证
  .then(loginFulfill) // 服务端错误提示
  .then(toMessage ? errorFulfill(error) : undefined) // 数据格式验证
  .then(toValid ? validateFulfill(dataType) : undefined) // 错误处理
  .catch(errorReject(toValid ? dataType : {}));

  return abort(func, true)();
}
/**
 *
 * @param url
 * @param option
 * @param eMsg {String|Function}
 * @returns {*}
 */


export function fetcherWithMsg(url, option = {}, eMsg) {
  const abortPromise = fetcher(url, option);
  abortPromise.then(data => {
    if (!isPlainObject(data) && !data.success) {
      // 业务端用errorMessage，基础服务貌似用的errorMsg
      let msg = data.errorMessage || data.errorMsg;

      if (msg === '系统异常' || !msg) {
        msg = '操作失败';
      }

      eMsg = typeof eMsg === 'function' ? eMsg(data) : eMsg;

      if (data.errorCode === 'B10') {
        eMsg = '没有权限';
      }

      Message.error(eMsg || msg);
    }

    return data;
  });
  return abortPromise;
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
  const timeout = opts.timeout != null ? opts.timeout : 16000; // enc = encodeURIComponent,

  const target = document.getElementsByTagName('script')[0] || document.head;
  const script = document.createElement('script');
  let timer;
  let {
    url
  } = opts;
  let params = opts.withoutTime === false ? [] : [`_t=${new Date() - 0}`];
  if (!opts.url) return fn(new Error('url required')); // timeout 不是 falsy

  if (timeout) {
    timer = setTimeout(() => {
      cleanup();
      if (fn) fn(new Error('Timeout'));
    }, timeout);
  } // 封装jsonp 回调函数


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
  url = url.replace('?&', '?'); // script标签

  script.src = url;
  target.parentNode.insertBefore(script, target);

  function cleanup() {
    if (script.parentNode) script.parentNode.removeChild(script); // 防止响应时报错

    window[id] = noop;
    if (timer) clearTimeout(timer);
  } // 取消


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
export default fetcher;