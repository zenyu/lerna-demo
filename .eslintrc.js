module.exports = {
    'root': true,
    'parser': 'babel-eslint',
    'extends': 'airbnb',//引用的第三方共享配置集
    'env': {//运行环境
        'browser': true,
        'node': true,
        'es6': true,
        'mocha': true,
        'jest': true,
        'jasmine': true,
        'worker': true,
    },
    'rules': {
        // 箭头函数的参数按需添加括号
        // 更习惯按需
        'arrow-parens': ['error', 'as-needed'],
        // 函数必须返回 return
        // 默认返回 undefined
        'consistent-return': 'off',
        // 文档结束需换行符
        // unix 命令行里才用到
        'eol-last': 'off',
        // for-in 遍历对象时，循环体必须包裹在 if (Object.prototype.hasOwnProperty.call(foo, key)){} 里
        // 绝大部分场景不需要，因此仅做警告
        'guard-for-in': 'warn',
        // 禁止导入 package.json 里未依赖的模块,
        // 有些模块可能已经被 dependencies 里的模块依赖了，但是没出现在 dependencies
        'import/no-extraneous-dependencies': 'off',
        // 确保引入的模块能在文件系统里找到
        // webpack 别名等会报错，对于静态的 webpack.config.js 可以用 eslint-import-resolver-webpack解决，我们是动态的
        'import/no-unresolved': 'off',
        // 减少相对路径中不必要的 ../ ./
        // less 有个坑，引入图片用相对路径必须往上多找一级，因此仅做警告
        'import/no-useless-path-segments': 'warn',
        // 缩进空格数量
        // 习惯 4 个
        'indent': ['error', 4, {'SwitchCase': 1}],
        // 有意义的 a 标签
        // 实践中会把 a 标签当按钮用，但尽量少用，因此仅做警告
        'jsx-a11y/anchor-is-valid': 'warn',
        // 监听了onKeyUp, onKeyDown, onKeyPres事件，则必须监听 onClick 事件
        // 这条规则主要是为了屏幕阅读器，关闭
        'jsx-a11y/click-events-have-key-events': 'off',
        // 非交互性质的元素，不要添加监听事件
        // 这条规则为了符合 ARIA 规范，关闭
        'jsx-a11y/no-noninteractive-element-interactions': 'off',
        // 无语义的元素 div span 添加交互行为时，必须添加 role 属性
        // 这条规则为了符合 ARIA 规范，关闭
        'jsx-a11y/no-static-element-interactions': 'off',
        // 禁止使用位运算符
        // ~str.indexOf('') ? '不包含' : '包含'   这个小技巧还是在用的
        'no-bitwise': ['error', {'allow': ['~']}],
        // 不要在条件语句中使用赋值
        // while 运算符中通常会用到类似 while((node=node.parentNode))，因此排除括号内的赋值
        'no-cond-assign': ['error', 'except-parens'],
        // 禁止嵌套三目运算符
        //  TODO：写的时候思路清楚，但是阅读的时候就有点麻烦，建议分开写，或者括号包起来，警告
        'no-nested-ternary': 'warn',
        // 不要使用 ++ --
        // 排除 for 循环
        'no-plusplus': ['error', {'allowForLoopAfterthoughts': true}],
        // 不要给参数重新赋值
        // TODO：这条规则建议遵循，但是改动太大了
        'no-param-reassign': 'warn',
        // 访问全局对象的属性时，通过全局对象访问
        // TODO：这条规则建议遵循，但是改动太大了
        'no-restricted-globals': 'warn',
        // 禁用某些语法
        // for-of for-in for语句的label with 都有可能造成副作用, 警告
        // TODO 建议用 Object.{keys,values,entries}  Array.prototype.{map,forEach,reduce} 代替
        'no-restricted-syntax': [
            'warn',
            {
                selector: 'ForInStatement',
                message: 'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
            },
            {
                selector: 'ForOfStatement',
                message: 'iterators/generators require regenerator-runtime, which is too heavyweight for this guide to allow them. Separately, loops should be avoided in favor of array iterations.',
            },
            {
                selector: 'LabeledStatement',
                message: 'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
            },
            {
                selector: 'WithStatement',
                message: '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
            },
        ],
        // 禁止函数返回赋值语句
        // 对于只有一句的箭头函数 ()=> window.location.href='' 比较方便 警告
        'no-return-assign': 'warn',
        // 禁止声明外层作用域存在的变量
        // 警告
        'no-shadow': 'warn',
        // 禁用无效表达式
        // 警告
        'no-unused-expressions': ['warn', {'allowShortCircuit': false, 'allowTernary': false, 'allowTaggedTemplates': false}],
        // 禁止定义之前访问变量
        // 警告
        'no-use-before-define': 'warn',
        // 对象大括号换行显示
        // 属性超过5个，则换行
        'object-curly-newline': [
            'error', {
                ObjectExpression: {minProperties: 5, multiline: true, consistent: true},
                ObjectPattern: {minProperties: 5, multiline: true, consistent: true},
                ImportDeclaration: {minProperties: 5, multiline: true, consistent: true},
                ExportDeclaration: {minProperties: 5, multiline: true, consistent: true},
            }],
        // 大括号首尾是否添加空格
        // 不添加
        'object-curly-spacing': ['error', 'never'],
        // 一个变量，一个生声明符
        // TODO 最好遵循，但是太多没有遵循，设为警告
        'one-var': 'warn',
        // 每个变量单独一行。
        // TODO 最好遵循，但是太多没有遵循，设为警告
        'one-var-declaration-per-line': 'warn',
        // 未被重新赋值的变量 用const
        // emmmm  变量不大确定是否会变，警告差不多
        'prefer-const': 'warn',
        // 用结构方式给变量赋值
        // 警告
        'prefer-destructuring': 'warn',
        // 引号规则
        // 用单引号，允许模板字符串
        'quotes': [2, 'single', {'allowTemplateLiterals': true}],
        // 使用 state/props/context 总是进行结构
        // 只使用一个属性时还要定义变量，太麻烦，关闭
        'react/destructuring-assignment': 'off',
        // 禁止使用模糊的属性值，PropTypes.any 用具体类型代替，array 用 arrayOf 代替， object 用 shape 代替
        // 建议遵循这个规则，但是 shape arrayOf 定义太麻烦，只做警告
        'react/forbid-prop-types': 'warn',
        // 属性值|子元素 不需要大括号的情况下强制使用括号
        // 改成警告
        'react/jsx-curly-brace-presence': ['warn', {props: 'never', children: 'never'}],
        // 只有 .jsx 文件才能包含 JSX
        // 我们习惯用 .js, 所以多加两种类型 .js .ejs
        'react/jsx-filename-extension': ['error', {extensions: ['.js', '.jsx', '.ejs', '.ejs', '.ejs', '.ejs']}],
        // JSX 缩进空格数
        // 与 js 统一 4 个空格
        'react/jsx-indent': ['error', 4],
        // JSX 属性值换行时缩进空格数
        // 与 js 统一 4 个空格
        'react/jsx-indent-props': ['error', 4],
        // a 标签不要只使用 target='_blank' 这条规则跟 airbnb 一样，只是摘录出来说明
        // 目标页面可以通过 opener 获取源页面 window，解决方式：
        // a 标签使用 target='_blank' 还要带上 rel='noopener noreferrer'
        'react/jsx-no-target-blank': ['error', {enforceDynamicLinks: 'always'}],
        // 不要在 this.setState() 里使用 this.state
        // TODO 强烈推荐，但是很多小伙伴都违反了这条规则，暂时设为警告
        'react/no-access-state-in-setstate': 'warn',
        // 不用用数组 index 作为 key
        // antd 一些组件还是会用到，警告
        'react/no-array-index-key': 'warn',
        // 必须要有 propTypes
        // 只有 static propTypes 存在时执行该规则
        'react/prop-types': ['error', {skipUndeclared: true}],
        // 所有不是 propTypes.isRequire 的属性 都要有默认值
        // TODO 强烈推荐，但是很多都没有，暂时设为警告
        'react/require-default-props': 'warn',
        // class 组件方法声明顺序
        // TODO 强烈推荐，但是很多都没有，暂时设为警告
        'react/sort-comp': 'warn',
    },
    //解析器选项
    'parserOptions': {
        // 额外的语言特性
        'ecmaFeatures': {
            //启用展开运算符
            'experimentalObjectRestSpread': true,
            // 装饰器
            'legacyDecorators': true,
        },
    },
};
