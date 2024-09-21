/**
 * 인터페이스 선언 합침
 */

interface Person {
  name: string;
}

interface Person {
  age: number;
}

interface Developer extends Person {
  name: "hello";
}

const person: Person = {
  name: "유신",
  age: 24,
};

/**
 * 모듈 보강
 */

interface Lib {
  a: number;
  b: number;
}

interface Lib {
  c: string;
}

const lib: Lib = {
  a: 1,
  b: 2,
  c: "hello",
};
