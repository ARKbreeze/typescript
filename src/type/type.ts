// 类型创建类

// 类型别名 type
{
  // 作为创建类型
  type A = string;
  // 联合类型
  type StatusCode = 100 | 200 | 300 | 400 | 502;
  type PossibleDataTypes = string | number | (() => unknown);
  const status: StatusCode = 502;
  // 函数
  type Handler = (e: Event) => void;
  const clickHandler: Handler = (e) => {};
  //对象
  type ObjType = {
    name: string;
    age: number;
    male: boolean;
  };
}

// type作为工具类型 多了泛型
// 一旦接受了泛型 我们就叫它工具类型
{
  type Factory<T> = T | number | string;
  const foo: Factory<boolean> = true;
  // 一般不会直接使用工具类型进行声明 一般在声明一个类型
  type FactoryWithBool = Factory<boolean>;
  const bar: FactoryWithBool = foo;
  // 参数T 一般沿用 T/K/U/V/M/O...   当然也可以写单词  尽量使用大驼峰
  type Factories<NewType> = NewType | string | number;

  // 简单工具类型
  type MaybeNull<T> = T | null;
  function process(input: MaybeNull<{ handler: () => {} }>) {
    input?.handler();
  }

  type MaybeArray<T> = T | Array<T>; // 有点东西
  function ensureArray<T>(input: MaybeArray<T>): T[] {
    return Array.isArray(input) ? input : [input];
  }
  ensureArray<boolean>(true);
}

{
  // 联合类型 ｜
  // 交叉类型 &
  interface NameStruct {
    name: string;
  }
  interface AgeStruct {
    age: number;
  }
  type ProfileStruct = NameStruct & AgeStruct;
  const profile: ProfileStruct = {
    name: 'arcbreeze',
    age: 18,
  };

  // 原始类型取交为 never 互斥的
  type StrAndNum = string & number; // never
  // never 的意义 描述不存在的类型

  type Struct1 = {
    primitiveProp: string;
    objectProp: {
      name: string;
    };
  };
  type Struct2 = {
    primitiveProp: number;
    objectProp: {
      age: number;
    };
  };

  type Composed = Struct1 & Struct2; // 大类型交叉 同名子类型也会合并交叉
  // 类型也是个对象也可以取值的
  type primitiveType = Composed['primitiveProp']; // never
  type ObjectType = Composed['objectProp']; // { name : string , age : number }

  // 联合交叉同理 也是合并取交集
  type unionIntersection1 = (1 | 2 | 3) & (2 | 3); // 2 ｜ 3
  type unionIntersection2 = (string | number | symbol) & string; // string
  //总结一下交叉类型和联合类型的区别就是，联合类型只需要符合成员之一即可（||），而交叉类型需要严格符合每一位成员（&&）
}

{
  // 索引类型
  // 1. 索引类型签名 2. 索引类型查询 3. 索引类型访问
  // 都是通过索引的形式来进行类型操作的
}

{
  // 索引类型签名

  interface AllStringType {
    [key: string]: string;
  }
  type AllStringTypes = {
    [key: string]: string;
  };

  type PropType1 = AllStringType['arc']; // string
  type PropType2 = AllStringTypes['breeze']; // string

  // js中对于索引数字的访问 实际还是转成字符串进行访问的
  const foo: AllStringType = {
    name: 'arc',
    1: 'breeze',
    [123]: '',
    ['1233']: '',
    [Symbol('123')]: '',
  };

  // 索引签名也可以与具体的键值对类型声明合并
  interface IFoo {
    [key: string]: string;
    // propA: boolean;  //error
    PropB: string;
  }
  interface IBar {
    [key: string]: number | boolean;
    PropA: number;
    PropB: boolean;
    PropC: number | boolean;
  }

  //索引签名类型的一个常见场景是在重构 JavaScript 代码时，为内部属性较多的对象声明一个 any 的索引签名类型，以此来暂时支持对类型未明确属性的访问，并在后续一点点补全类型

  interface AnyTypeHere {
    [key: string]: any;
  }
  const foo1: AnyTypeHere['foo1'] = { foo, log: () => {} };
}

{
  //索引类型查询 keyof

  interface IFoo {
    // 字面量类型
    name: 1;
    599: 2;
  }

  type IFooKeys = keyof IFoo; // 'name' | 599    599返回是数字而不是字符
  type AnyKeys = keyof any; //
  // const an: AnyKeys = true; // 'string' | 'name' | symbol
  // keyof 会返回联合类型
}

{
  // 索引类型访问

  interface NumberRecord {
    [key: string]: number;
  }
  type PropType = NumberRecord[string]; // number

  interface IFoo {
    propA: string;
    propB: number;
    propC: boolean;
    [key: string]: string | boolean | number;
  }
  type PropAType = IFoo['propA']; // string
  type PropBType = IFoo['propB']; // number
  // 通过key拿所有值类型
  type PropsType = IFoo[keyof IFoo];
  type PropAllType = IFoo[string];
  //注意，在未声明索引签名类型的情况下，我们不能使用 NumberRecord[string] 这种原始类型的访问方式，而只能通过键名的字面量类型来进行访问
}

{
  // 映射类型 类型工具

  // 把原本的类型全转成string了
  type Stringify<T> = {
    [K in keyof T]: string;
  };

  interface Foo {
    propA: number;
    propB: string;
    propC: boolean;
    propD: () => void;
  }

  type StringFoo = Stringify<Foo>;
  /*   type StringFoo = {
    propA: string;
    propB: string;
    propC: string;
    propD: string;
  } */

  // 键拿到了 值其实也就拿到了
  type clone<T> = {
    [K in keyof T]: T[K];
    // 第一个[]是索引签名   in 是映射操作
    // keyof查询key     T[K] 索引访问value
  };

  type CloneFoo = clone<Foo>;
  /*  type CloneFoo = {
    propA: number;
    propB: string;
    propC: boolean;
    propD: () => void;
  } */
}

export {};
