/**
 * 인터페이스(Interface)
 */

interface Person {
  readonly name: string;
  age?: number;
  sayHi(): void;
  sayHi(a: number, b: number): void;
}

type Func = {
  (): void;
};

const person: Person = {
  name: "김유신",
  age: 24,
  sayHi: function () {
    console.log("Hi");
  },
};
