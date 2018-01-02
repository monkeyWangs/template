var path = require('path');
module.exports = {
  parser: 'babel-eslint',
  extends: 'airbnb-base',
  plugins: [
    'vue'
  ],
  globals: {
    'Promise': true,
    'window': true
  },
  rules: {
    'arrow-parens': ['error', 'as-needed'], // 箭头函数单个参数无括号
    'import/extensions': 'off', // 关闭文件后缀检测
    'indent': ['error', 4], // 4 空格
    'class-methods-use-this': 'off',
    'no-plusplus': 'off', // 允许 ++
    'no-param-reassign': 'off', // 允许修改函数引用类型入参
    'global-require': 'off', // 允许使用 require
    'max-len': ['error', 200], // 因为4空格 max-len需要长一点
    'no-console':  process.env.NODE_ENV === 'development' ? 'off' : 'warn', // 开发模式允许console
    'no-debugger': process.env.NODE_ENV === 'development' ? 'off' : 'error', // 开发模式允许debug
    'no-restricted-syntax': [ // 覆盖掉对 for-in 和 for-of 的限制
      'error',
      // 'ForInStatement',
      // 'ForOfStatement',
      'LabeledStatement',
      'WithStatement',
    ],
    'no-underscore-dangle': 'off',
    "import/no-extraneous-dependencies": ["error", {"devDependencies": ["**/compile/*.js"]}],
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: path.join(__dirname, './compile/webpack.dev.config.js')
      }
    }
  }
};
