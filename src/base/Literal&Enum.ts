// literal
// 字面量

//字面量类型 代表比原始类型更精确的类型 同时是原始类型的子类型

// 返回值定义
interface Res {
  code: number;
  status: string;
  data: any;
}

// 字面量加联合类型 缩小范围
interface IRes {
  code: 200 | 400 | 500;
  status: 'success' | 'failure';
  data: any;
}

// 学会了 声明一个对象是什么 没必要每次都实例化一个
declare let res: Res;

declare let res1: IRes;
if (res1.status === 'success') {
  console.log('success');
}

// 字面量类型
// 字符串字面量类型
const str: 'stringLiteral' = 'stringLiteral';
// 数字字面量类型
const num: 123 = 123;
// const 会自动推到到字面量类型 let 会推到到 number 类型  也方便代码优化
const num1 = 123;
// 布尔字面量类型
const bool: true = true;

// 单独使用看起来用处不大 更多是跟随着 | (联合类型) 一起使用
interface Tmp {
  name: 'string';
  type: 0 | 1 | 2;
  job: 'fe' | 'be' | 'pr';
  sex: 'male' | 'female';
  male: true | false;
  func: () => {}; // 函数类型不存在字面量类型     () => {}   是 无参数 任意返回类型 不严格就是除了unf nul void 三件套外所有
  mutType: true | string | (() => {}) | { name: string; age: number }; // 多类型联合
  user:
    | {
        vip: true;
        expires: string;
      }
    | {
        vip: false;
        promotion: string;
      }; // 也可以做到不同情况 字段的控制
}
declare let tmp: Tmp;
tmp.mutType = () => {
  return { name: String };
};

if (tmp.user.vip) {
  console.log(tmp.user.expires);
}

// 类型别名来服用字面量联合类型
type Code = 100 | 200 | 300 | 400;
declare let resCode: Code;
type Status = 'success' | 'failure';
declare let stu: Status;
console.log(stu === 'failure');

// 对象字面量类型

interface Tmp1 {
  obj: {
    name: 'breeze';
    age: 18;
  };
}

declare let objTmp: Tmp1;
// 对象字面量过于一致 用处少 我觉得上面互斥可能会有用,算字面了,但每完全字面  了解即可

// 字面量可以说是对原始类型的进一步扩展
// 那枚举可以说是对对象的进一步扩展

// Enum
// 枚举

// 比如常见的常量定义
const PageUrl = {
  HomePageUrl: 'url1',
  SettingPageUrl: 'url2',
};

PageUrl.HomePageUrl; // 只会显示到string类型
// 转换成枚举

enum EnumPageUrl {
  HomePageURl = 'url1',
  SettingPageURL = 'url2',
}

EnumPageUrl.HomePageURl; // 可以直观显示到具体值

enum EnumNum {
  Foo,
  Bar,
  Baz,
}
// 不给初始值的话 会自动设置从零开始的递增值  number
console.log(typeof EnumNum.Foo); // 0
EnumNum.Bar; // 0

enum EnumNum1 {
  Foo, // 0
  Bar = 499, // 499
  Baz, // 500
}
// 会自动进行推导  没有基值的就还是从零开始

// 延迟求值的枚举   延迟可以理解为暂时无值,所以要避免无法推导   其紧随后不能有需要推导的值
const returnNum = () => 200;

enum DelayEnum {
  Foo = returnNum(),
  Bar = 200,
  Baz, // 201
}

// 枚举混合
// 枚举双相映射
const ItemObj = {
  Foo: 0,
  Bar: 1,
  Baz: 2,
};

enum Items {
  Foo,
  Bar,
  Baz = 'BazValue',
}
// 相当于实现了 kv
const fooValue = Items.Foo; // "0"
const fooKey = Items[0]; // "Foo"

const foValue = ItemObj.Foo; // 0
// const foKey = ItemObj[0]  // error

// 只有对应值为number的可以双向映射  字符串与对象表现一致

// 枚举产物
// var Items;
// (function (Items) {
//     Items[Items["Foo"] = 0] = "Foo";
//     Items[Items["Bar"] = 1] = "Bar";

// 1.  第一步是  Items["Foo"] = 0   而复制表达式返回值是复制的结果即返回 0
// 2.  第二部是   Items[0] = "Foo"

//  // 假设字符串按照数字一样的处理 经过这两步 结果是一样的
//  1.  Items["Baz"] = "BazValue"    //如果占用其他枚举值就会出错
//  2.  Items["BazValue"] = "Baz"    // 所以实际的处理

//    Items["Baz"]  = "BazValue";

// })(Items || (Items = {}));

// 除了数字枚举 和字符串枚举
// 还有普通枚举和常量枚举

// 常量枚举  const enum   生成产物不再包含辅助对象 会直接在访问枚举处替换为具体值 因为没有了辅助对象 所以也无法根据value映射到key
// 如果只有枚举值的需求 可以采用 进一步优化代码

const enum ConstEnum {
  Foo,
  Bar,
  Baz = 'BazValue',
}

ConstEnum.Foo;
// ConstEnum[0]; // error   无法根据value找到key
ConstEnum['Bar']; //字符串本来就是正常访问
ConstEnum.Bar;
export {};
