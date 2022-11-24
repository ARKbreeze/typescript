// 结构化类型系统
// 标称类型系统
{
  class Cat {
    eat() {}
  }

  class Dog {
    eat() {}
  }

  function feedCat(cat: Cat) {}
  // 很神奇 竟然接受了 当然强类型肯定八可以
  feedCat(new Dog());
}

{
  // 结构化类型系统
  class Cat {
    eat() {}
    meow() {}
  }

  class Dog {
    eat() {}
  }

  function feedCat(cat: Cat) {}
  function feedDog(dog: Dog) {}
  //多了一个属性就八可以了
  feedCat(new Cat()); //true
  // feedCat(new Dog()); //error    也就是你只要实现了我要求类型的属性，那我就认你
  feedDog(new Dog()); //true
  feedDog(new Cat()); //true

  //ts 比较不是根据具体的类名进行比较的 而是根据具体的属性和方法一致来进行比较的
  //鸭子类型（Duck Typing），这个名字来源于鸭子测试（Duck Test）。其核心理念是，如果你看到一只鸟走起来像鸭子，游泳像鸭子，叫得也像鸭子，那么这只鸟就是鸭子。
}

{
  class Cat {
    eat() {
      return true;
    }
  }

  class Dog {
    eat() {
      return 1;
    }
  }
  function feedCat(cat: Cat) {}
  // feedCat(new Dog()); //error
}

{
  // 标称类型系统
  type USD = number;
  type CNY = number;

  const CNYCount: CNY = 200;
  const USDCount: USD = 200;

  function addCNY(source: CNY, input: CNY) {
    return source + input;
  }

  addCNY(CNYCount, USDCount);
  // 需要通过名称来分辨类型
  // 标称中只能通过显示的继承来实现具体的父子关系
}

declare class TagProtector<T extends string> {
  protected __tag__: T;
}

type Nominal<T, U extends string> = T & TagProtector<U>;

{
  // ts模拟标称

  // 这只是在类型层面进行限制了
  type CNY = Nominal<number, 'CNY'>;
  type USD = Nominal<number, 'USD'>;

  const CNYCount = 100 as CNY;
  const USDCount = 100 as USD;

  function addCNY(source: CNY, input: CNY): CNY {
    return (source + input) as CNY;
  }

  addCNY(CNYCount, CNYCount);
  // addCNY(CNYCount, USDCount); // error
}

{
  // 逻辑层面
  class CNY {
    private __tag!: void;
    constructor(public value: number) {}
  }

  class USD {
    // protected __tag!: void; //也可以   私有是为了这个只是为了分辨的属性不要被乱用 public 就是鸭子类型
    private __tag!: void;
    constructor(public value: number) {}
  }

  const CNYCount = new CNY(100);
  const USDCount = new USD(100);

  function addCNY(source: CNY, input: CNY): CNY {
    return new CNY(source.value + input.value);
  }

  addCNY(CNYCount, CNYCount);
  // addCNY(CNYCount, USDCount); // 等于私有了 error
}

//另外，在 type-fest 中也通过 Opaque Type 支持了类似的功能，其实现如下：
declare const tag: unique symbol;

declare type Tagged<Token> = {
  readonly [tag]: Token;
};

type Opaque<Type, Token = unknown> = Type & Tagged<Token>;
// 实现思路一致的

//总结一下，在 TypeScript 中我们可以通过类型或者逻辑的方式来模拟标称类型，这两种方式其实并没有非常明显的优劣之分，基于类型实现更加轻量，你的代码逻辑不会受到影响，但难以进行额外的逻辑检查工作。而使用逻辑实现稍显繁琐，但你能够进行更进一步或更细致的约束。

// 类型不会生成实际的js代码  但是也不能在实际运行中进行约束    逻辑反之
