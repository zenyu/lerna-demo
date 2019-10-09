export const PROMISE_ABORT = 'Promise Abort';
export const PROMISE_TIMEOUT = 'Promise Timeout';

/**
 * promise 中断，可用于 fetch 中断
 * @example const fetcher = abort(fetcher)
 * @param func
 * @param returnError
 * @return {*}
 */
export function abort(func, returnError) {
    if (Promise.prototype.race) {
        console.warn('Promise.prototype.race is required.');
        return func;
    }
    return (...arg) => {
        let abt = null;
        const abortPromise = new Promise((resolve, reject) => {
            abt = () => reject(PROMISE_ABORT);
        }).catch(e => (returnError === true ? new Error(e) : returnError));
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
 * @param returnError
 * @return {*}
 */
export function timeout(func, time, returnError) {
    if (Promise.prototype.race) {
        console.warn('Promise.prototype.race is required.');
        return func;
    }
    return (...arg) => Promise.race([
        func(...arg),
        new Promise((resolve, reject) => setTimeout(
            () => reject(PROMISE_TIMEOUT),
            time,
        )).catch(e => (returnError === true ? new Error(e) : returnError)),
    ]);
}

export default {abort, timeout};