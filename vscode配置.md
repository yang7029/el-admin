# 配置

Auto Close Tag
Auto Rename Tag
Chinese (Simplified) (简体中文) Language Pack for Visual Studio Code
Docker
Element UI Snippets
ESLint
Git Graph
JavaScript (ES6) code snippets
javascript console utils
Live Server
node-snippets
One Dark Pro
open in browser
open in browser
Prettier - Code formatter
Vetur
vscode-icons

{

_// 设置的主题为 One Dark Pro_

"workbench.iconTheme": "vscode-icons",

"workbench.colorTheme": "One Dark Pro",

_// 设置的字体大小为 14_

"editor.fontSize": 15,

_// 设置字体注释字体为绿色_

"editor.tokenColorCustomizations": {

​ "comments": "#59cf60" _// 注释_

​ _//"keywords": "#0a0", // 关键字_

​ _// "variables": "#f00", // 变量名_

​ _// "strings": "#e2d75dbd", // 字符串_

​ _//"functions": "#5b99fcc9", // 函数名_

​ _// "numbers": "#AE81FF" // 数字_

},

_// 自动补全_

"emmet.triggerExpansionOnTab": true,

"emmet.showAbbreviationSuggestions": true,

"emmet.showExpandedAbbreviation": "always",

"emmet.includeLanguages": {

​ "javascript": "html"},

"vsicons.dontShowNewVersionMessage": true,

_/\* prettier 的配置 \*/_

"[html]": {

​ "editor.defaultFormatter": "esbenp.prettier-vscode"

},

"[css]": {

​ "editor.defaultFormatter": "esbenp.prettier-vscode"

},

"[less]": {

​ "editor.defaultFormatter": "esbenp.prettier-vscode"

},

"[javascript]": {

​ "editor.defaultFormatter": "esbenp.prettier-vscode"

},

_// "[vue]": {_

_// "editor.defaultFormatter": "esbenp.prettier-vscode"_

_// },_

"prettier.printWidth": 200, _// 超过最大值换行_

"prettier.tabWidth": 4, _// 缩进字节数_

"prettier.useTabs": true, _// 缩进不使用 tab，使用空格_

"prettier.semi": true, _// 句尾添加分号_

"prettier.singleQuote": true, _// 默认值。因为使用了一些折行敏感型的渲染器（如 GitHub comment）而按照 markdown 文本样式进行折行_

"prettier.arrowParens": "avoid", _// (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号_

"prettier.bracketSpacing": true, _// 在对象，数组括号与文字之间加空格 "{ foo: bar }"_

_// "prettier.disableLanguages": ["vue"], // 不格式化 vue 文件，vue 文件的格式化单独设置_

"prettier.endOfLine": "auto", _// 结尾是 \n \r \n\r auto_

_// "prettier.eslintIntegration": false, //不让 prettier 使用 eslint 的代码格式进行校验_

"prettier.htmlWhitespaceSensitivity": "ignore",

"prettier.ignorePath": ".prettierignore", _// 在 jsx 中使用单引号代替双引号_

_// "prettier.parser": "babylon", // 格式化的解析器，默认是 babylon_

"prettier.requireConfig": false, _// Require a 'prettierconfig' to format prettier_

_// "prettier.stylelintIntegration": false, //不让 prettier 使用 stylelint 的代码格式进行校验_

"prettier.trailingComma": "es5", _// 在对象或数组最后一个元素后面是否加逗号（在 ES5 中加尾逗号）_

_// "prettier.tslintIntegration": false,_

"editor.formatOnSave": true, _// 不让 prettier 使用 tslint 的代码格式进行校验_

_// "prettier.jsxBracketSameLine": true,_

_// vetur 配置_

"vetur.format.defaultFormatter.html": "prettier",

"vetur.format.defaultFormatter.js": "prettier",

"vetur.format.defaultFormatter.less": "prettier",

"vetur.format.defaultFormatterOptions": {

​ "prettier": {

​ "printWidth": 8000,

​ "singleQuote": true, _// 使用单引号_

​ "semi": true, _// 末尾使用分号_

​ "tabWidth": 4,

​ "arrowParens": "avoid",

​ "bracketSpacing": true,

​ }

},

"debug.console.wordWrap": false,

"html.format.wrapLineLength": 1200,

"diffEditor.wordWrap": "off",

_// "editor.fontLigatures": null,_

"[vue]": {

​ "editor.defaultFormatter": "octref.vetur"

},

"vetur.validation.template": false,

"editor.tabSize": 2,

}
