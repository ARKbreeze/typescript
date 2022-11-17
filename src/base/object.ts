//  对象类型

// 对象实现类型 必须完全按照类型来 不能多属性 也不能少属性 当然如果属性是可选的,你可以选择 核心是符合接口的规则
// 当然也可以修饰对象的属性
// 1. Readonly 只读
// 2. Optional 可选

//接口
interface IDescription {
  readonly name: string;
  age: number;
  male?: boolean;
  func?: Function;
}

const obj: IDescription = {
  name: 'name',
  age: 18,
  male: true,
  // 不实现func也是可以的
};

obj?.male;
obj.func && obj.func();
// 但是可选不会影响赋值
obj.male = true;
obj.func = () => {};

// 只读无法被再次修改
// obj.name = 'newName';  //err  readonly

// 对于元祖来说 无法对单个属性进行只读 , 只可以对元祖整体进行只读 ,毕竟你元祖还是too naive
// 数组层面也有只读
// 此时的元祖会变成只读元祖 push和pop也会禁用
const turArr: readonly [name: string, age: number, male?: boolean] = ['name', 18];
// turArr.push(); // 提示不存在push属性

// type & interface
// type    type alias 类型别名
// interface 接口
// 推荐  对象和类 使用接口定义
// 类型别名  将一个函数签名  联合类型  工具类型 等抽离成一个完整独立的类型
// 当然 大部分情况下 类型可以完全替代接口, 统一使用也无妨 看取舍

// Object , object , {} (一个空对象)

// Object  顶层对象 一切的源头
// @ts-ignore
const tmp1: Object = undefined; // 需要关闭 strickNullChecks
// @ts-ignore
const tmp2: Object = null; // 同上
// @ts-ignore
const tmp3: Object = void 0; // 同上

const temp4: Object = 'string'; //string
const temp5: Object = 18; //number
const temp6: Object = true; //boolean
const temp7: Object = []; // array
const temp8: Object = {}; // object
const temp9: Object = () => {}; //function

// 关于包装类型 同样表象的超出预期
const tes1: String = 'string';
const test11: String = new String('string');

// @ts-ignore 需要非严格
const tes2: String = void 0; //  我觉得这三个可能不需要再说了吧 ,关闭非严格所有类型都可以搞
// @ts-ignore 需要非严格
const tes3: String = null; //
// @ts-ignore 需要非严格
const tes4: String = undefined; //

// const test5: String = 599; // 不可赋值其他拆箱类型

// 在任何情况下，你都不应该使用这些装箱类型。
// 装箱类型能够包含对象类型，比如一个{}如果实现了所有字符串方法就可以被视为String类型

// 因为js 空对象一旦实现了对应的属性和方法就会被视为对应的类型  装箱类型等于囊括了对象的一部分

// 对于Object类型的错误使用 所以引入了 object 代表所有非原始类型(基本数据类型) 即数组, 对象与函数

// void , null , undefined 就不写了 常规三件套

// const obj: object = 'string'; //err
// const obj1 object = 18; //err
// const obj2 object = true; //err

const obj3: object = [];
const obj4: object = { name: 'string' };
const obj5: object = () => {};

// {} .  可以理解为对象字面量 但是这个字面量是everything
// new Object() 为所有非 null和undefined之外的所有

// void,null,undefined三件套

const empty: {} = 'string';
const empty1: {} = 18;
const empty2: {} = true;
const empty3: {} = { name: 'string' };
const empty4: {} = [];
const empty5: {} = () => {};

// 包括给object 还有 {} 和 Object 赋值 你都无法使用除这些类型之外的所有属性 ,即使你可以,但是你自己把你阉割了属于是

// console.log({ name: '' }.toString());  //除了与生俱来的toString函数

// 最后，为了更好地区分 Object、object 以及{}这三个具有迷惑性的类型，我们再做下总结：

// 在任何时候都不要，不要，不要使用 Object 以及类似的装箱类型。

// 当你不确定某个变量的具体类型，但能确定它不是原始类型，可以使用 object。 // 赞同
// 但我更推荐进一步区分，也就是使用
// 1. Record<string,unknown> 或 Record<string, any> 表示对象                                      //TODO:这个暂时不理解
// 2. unknown[] 或 any[] 表示数组,(...args: any[]) => any表示函数这样                               //理解
// 3. 我们同样要避免使用{}{}意味着任何非 null / undefined 的值,从这个层面上看,使用它和使用 any 一样恶劣     //理解

// const tt: [string, number, boolean] = ['name', 18, true];
// const [i, j, k, l] = tt;
// 所以元祖的使用要禁止掉 pop和push  为什么要用元祖不就是为了确定个数根类型 合适就好
export {};
