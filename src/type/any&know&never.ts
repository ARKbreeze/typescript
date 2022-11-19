//any
// 确实是可以接受所有类型的时候可以用any
// 其他情况下应该严格控制any的使用
console.log(); // 接受的是 any[]

// any 可以被赋值为所有类型 所有类型也接受any
// 接受其他类型
let anyType: any = '';
anyType = true;
// 赋值给其他类型
let num: number = 1;
num = anyType;

// any的本质是 Top Type 之后会说

// 如果遇到类型不兼容 可以先用断言
// 未知类型时 那就需要用unknown了
// Unknown

// 接受其他类型
let unType: unknown = '';
unType = true;
unType = 1;

// 赋值给其他类型
// let str: string = unType; // 不可以
anyType = unType;
let nunType: unknown = unType;

type foo = {
  log: () => void;
};

// 你声明它是这个类型 是不是看你
(nunType as foo).log();

// unknown 可以接收所有其他类型
// 但是只能赋值给 unknown 和 any

// 简单地说，any 放弃了所有的类型检查，而 unknown 并没有。
// 摆了但没完全摆

// never  内容更少的类型 字面量都还有字面量  never真的就只有虚无  void还可以包容三剑客

declare let v1: never;
declare let v2: void;

// v1 = v2; // err
v2 = v1; // true

// Bottom Type

// 应用

function strOrNum(params: string | number) {
  if (typeof params == 'string') {
    console.log('string');
  } else if (typeof params == 'number') {
    console.log('number');
  } else {
    let noType: never = params;
    // 利用的是never 只能被never赋值 any也八星 总不会有人把never传进来吧
    console.log('未知类型');
  }
}

// 默认会推导 any[]
// 开启 strictNullCheck  严格检查 null
// 关闭 noImplicitAny 不声明推导any
//  就会推导为 never[]
const arr = [];
arr.push('1');
