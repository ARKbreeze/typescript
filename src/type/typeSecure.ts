// 类型查询操作符与类型守卫

{
  // 类型查询 typeof
  const str = 'arcbreeze';

  const obj = { name: 'arcbreeze' };

  const nullVar = null;
  const undefinedVar = undefined;

  const fun = (input: string) => {
    return input.length > 10;
  };

  type Str = typeof str; // "arcbreeze"
  type Obj = typeof obj; // { name: string; }
  type Null = typeof nullVar; // null
  type Undefined = typeof undefinedVar; // undefined
  type Func = typeof fun; // (input: string) => boolean

  const func = (input: string) => {
    return input.length > 10;
  };
  // 查询 func 的type   （input : string）=> boolean
  const func2: typeof func = (name: string) => {
    return name === 'arcbreeze';
  };
  // 查询类型函数返回值的类型
  type FuncReturnType = ReturnType<typeof func>;

  // 逻辑代码中也有typeof 为了区分ts中typeof 后不能跟表达式
  // let isValid: typeof func('') = true; // error
}
declare const strOrNumOrBool: string | number | boolean;
{
  // 类型守卫
  // 类型的控制流分析

  if (typeof strOrNumOrBool === 'string') {
    // 一定是字符串！
    strOrNumOrBool.charAt(1);
  } else if (typeof strOrNumOrBool === 'number') {
    // 一定是数字！
    strOrNumOrBool.toFixed();
  } else if (typeof strOrNumOrBool === 'boolean') {
    // 一定是布尔值！
    strOrNumOrBool === true;
  } else {
    // 要是走到这里就说明有问题！
    const _exhaustiveCheck: never = strOrNumOrBool;
    throw new Error(`Unknown input type: ${_exhaustiveCheck}`);
  }

  // 把控制语句提取出去
  // 需要搭配 is 关键字进行辅助推断 is只有在返回值返回true时 会把你指定的类型进行返回
  function isString(input: unknown): input is string {
    return typeof input === 'string';
  }
  function isNumber(input: unknown): input is number {
    return typeof input === 'number';
  }
  // 搭配is可以正常推导
  function foo(input: number | string) {
    if (isString(input)) {
      // input.length; // err   没使用is辅助时  没有进行类型推断 缩小到string
      input.length; //可以正常推断到string 但是如果你is类型不对，这里的类型就会出错 它不会帮你检查类型只会返回
    } else if (isNumber(input)) {
      input.toFixed();
    } else {
      const nevValue: never = input;
    }
  }

  // is比as更宽泛 你指定什么我就返回什么 不进行检查
  // 两个小工具函数
}
// 导出false 类型
export type Falsy = false | '' | 0 | null | undefined;
// 导出判断false 函数
export const isFalsy = (val: unknown): val is Falsy => !val;

// 原始类型集合 缺少 symbol 和 bigint
export type Primitive = string | number | boolean | undefined;
// 判断原始类型函数
export const isPrimitive = (val: unknown): val is Primitive => ['string', 'number', 'boolean', 'undefined'].includes(typeof val);

{
  // in instanceof

  interface Foo {
    foo: string;
    fooOnly: boolean;
    shared: number;
  }

  interface Bar {
    bar: string;
    barOnly: boolean;
    shared: number;
  }

  function handle(input: Foo | Bar) {
    if ('foo' in input) {
      input.fooOnly; // Foo
    } else {
      input.barOnly; // Bar
    }
    input.shared; // 联合
  }

  function ensureArray(input: number | number[]): number[] {
    return Array.isArray(input) ? input : [input];
  }
}

{
  interface Foo {
    kind: 'foo';
    diffType: string;
    fooOnly: string;
    shared: number;
  }

  interface Bar {
    kind: 'bar';
    diffType: boolean;
    BarOnly: boolean;
    shared: number;
  }
  // 通过单一字面量也可以分辨出  区分typeof 确实区别不出
  function handler(input: Foo | Bar) {
    if (input.kind === 'foo') {
      input.fooOnly;
    } else {
      input.BarOnly;
    }
  }

  // but why  //TODO:   暂时理解的话 我觉得是typeof input 可以静态分析到类型 但是input.diffType 还没支持到 未来可能 现在不行
  function handler1(input: Foo | Bar) {
    if (typeof input.diffType === 'string') {
      input; // 依然是联合类型
    }
  }
}

{
  // instanceof
  // 原型链查找  派生类与基类
  class FooBase {}
  class BarBase {}

  class Foo extends FooBase {
    fooOnly() {}
  }
  class Bar extends BarBase {
    barOnly() {}
  }

  // instanceof 也可以分辨
  function handler(input: Foo | Bar) {
    if (input instanceof Foo) {
      input.fooOnly;
    } else {
      input.barOnly;
    }
  }
}

{
  // asserts 类型断言
  function assert(condition: any, msg?: string): asserts condition {
    if (!condition) {
      throw new Error(msg);
    }
  }

  function assertNum(input: any): asserts input is number {
    if (typeof input !== 'number') {
      throw new Error('is not  number');
    }
  }

  let test: any = 123;
  assert(test);
  test; // any
  assertNum(test);
  test; // number
}

{
  //接口的合并
  interface Struct1 {
    primitiveProp: string;
    objectProp: {
      name: string;
    };
    unionProp: string | number;
  }

  interface Struct2 extends Struct1 {
    // primitiveProp: number; // 不兼容
    // objectProp: {
    // name: string;
    // age: number; //只声明age也会报错 要兼容基类
    // };
  }
}

{
  interface Struct1 {
    primitiveProp: string;
  }

  // 同名接口会自动合并属性
  // 不兼容会报错
  interface Struct1 {
    // primitiveProp: number;
    primitiveProp1: number;
  }
  const test: Struct1 = { primitiveProp: '', primitiveProp1: 1 };
}

{
  // 接口继承type也同样需要兼容
  type Base = {
    name: string;
  };

  interface Foo extends Base {
    // name: number; // err 不兼容
  }

  interface IBase {
    name: string;
  }

  type Bar = IBase & {
    name: number;
  };

  // const test: Bar = { name: '' }; //不能将类型"string"分配给类型"never"
  // 会变成never  一样的
}

{
  // typeof 补充
  // 4.6 之前下面会报错  现在的版本4.9.3

  // 元祖流程分析进行了支持

  type Args = ['a', number] | ['b', string];

  type Func = (...args: ['a', number] | ['b', string]) => void;

  const f1: Func = (kind, payload) => {
    if (kind === 'a') {
      // 仍然是 string | number    //现在可以分辨了   就是 number
      payload.toFixed();
    }
    if (kind === 'b') {
      // 仍然是 string | number     //  就是 string
      payload.toUpperCase();
    }
  };
}
