/**
 * 제네릭 활용 사례 1
 */

function swap<T, U>(a: T, b: U) {
  return [b, a];
}

const [a, b] = swap(1, "a");

/**
 * 제네릭 활용 사례 2
 */

function returnFirstValue<T>(data: [T, ...unknown[]]) {
  return data[0];
}

let num = returnFirstValue([0, 1, 2]);
// 0

let str = returnFirstValue([1, "hello", "world"]);
// "hello"

/**
 * 제네릭 활용 사례 3
 */

function getLength<T extends { length: number }>(data: T) {
  return data.length;
}

let var1 = getLength([1, 2, 3]);

let var2 = getLength("12345");

let var3 = getLength({ length: 10 });
