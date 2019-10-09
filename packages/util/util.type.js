const {toString} = Object.prototype;

export const isBoolean = d => toString.call(d) === '[object Boolean]';
export const isNumber = d => toString.call(d) === '[object Number]';
export const isString = d => toString.call(d) === '[object String]';
export const isNull = d => toString.call(d) === '[object Null]';
export const isUndefined = d => toString.call(d) === '[object Undefined]';
export const isFunction = d => toString.call(d) === '[object Function]';
export const isObject = d => toString.call(d) === '[object Object]';
export const isPlainObject = d => toString.call(d) === '[object Object]' && d.constructor === Object;
export const isReg = d => toString.call(d) === '[object RegExp]';
export const isDate = d => toString.call(d) === '[object Date]';
export const isError = d => d instanceof Error;

export default {
    isBoolean,
    isNumber,
    isString,
    isNull,
    isUndefined,
    isFunction,
    isObject,
    isPlainObject,
    isReg,
    isDate,
    isError,
};