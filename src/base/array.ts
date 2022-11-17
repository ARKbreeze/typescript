const arr1: string[] = ['1', '2'];
const arr2: Array<string> = ['1', '2'];
// 类型相等  泛型

// 可控数组
// Tuple  元祖

const arr3: string[] = ['1', '2', '3'];
console.log(arr3[4]); // 超范围读取

const arr4: [string, string, string] = ['1', '2', '3'];
// @ts-expect-error
console.log(arr4[4]); // error

// 类对象数组属于是
// 类型也可自由限制
const arr5: [string, number, boolean] = ['name', 18, true];

// 当然元祖也可以可选   也是在--strictNullChecks : true 的情况下会把可选udf加入到类型中
//  而false udf与null是其他所有的子类 就不单独加入了
const arr6: [string, number?, boolean?] = ['name'];
// 元祖的长度类型也变成可选的了
type TupleLength = typeof arr6.length; // 3 | 1 | 2

// 在激进一点 ,我不做数组了
// 具名元祖
const arr7: [name: string, age?: number, male?: boolean] = ['name', 18, true];

// 元祖的限制 可以让解构赋值时减少出错的可能 js的数组的长度无法进行显示的声明
const [name, ,] = arr7;
// const [name1, age, male, err] = arr7;   err 超出范围
export {};
