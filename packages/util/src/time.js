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