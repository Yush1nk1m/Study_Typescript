/**
 * 기본 타입 간의 호환성
 */
let num1: number = 10;
let num2: 10 = 10;

num1 = num2;
// num2 = num1;

/**
 * 객체 타입 간의 호환성
 */

type Animal = {
  name: string;
  color: string;
};

type Dog = {
  name: string;
  color: string;
  breed: string;
};

let animal: Animal = {
  name: "강아지",
  color: "yellow",
};

let dog: Dog = {
  name: "초코",
  color: "gold",
  breed: "foodle",
};

animal = dog;
// dog = animal;

type Book = {
  name: string;
  price: number;
};

type ProgrammingBook = {
  name: string;
  price: number;
  skill: string;
};

let book: Book;
let programmingBook: ProgrammingBook = {
  name: "혼자 공부하는 파이썬",
  price: 20000,
  skill: "python",
};

book = programmingBook;
// programmingBook = book;

/**
 * 초과 프로퍼티 검사
 */

let book2: Book = {
  name: "혼자 공부하는 파이썬",
  price: 20000,
  //   skill: "python",
};

let book3: Book = programmingBook;

function func(book: Book) {}

func({
  name: "혼자 공부하는 파이썬",
  price: 20000,
  //   skill: "python",
});
