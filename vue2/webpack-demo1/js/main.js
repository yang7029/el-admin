// 通过模块化的引入依赖是浏览器不识别的，通过webpack进行打包成浏览器识别的文件 下面这种模块化的思想是node.js
let bar = require('./bar');
bar();
