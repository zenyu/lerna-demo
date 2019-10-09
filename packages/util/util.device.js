export function whichDevice() {
    const u = window.navigator.userAgent;
    const isIPhone = /iphone/gi.test(u);
    const isLCAPP = /\/LCAPP/i.test(u);
    // iPhone X、iPhone XS
    const isIPhoneX = isIPhone
        && window.devicePixelRatio
        && window.devicePixelRatio === 3
        && window.screen.width === 375
        && window.screen.height === 812;
    // iPhone XS Max
    const isIPhoneXSMax = isIPhone
        && window.devicePixelRatio
        && window.devicePixelRatio === 3
        && window.screen.width === 414
        && window.screen.height === 896;
    // iPhone XR
    const isIPhoneXR = isIPhone
        && window.devicePixelRatio
        && window.devicePixelRatio === 2
        && window.screen.width === 414 && window.screen.height === 896;
    return {
        mobile: !!u.match(/mobile/i), // 是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, // android终端
        isIPhone,
        isIPhoneX,
        isIPhoneXR,
        isIPhoneXSMax,
        isLCAPP,
    };
}

export default {
    whichDevice,
};