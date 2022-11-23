// 类型断言
// 升系统升坏了 重装了一下系统 然后摸了一天
// game start

// 只是警告编译器不要报错
let unKnowVar: unknown;

// 直接进行指定
(unKnowVar as { foo: () => {} }).foo(); // 懂？
(unKnowVar as any).wakawaka(); // 放肆起来了

type union = string | number;
// 联合类型的缩小
function bar(par: union) {
  (par as string).toString();
  // 缩小范围 不是根据typeof进行实际的判断 而是我主观认为你是 所以把你改变了
}

interface IFoo {
  name: string;
}

declare const obj: {
  foo: IFoo;
};

const { foo = {} as IFoo } = obj;
// const { foo = { name: '' } } = obj; // 这种自己推导就是IFoo
// 稍微有点牵强
// 总结就是 as 能不用就不用 用了基本就是as any 一类的 尽量避免

// 双重断言

//如果在使用类型断言时，原类型与断言类型之间差异过大，也就是指鹿为马太过离谱，离谱到了指鹿为霸王龙的程度，TypeScript 会给你一个类型报错：   // 给我看乐了

const str: string = 'arcbreeze';
// (str as { handler: () => {} }).handler(); // 过于离谱的类型转换会报错
(str as any as { handler: () => {} }).handler(); //
// 等于系统能静态分析的确定推断 如果你as到另一个确定的类型 不兼容的话会报错 any估计直接不管了 // 确实 //所以想转换还是 先 as any 再 as 离谱类型

// 非空断言
declare const empty: {
  func?: () => { prop?: number | null };
};

// empty.func().prop.toFixed(); // error

empty.func?.().prop?.toFixed(); // 长见识了 这是?.的调用方式

empty.func!().prop!.toFixed(); // 这是非空断言的处理 这种忽略判断但是运行时可能会出错 ?.不会不存在时返回udf结束执行

// 非空断言实际执行为类型断言 其实是帮我把未知先断言下来了 所以无论是什么都会去执行
(
  (
    empty.func as () => {
      prop?: number;
    }
  )().prop as number
).toFixed();

// non-nullable-type-assertion-style  eslint规则检查是否有类型断言可以简写成非空断言

//  consistent-type-assertions eslint  约束as < [type] > 语法 因为jsx也有< >

// 比如给你一个借口
interface IStruct {
  foo: string;
  bar: {
    barPropA: string;
    barPropB: number;
    barMethod: () => void;
    baz: {
      handler: () => Promise<void>;
    };
  };
}
// 你要测试数据 那你要全部实现才可以用
const test: IStruct = {
  foo: '',
} as IStruct;
// <> 语法
const test1: IStruct = <IStruct>{
  foo: '',
};

test.bar.barMethod(); //  这些都可以用  当然你应该使用你定义的 可以不用全部实现
test1.bar.barMethod();
export {};
