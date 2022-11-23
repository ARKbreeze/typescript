//泛型 类型函数的参数

{
  // 其实就是个工厂函数 传给我什么返回后面的
  type Factory<T> = T | number | string;
  type FactoryWithBool = Factory<boolean>; // number | string | boolean

  // 之前的stringify函数和clone函数
  type Stringify<T> = {
    [K in keyof T]: string;
  };
  type Clone<T> = {
    [K in keyof T]: T[K];
  };

  // ts 内置类型 Partial (部分的) 与克隆类似但是复制属性都会添加一个?(可选)
  type Partial<T> = {
    [K in keyof T]?: T[K];
    // [P in keyof T]?: T[P]; // 内部实现用的P
  };

  interface IFoo {
    name: string;
    age: number;
    method: () => void;
  }

  type PartialFoo = Partial<IFoo>;
  /*  type PartialFoo = {
    name?: string | undefined;
    age?: number | undefined;
    method?: (() => void) | undefined;
  } */
}

// type tse = Partial<{ name: string }>;

{
  // 条件类型
  type isEqualTrue<T> = T extends true ? 1 : 0;

  type a = isEqualTrue<true>; // 1
  type b = isEqualTrue<false>; // 0
  type c = isEqualTrue<string>; // 0
}

{
  //泛型 约束和默认值   super extends
  // 跟函数一样 默认值

  type Factory<T = boolean> = T | number | string;
  type foo = Factory; // string | number | boolean
  const foo: Factory = true; // Factory<boolean>

  // 约束 extends 是子类型         类型更精确 或者更复杂 //这特么说的是一句话 我吐了 就是class的 派生类 extends 基类

  type ResStatus<ResCode extends number = 10000> = ResCode extends 10000 | 10001 | 10002 ? true : false;
  //  no-unnecessary-type-constraint
  // eslint关于泛型默认约束 4.9前是extends any 4.9是 extends unknown   如果冗余了会提示
  type Res0 = ResStatus; // true 默认值
  type Res1 = ResStatus<10001>; // true
  type Res2 = ResStatus<20000>; // false
  // type Res3 = ResStatus<'20000'>; // false   string err need number

  // 测试下   更复杂
  interface Base {}
  interface Foo extends Base {
    name: string;
  }

  type FactoryClass<T extends Base> = T extends Foo ? true : false;

  type Test1 = FactoryClass<Base>; // false
  type Test2 = FactoryClass<Foo>; // false

  // 等完整类型层级再说
}

{
  // 多泛型关联
  type Conditional<Type, Condition, TruthyResult, FalsyResult> = Type extends Condition ? TruthyResult : FalsyResult;

  // 类型1是否extends类型二 是返回三类型 否则返回四类型
  type Result1 = Conditional<'breeze', string, 'passed!', 'reject!'>; // passed!
  type Result2 = Conditional<'breeze', boolean, 'passed!', 'reject!'>; // reject!

  type ProcessInput<Input, SecondInput extends Input = Input, ThirdInput extends Input = SecondInput> = number;
  // 忽略操作了 只看<参数操作> .  二参数依赖于一extends一 并且不传时 默认为一 三参数依赖于二 默认为二 继承自一
}

{
  // 对象类型中的泛型 通用返回接口
  interface IRes<TData = unknown> {
    code: number;
    error?: string;
    data: TData;
  }

  interface IUserProfileRes {
    name: string;
    homepage: string;
    avatar: string;
  }

  function fetchUserProfile(): Promise<IRes<IUserProfileRes>> {
    return new Promise(() => {});
  }

  fetchUserProfile().then((res) => {
    res.data.avatar;
  });

  type StatusSucceed = boolean;
  function handleOperation(): Promise<IRes<StatusSucceed>> {
    return new Promise(() => {});
  }
  handleOperation().then((res) => {
    res.data.valueOf(); // data : boolean
  });

  // 分页结构的抽取
  interface IPaginationRes<TItem = unknown> {
    data: TItem[];
    page: number;
    totalCount: number;
    hasNextPage: boolean;
  }
  function fetchUserProfileList(): Promise<IRes<IPaginationRes<IUserProfileRes>>> {
    return new Promise(() => {});
  }
  fetchUserProfileList().then((res) => {
    res.data.data[0].name;
  });
}

{
  //类型的自动提取
  // 函数中的泛型
  /* 假设我们有这么一个函数，它可以接受多个类型的参数并进行对应处理，比如：
     1. 对于字符串，返回部分截取；
     2.  对于数字，返回它的 n 倍；
     3. 对于对象，修改它的属性并返回。 */
  // 重载
  function handle(input: string): string;
  function handle(input: number): number;
  function handle(input: object): object;
  function handle(input: string | number | object): number | string | object {
    if (typeof input === 'string') {
      return input;
    } else if (typeof input === 'number') {
      return input;
    } else {
      return input;
    }
  }
  handle('string');
  handle(123);
  handle({ name: 'breeze' });
  // 接受类型与返回类型相同
  // 可以用泛型进行精简

  function handle1<T>(input: T): T {
    if (typeof input === 'string') {
      return input;
    } else if (typeof input === 'number') {
      return input;
    } else {
      return input;
    }
  }
  // 泛型自动推导 会推导到最精确的类型
  // 所以字面量的推导都会是字面量
  // 而用变量的都会推导至声明的类型  const 也会推导至字面量
  const name: string = 'breeze'; // 自动推导 const会更精确 你显示声明是string时那就是string
  const name1 = 'breeze';
  let num = 123; // let 自动推导不会精确到字面量

  handle1(name1); // breeze
  handle1(name); // string
  handle1(num); // number
  handle1(123); // 123
  handle1({ name: 'breeze' });
  handle1([599, 'arcbreeze']);
  handle1({});
  handle1({ name: '' });

  function swap<T, U>([start, end]: [T, U]): [U, T] {
    return [end, start];
  }

  swap(['breeze', 599]); // [string , number ] => [ number , string ]
  swap([null, 599]); // [ null ,number ] => [ number , null ]
  swap([{ name: 'breeze' }, {}]); // [ {} , { name : string } ] => [ { name : string} : {} ]
}

export {};
