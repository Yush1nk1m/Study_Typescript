/**
 * 함수 타입 정의
 */

function func(a: number, b: number) {
  return a + b;
}

/**
 * 화살표 함수의 타입 정의
 */

const add = (a: number, b: number): number => a + b;

/**
 * 함수의 매개변수
 */

function introduce(name = "김유신", age: number, tall?: number) {
  console.log(`name: ${name}`);
  if (typeof tall === "number") {
    console.log(`tall: ${tall + 10}`);
  }
}
introduce("김유신", 24);
introduce("김유신", 24, 165);

function getSum(...rest: number[]) {
  let sum = 0;
  rest.forEach((number) => (sum += number));

  return sum;
}
getSum(1, 2, 3);
getSum(1, 2, 3, 4, 5);
