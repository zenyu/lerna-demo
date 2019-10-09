if (!window.location.origin) {
  window.location.origin = `${window.location.protocol}//${window.location.hostname}${window.location.port ? `:${window.location.port}` : ''}`;
} // 域名


const host = window.location.origin;
let other = {};
const normal = {
  host,
  // 服务域名、IP
  index: host,
  // 产品线首页地址
  login: `${host}/login`,
  // 登录页地址
  newLc: host.indexOf('youdongxi') !== -1 ? 'http://layercake.youdongxi.com' : `${host}/layercake` // 改版后的lc地址

}; // 本地开发环境

if (process.env.NODE_ENV === 'development') {
  other = {
    lc: 'http://www.layercake.com.cn',
    // 改版前lc地址
    sso: '' // sso 数据接口

  };
} // 测试库


if (process.env.NODE_ENV === 'test' || process.env.ori === 'debug') {
  const lc = 'http://www.layercake.com.cn';
  const isLayercake = ~host.indexOf(lc) && window.location.port;
  other = {
    login: isLayercake ? `${host}/login/` : 'http://192.168.11.117/login',
    lc,
    sso: isLayercake ? `${host}/sso/data` : 'http://192.168.11.117:30004'
  };
} // 生产环境


if (process.env.NODE_ENV === 'production' || process.env.ori === 'prod') {
  other = {
    index: 'http://www.youdongxi.com',
    login: 'http://login.youdongxi.com',
    lc: 'http://www.liblin.com.cn',
    sso: 'http://sso.youdongxi.com'
  };
}

const result = { ...normal,
  ...other
};

result.merge = obj => Object.assign(result, obj);

module.exports = result;