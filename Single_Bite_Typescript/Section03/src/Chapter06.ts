/**
 * 타입 단언(Type assertions)
 */

type Person = {
  name: string;
  age: number;
};

let person = {} as Person;
person.name = "김유신";
person.age = 24;

type Dog = {
  name: string;
  color: string;
};

let dog = {
  name: "초코",
  color: "황금",
  breed: "푸들",
} as Dog;

/**
 * 타입 단언의 규칙
 * 값 as 단언 <- 단언식
 * A as B: A가 B의 supertype이거나 subtype이어야 한다.
 */

let num1 = 10 as never;
let num2 = 10 as unknown;
let num3 = 10 as unknown as string; // 다중 단언

/**
 * const assertion
 */
let num4 = 10 as const;

let cat = {
  name: "나비",
  color: "회색",
} as const;

/**
 * Non-null assertion
 */

type Post = {
  title: string;
  author?: string;
};

let post: Post = {
  title: "게시글 1",
  author: "김유신",
};

const len: number = post.author!.length;
