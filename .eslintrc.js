// ESLint的配置文件
module.exports = {
    // 继承 Eslint 规则
    extends: ['eslint:recommended'],
    env:{
        node :true, //启用none中全局变量
        browser: true, //启用浏览器中的全局变量
    },
    parserOptions: {
        ecmaVersion: 6, //版本 ES6 
        sourceType: 'module', //es module
    },
    rules: {
        // "on-var": 2, //不能使用 var 定义变量
    },
}