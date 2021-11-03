// 导入默认成员
import main from './bar';
main();

// 导入非默认成员
// 通过解构赋值的方式进行赋值        通过import进行引入./bar中的导出的数据，又通过解构赋值的方式，进行解构，然后调用对应解构赋值的值     注意点：export const 常量值 = 'XXXXX'           对应的常量值等于解构赋值的值
import { X, Y, add } from './bar';
console.log(X, Y, add(10, 20));

// 上面的结构赋值比较麻烦，能不能通过一次性   通过 * as  变量名

import * as bar1 from './bar';
console.log(bar1.X);
console.log(bar1.Y);
console.log(bar1.add(1, 2));
