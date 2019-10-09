/**
 * Created by cici on 2018/9/26.
 */
import moment from 'moment';

/**
 * 时间格式化显示
 * @param time
 * @param s
 * @returns {string}
 */
export function timeFormat(time, s = true) {
    return time
        ? s
            ? moment(time).format('YYYY-MM-DD HH:mm:ss')
            : moment(time).format('YYYY-MM-DD')
        : '';
}

/**
 * 转时间戳
 * @param time
 * @returns {*|number}
 */
export function timeToStamp(time) {
    return time && moment(time).valueOf();
}

/**
 * 日期选择默认时间
 * @param range
 * @returns {*}
 */
export function timeDefault(range) {
    return range ? [moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]
        : moment('00:00:00', 'HH:mm:ss');
}

export function winOpen(
    {
        url,
        name = '',
        width = 1080,
        height = 800,
    },
) {
    const left = (window.screen.width - 10 - width) / 2;
    const top = (window.screen.height - 30 - height) / 2;

    return window.open(url, name,
        `width=${width}, height=${height}, left=${left}, top=${top}, toolbar=no, menubar=no, scrollbars=yes, resizable=no, location=no, status=no`);
}

// 每3位以逗号隔开，保留两位小数
function formatValue(num, float) {
    (!num) && (num = 0);
    return `${num}` && (+num).toFixed(float).replace(/^\d+/g, m => m.replace(/(?=(?!^)(\d{3})+$)/g, ','));
}

export function money(value, unit = true, float = 2) {
    return unit ? `￥${formatValue(value, float)}` : formatValue(value, float);
}

/**
 * 动态加载js
 * @param src
 * @param success
 * @param error
 */
export function dynamicScript({src, success = () => {}, error = () => {}}) {
    const script = document.createElement('script');
    const head = document.getElementsByTagName('head')[0]
        || document.getElementsByTagName('body')[0] || document;

    script.src = src;
    script.onerror = error;
    // 加载成功事件
    if (script.readyState) { // IE...
        script.onreadystatechange = function (e) {
            if (script.readyState === 'loaded' || script.readyState === 'complete') {
                script.onreadystatechange = null;
                success(e);
            }
        };
    } else {
        script.onload = success;
    }

    head.appendChild(script);
}

export function importScript(src) {
    return new Promise((resolve, reject) => dynamicScript({
        src,
        success: e => resolve(e),
        error: e => reject(e),
    }));
}

export function setStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function getStorage(key) {
    return JSON.parse(localStorage.getItem(key));
}


// 节流
export function debounce(idle, action) {
    let last = null;
    return (...args) => {
        const ctx = this;
        clearTimeout(last);
        last = setTimeout(() => {
            action.apply(ctx, args);
        }, idle);
    };
}

// 转换图片大小
const PIC_NONE = 'http://ruhnn-web.oss-cn-hangzhou.aliyuncs.com/images/picnone.png';
export function changeImageUrl(url, width = 80) {
    if (!url) return PIC_NONE;
    if (url.indexOf('aliyuncs.com') > -1) {
        url = `${url}?x-oss-process=image/resize,w_${width}`;
    }
    if (url.indexOf('alicdn.com') > -1) {
        url = `${url}_${width}x${width}.jpg`;
    }
    return url;
}

// 选择节点
export function closest(el, selector, stop) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector
        || el.msMatchesSelector;
    const stopDom = stop ? document.querySelector(stop) : null;

    while (el && el !== stopDom) {
        if (matchesSelector.call(el, selector)) {
            return el;
        }
        el = el.parentElement;
    }
    return null;
}

/**
 * 详情返回调用方法刷新列表
 * @param prevProps
 * @param refresh
 */
export function refresh(prevProps, refresh) {
    const pre = prevProps.location.state || {};
    const now = this.props.location.state || {};
    if (pre.shouldRefresh !== now.shouldRefresh && now.shouldRefresh) {
        this[refresh || 'fetchList']();
    }
}

/**
 * input验证价格
 * @param data
 */
export function verificationPrice(data = '') {
    // 非数字的都替换掉，除了数字和.
    let value = data.replace(/[^\d.]/g, '');
    // 必须保证第一个为数字而不是.
    value = value.replace(/^\./g, '');
    // 保证只有出现一个.
    value = value.replace(/\.{2,}/g, '.');
    // 保证.只出现一次，而不能出现两次以上
    value = value.replace('.', '$#$').replace(/\./g, '').replace('$#$', '.');
    return value;
}