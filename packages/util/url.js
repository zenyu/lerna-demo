/**
 * 解析标准URL 特殊情况不考虑
 * URL {
 *  host:'http://www.baidu.com',
 *  pathname:'/page',
 *  search:'?word=a',
 *  query:{word:'a'},
 *  hash:'#hash'
 * }
 * @param url
 */
export function parse(url) {
    const l = {}; let n; let
        m;
    if (!url) {
        url = location.href;
    }
    // host
    n = url.indexOf('/', 8); // http://后的第一个 /
    l.host = url.substring(0, n);
    url = url.substring(n);

    // pathname
    n = url.indexOf('?');
    m = url.indexOf('#');

    if (n !== -1 && (n < m || m === -1)) {
        l.pathname = url.substring(0, n);
        l.search = m === -1 ? url.substring(n) : url.substring(n, m);
    } else {
        l.pathname = m === -1 ? url.substring(0) : url.substring(0, m);
        // l.search = '';

        /* 处理url是hash后面带参数的时候
         * http://localhost:3000#/?code=57912
         *  */
        l.search = url.substr(n);
    }

    l.query = l.search ? parseParameter(l.search) : {};
    l.hash = m === -1 ? '' : url.substring(m);

    return l;
}

/**
 * 返回url
 * @param host
 * @param pathname
 * @param query
 * @param hash
 */
export function stringify(
    {
        host,
        pathname,
        query,
        hash,
    },
) {
    let s = stringifyParameter(query);
    s = s ? `?${s}` : s;
    return `${host}${pathname}${s}${hash}`;
}

/**
 * 解析请求参数
 * @param params
 */
export function parseParameter(params) {
    const q = {};
    params = params.replace(/^\?/, '');
    params = params.split('&');
    for (let i = 0, len = params.length, item; i < len; i += 1) {
        item = params[i];
        item = item.split('=');
        q[item[0]] = item[1];
    }

    return q;
}

/**
 * 对象转请求参数
 * @param obj
 */
export function stringifyParameter(obj) {
    const params = [];

    for (const i in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, i)) {
            const item = obj[i];
            item !== undefined && params.push(
                `${i}=${item && typeof item === 'object' ? JSON.stringify(item) : item}`,
            );
        }
    }

    return params.join('&');
}

export default parse;