// 函数
function foo(name: string): number {
  return name.length;
}

// 函数声明一
let bar = (name: string): number => {
  return name.length;
};

// 函数声明二
let baz: (name: string) => number = (name) => name.length;

// 箭头套箭头 可读性会下降
// 可以用interface来声明函数类型

// 类型别名 函数声明
type func = (name: string) => number;
// 接口 函数声明
interface IFunc {
  (name: string): number;
}

declare let f: func;
declare let g: IFunc;

f = baz;
g = f;

// void 类型
// 虽然void可以接收 undefined 和 无返回 和 null
// 但是当明确返回 undefined 时 返回类型填写  undefined
// 返回 null 为 null    return; 为隐式 undefined
// 无return语句为void

// 但是我觉得其实 void代表三个也八是八星  再说

type VoidFunc = () => void;

type ReturnFunc = (name: string) => number;

let vf: VoidFunc = () => {
  // 无返回值类型函数  可以接受 带函数返回值的函数的赋值   ts中对一定的兼容情况有处理   包含重载的情况  ts文档应该都有写
  //  类型限制还是为了最后的运行做准备的,所以只要不影响最终结果的处理 大概都会做一定的兼容   具体还是看文档的兼容性

  // 好像是兼容的   兼容的  我原本就不会返回返回值  你即使返回了我外部也不会掉用 所以并不影响实际的使用
  return 'string';
};

let rf: ReturnFunc = (name) => name.length;

// 可选与剩余参数
// 有默认值的参数 默认带上可选属性  因为不传你也有 确实可选
//  可选必须位于必选之后
// type OptionFunc = (name: string, age: number, male: boolean) => void;

let op = (name: string, age: number, male: boolean = false, ...rest: any[]) => {};
// 当可选参数之后的 剩余数组是元祖时  默认参就已经不是可选的了   符合推导规则
op('s', 12);

// 重载
//  一个简单的 输入什么返回什么函数
// 大致懂了这个重载了

function ReloadFunc(pram: string): string;
function ReloadFunc(pram: number): number;
function ReloadFunc(pram: string | number): number | string {
  return pram;
}

ReloadFunc(123);

export {};
