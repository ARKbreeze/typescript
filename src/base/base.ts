// 基础类型
// 字符串
const name: string = 'string';
// 包装字符串
const pakName: String = new String('string');
// 数字
const age: number = 18;
// 包装数字
const pakNumber: Number = new Number(18);
// 布尔
const male: boolean = true;
// 包装布尔
const pkgMale: Boolean = new Boolean(true);

// null 和 undefined
const nul: null = null;
const udf: undefined = undefined;

// 基础类型可以理解为值传递  包装类套了一层对象壳 为引用类型
// 引用类型
//对象
const obj: object = {
  name,
  age,
  male,
};

// 数组
const arr: string[] = ['string'];

// 符号
const sym: symbol = Symbol('symbol');

// ------- null & udf
// js中null和udf无意义  但在ts中它在不严格模式下 是所其他类型的子类型
// strictNullChecks : false
// eg   const str : string = "string"
// 隐含  const str : string | undefined | null = "string"

// let str: string = 'string';
// str = null;

// ----- void
// js中 void 可以将后面的东西转化成表达式执行并返回一个undefined 就是不返回东西
// eg  javascript : void(0)  执行0 不返回

void (function iife() {
  console.log(1);
})();
// 等效于
(function iife1() {
  console.log(1);
})();

// 感觉意义不大

// ts中
// 只有无return  或 return; 会推倒为void   表现为函数无返回值
// 但 fun2 依然可以标注为 () => void 因为实际表现依然为无返回值
// 但是实际执行的代码中 js func012 均为  undefined
let func = () => {}; // void
let func1 = () => {
  return;
}; // void
let func2 = () => undefined; // undefined
// let func2: () => void = () => undefined; //  true

// strictNullChecks: false 时   null也成立  but 我觉得null还是需要避免
export { name };
