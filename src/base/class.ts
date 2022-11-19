// class 类

class Foo {
  // 属性
  prop: string;

  // 构造函数
  constructor(inputProp: string) {
    this.prop = inputProp;
  }

  // 方法
  print(addon: string): void {
    console.log(this.prop + addon);
  }

  get propA(): string {
    return this.prop + 'A';
  }

  set propA(value: string) {
    this.prop = value;
  }
}

const foo = new Foo('default');
foo.print('--');
console.log(foo.propA);
foo.prop = 'aa';
console.log(foo.propA);
foo.propA = 'set';
console.log(foo.propA);

// 表达式声明class

let Bar = class {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  print(addon: string): void {
    console.log(this.name + addon);
  }
};

// 修饰符       三个访问性修饰符
// public    都可以访问
//protected  保护的 子类也可以访问   实例不可以访问
// private   私有 只有自己在类内部可以调用
// readonly    操作修饰符 只读

class Baz {
  private name: string;
  public age: number;
  public readonly male: boolean;
  protected flag: boolean;
  constructor(name: string) {
    this.name = name;
    this.age = 18;
    this.male = true;
    this.flag = true;
  }
}

class BazSon extends Baz {
  height: number;
  constructor(name: string) {
    super(name);
    this.height = 1.68;
  }

  print() {
    this.flag; // 可以访问 protected
    // this.name; // private 只能Baz自己内部使用
    console.log('male', this.male);
  }
}
new BazSon('').print();

class What {
  // 学会了,还能这样搞
  // !!!!!!这个缩写必须要填写修饰符 否则不成立!!!!!
  constructor(public name: string, private age: number = 18) {}

  static flag: boolean = true;

  print(): void {
    console.log(this.age);
    console.log(this.name);
  }
}

new What('breeze').print();
What.flag = false;
console.log(What.flag);

// 静态成员不会被实例继承，它始终只属于当前定义的这个类（以及其子类）

// 静态 说不好听点 可以当对象用  一个类上挂一堆工具方法 这是个工具类 不为了实例化,为这些方法提供一个载体

// 继承 实现 抽象类
// 基类和派生类  父类和子类

class Base {
  static age: number = 18;
  name: string;
  male: boolean = true;
  constructor(name: string) {
    this.name = name;
  }

  print() {
    console.log('super', this.male);
  }
}

class Son extends Base {
  male: boolean = false;
  constructor(name: string) {
    super(name);
  }
  // 确保我是重写了父类的方法
  override print(): void {
    // console.log('super.male', super.male);
    // 可以访问父类方法
    super.print();
    console.log('this.male', this.male);
  }

  // override log() {} // 未在基类中定义
}

//抽象类

abstract class AbsFoo {
  abstract absProp: string;
  abstract absMethod(name: string): string;
  abstract get absGetter(): string;
  // static abstract abs: boolean; // static 不能与 abs 一起使用
  // ts没有静态抽象
}

// 实现抽象类
class AFoo implements AbsFoo {
  constructor(public absProp: string) {}
  absMethod(name: string): string {
    return name;
  }
  get absGetter(): string {
    return this.absProp;
  }
}

interface FooStruct {
  absProp: string;
  get absGetter(): string;
  absMethods(input: string): string;
}

class IFoo implements FooStruct {
  constructor(public absProp: string) {}
  get absGetter(): string {
    return this.absProp;
  }
  absMethods(input: string): string {
    return input;
  }
}

// 就是写了个实例 实例肯定也是符合这个结构的
// 可以作为类的类型 也可以作为实例的类型
let OFoo: FooStruct = {
  absProp: '',
  absGetter: '',
  absMethods(input) {
    return input;
  },
};

// 完全类接口
// 不是完全理解了 TODO:

class Barr {
  constructor(public name: string) {}
  print(): void {
    console.log(this.name);
  }
}

interface BarrStruct {
  new (name: string): Barr;
}

declare let NewableBarr: BarrStruct;

let barr = new NewableBarr('name');

OFoo = new IFoo('');

new Son('a').print();

//---------------------

interface ComesFromString {
  name: string;
}

// 可以说是个可以限制是否实现 指定构造函数的限制
interface StringConstructable {
  new (n: string): ComesFromString;
}

class MadeFromString implements ComesFromString {
  constructor(public name: string) {
    console.log('ctor invoked');
  }
}

function makeObj(n: StringConstructable) {
  return new n('hello!');
}

console.log(makeObj(MadeFromString).name);

class Other implements ComesFromString {
  constructor(public name: string, count: number) {}
}
//Error! Other's constructor doesn't match StringConstructable
// makeObj(Other); //

makeObj(
  class {
    constructor(public name: string) {}
  }
);
// solid
//  单一原则  一个类或者一个方法就干一件事      解耦
//  开放封闭  可扩展但是不可修改
//  里氏替换 就是所有基类替换成派生类  并且对原来方法做的是扩展 而非缩窄
// 接口分离   多功能根据接口分离 只需要实现需要的即可     粒度
// 依赖倒置原则    功能的实现依赖于抽象层

// 属性特么也没办法抽象 抽象就是方法的抽象
// 我抽了 我不实现 你实现。
// 接口声明的 实际代码不会有体现
// 抽象类的具体产物的代码也会有具体的代码

// 抽象登陆类
abstract class LoginHandler {
  abstract handler(): void;
}

class WeChatLoginHandler implements LoginHandler {
  handler(): void {
    console.log('WeChatLoginHandler');
  }
}
class QQLoginHandler implements LoginHandler {
  handler(): void {
    console.log('QQLoginHandler');
  }
}
class TaoBaoLoginHandler implements LoginHandler {
  handler(): void {
    console.log('TaoBaoLoginHandler');
  }
}
enum LoginType {
  WeChat,
  TaoBao,
  QQ,
}

class login {
  // 登陆类
  public static handlerMap: Record<LoginType, LoginHandler> = {
    [LoginType.TaoBao]: new TaoBaoLoginHandler(),
    [LoginType.WeChat]: new WeChatLoginHandler(),
    [LoginType.QQ]: new QQLoginHandler(),
  };

  // 登陆抽象出来 需要什么扩展即可
  // 实现抽象 添加到map中 无需修改其他的逻辑
  public static handler(type: LoginType) {
    return this.handlerMap[type];
  }
}

export {};
