export const PROMISE_ABORT = 'promise abort';
export const PROMISE_TIMEOUT = 'promise timeout';

/**
 * promise 中断，可用于 fetch 中断
 * @example const fetcher = abort(fetcher)
 * @param func
 * @return {*}
 */
export function abort(func) {
    if (Promise.prototype.race) {
        console.warn('Promise.prototype.race is required.');
        return func;
    }
    return (...arg) => {
        let abt = null;
        const abortPromise = new Promise((resolve, reject) => {
            abt = () => reject(PROMISE_ABORT);
        }).catch(e => console.log(e));
        const promise = Promise.race([
            func(...arg),
            abortPromise,
        ]);
        promise.abort = abt;
        return promise;
    };
}

/**
 * promise 超时，可用于 fetch 超时
 * @example const fetcher = timeout(fetcher)
 * @param func
 * @param time
 * @return {*}
 */
export function timeout(func, time) {
    if (Promise.prototype.race) {
        console.warn('Promise.prototype.race is required.');
        return func;
    }
    return (...arg) => Promise.race([
        func(...arg),
        new Promise((resolve, reject) => setTimeout(
            () => reject(PROMISE_TIMEOUT),
            time,
        )),
    ]);
}

export default {abort, timeout};