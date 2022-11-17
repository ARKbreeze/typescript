const arr1: string[] = ['1', '2'];
const arr2: Array<string> = ['1', '2'];
// 类型相等  泛型

// 可控数组
// Tuple  元祖

const arr3: string[] = ['1', '2', '3'];
console.log(arr3[4]); // 超范围读取

const arr4: [string, string, string] = ['1', '2', '3'];
console.log(arr4[4]);

// 类对象数组属于是
// 类型也可自由限制
const arr5: [string, number, boolean] = ['name', 18, true];

export {};
