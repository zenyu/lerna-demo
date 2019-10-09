let helpers = true;
// 打包第三方库时用到
if (process.env.NODE_ENV === 'es6') {
    process.env.BABEL_ENV = 'production';
    process.env.NODE_ENV = 'production';
    helpers = false;
}

const hot = process.env.NODE_ENV === 'development' ? ['react-hot-loader/babel'] : [];
module.exports = {
    'presets': [
        process.env.NODE_ENV === 'ruhnn'
            ? '@babel/env'
            : ['react-app', {helpers}],
    ],
    'plugins': [
        process.env.NODE_ENV === 'ruhnn' ? '@babel/plugin-transform-runtime' : '',
        ['import', {libraryName: 'antd', libraryDirectory: 'es', style: true}, 'ant'],
        ['import', {libraryName: 'antd-mobile', libraryDirectory: 'es', style: true}, 'antd-mobile'],
        ['@babel/plugin-proposal-decorators', {'legacy': true}],
        '@babel/plugin-transform-modules-commonjs',
        'recharts',
        ...hot,
    ],
};