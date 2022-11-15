import { expectType, expectNotType, expectAssignable } from 'tsd';

console.log('hello typescript');
console.log('----');

// ts-node 参数

// -p  --project
//指定配置文件位置 如果不是正常的 tsconfig.json 就需要-p自己指定

// -t  --transpileOnly
// 只编译 不进行类检查 不会进行类型报错

// --swc
// 在transpileOnly之上再加上 swc 提升执行速度

// --emit
// 不仅执行 还会产出编译产物 输出到 .ts-node文件夹下
// 需要与 --compilerHost 一起使用

interface Foo {
  name: string;
  age: number;
}

interface Bar {
  name: string;
  job: string;
}

// let foo: Foo = {
//   name: 'ark',
//   age: 18,
// };

// let bar: Bar = {
//   name: 'breeze',
//   job: 'saber',
// };

// 比较两个实例的类型 需要进行赋值操作
// foo = bar;

// 只想要类型进行比较时 没必要专门生成两个实例

declare let foo: Foo;
declare let bar: Bar;

// foo = bar;

// 等于直接在ts中进行声明 不参与到js交互
//可以 学到了

// 也可以通过  tsd的库来进行 expectType
expectType<string>('im string'); //true
// expectType<number>('breeze'); //false

//这个不报错八是很懂
// 类型不一致
// expectNotType<Foo>(foo);

// 判断是否可以赋值
// let name: Number = 12;
// expectAssignable<number>(name);
