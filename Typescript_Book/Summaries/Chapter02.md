# Chapter02. 기본 문법 익히기

이 장에서는 타입스크립트의 기본 문법에 대해 익힌다.

## 2.1 변수, 매개변수, 반환값에 타입을 붙이면 된다

타입스크립트의 기본 타입은 자바스크립트와 대응되어 `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`, `object`가 있다. 함수와 배열은 객체로 취급된다. `symbol` 타입은 ES2015 이상에서만, `bigint` 타입은 ES2020 이상에서만 사용 가능하다.

**변수 타이핑**

```
const str: string = "hello";
const num: number = 123;
const bool: boolean = false;
const n: null = null;
const u: undefined = undefined;
const sym: symbol = Symbol("Sym");
const big: bigint = 10000000000000n;
const obj: object = { hello: "world" };
```

**함수 타이핑**

```
function plus(x: number, y: number): number {
  return x + y;
}

const minus = (x: number, y: number): number => x - y;
```

## 2.2 타입 추론을 적극 활용하자

2.1절에서 선언한 `plus` 함수를 사용해 보자.

```
function plus(x: number, y: number): number {
  return x + y;
}

const minus = (x: number, y: number): number => x - y;

const result = plus(1, 2);
console.log("result: ", result);
```

`result` 변수의 타입을 선언하지 않았지만 타입스크립트의 타입 추론 기능 덕에 변수 위에 마우스를 올려두면 `const result: number`과 같이 타입이 부여되어 있다.

이처럼 타입스크립트는 어느 정도의 변수와 반환값의 타입을 추론할 수 있다. 그러나 매개변수는 어떤 값이 주어질지 알 수 없으므로 반드시 타입을 부여해야 한다.

```
function plus(x, y): number {
  return x + y;
}
```

만약 이렇게 매개변수를 타이핑하지 않으면 타입스크립트가 타입 추론 결과 `any` 타입으로 예측할 수밖에 없다는 `'x' 매개 변수에는 암시적으로 'any' 형식이 포함됩니다.ts(7006)` 오류가 표시된다. 이를 `implicitAny` 에러라고 부른다.

`const` 대신 `let` 키워드로 변수를 선언하고 타이핑을 하지 않으면 타입 넓히기(Type Widening) 현상이 발생해 처음 대입된 값보다 타입을 넓게 추론한다. 특히 `null` 또는 `undefined`를 대입하면 `any` 타입으로 추론하게 된다. 때문에 `let` 키워드로 변수를 선언할 때는 타이핑에 주의해야 한다.

## 2.3 값 자체가 타입인 리터럴 타입이 있다

**리터럴 타입**

```
// 원시 자료형에 대한 리터럴 타입
const str: "hello" = "hello";

// 객체를 표시하는 리터럴 타입
const obj: { name: "yushin" } = { name: "yushin" };
const arr: [1, true, "yushin"] = [1, true, "yushin"];
const func: (amount: number, unit: string) => string = (amount, unit) =>
  amount + unit;
```

단순히 타입을 제한하는 게 아니라 그 형태까지 제한하는 리터럴 타입이 있다. 함수 리터럴 타입의 경우 표현 방식이 일반적인 함수 타이핑과 다르므로 주의해야 한다. 객체 리터럴 타입의 경우 타이핑하지 않으면 타입 추론이 대부분의 경우 부정확하게 되므로 `as const` 접미사를 사용해 이를 제한할 수 있다.

**as const 접미사 사용**

```
const obj = { name: "yushin" } as const;
const arr = [1, true, "yushin"] as const;
```

## 2.4 배열 말고 튜플도 있다

**배열 타이핑**

```
const arr1: string[] = ["1", "2", "3"];
const arr2: Array<number> = [1, 2, 3];
```

배열에 대해서는 `타입[]` 또는 `Array<타입>`으로 타이핑할 수 있다. 빈 배열의 경우 `any[]`로 타입 추론되므로 주의해야 한다.

**타입 추론의 한계**

```
const array = [1, 2, 3];
array[3].toFixed();
```

이 코드는 에러를 발생시키지만 타입 검사만으로는 한계가 있다. 배열의 3번째 요소는 `undefined`이지만 어쨌든 타입 추론에 의해 `number[]` 타입으로 고정되어 있기 때문이다. 이는 각 요소 자리에 타입이 고정되어 있는 배열인 튜플(tuple)을 사용해 해결할 수 있다.

**튜플 타이핑**

```
const tuple: [number, boolean, string] = [1, true, "yushin"];
tuple.push(4);
```

`[]` 안에 정확한 타입을 하나씩 입력한다. 표기하지 않은 자리는 `undefined` 타입이 되어 앞선 예제의 오류를 발견할 수 있게 된다.

그러나 이 경우에도 튜플에 `push`, `pop`, `unshift`, `shift` 메서드를 사용해 배열을 조작할 수 있다. 그래도 타이핑한 범위를 초과하는 값을 참조할 수 없으니 앞선 예제에선 문제가 되지 않지만 배열의 크기가 줄어들면 또 다시 잘못된 참조로 인한 타입 에러가 발생할 수 있다. 이처럼 데이터에 대한 조작을 차단하려면 `readonly` 수식어를 붙여주어야 한다.

**readonly 수식어 사용**

```
const tuple: readonly [number, boolean, string] = [1, true, "yushin"];
```

**가변 길이 튜플 타이핑**

```
const strNumBools: [string, number, ...boolean[]] = ["1", 2, true, true, true];
const strNumsBool: [string, ...number[], boolean] = ["1", 2, 3, 4, true];
const strsNumBool: [...string[], number, boolean] = ["1", "2", "3", 4, true];
```

튜플 타이핑 시 전개(spread) 연산자를 사용하여 가변 길이의 배열에서도 특정 위치에 오는 원소의 타입을 부여할 수 있다.

**나머지 속성 문법 타이핑**

```
const [a, ...rest1] = ["hi", 1, 2, 3];
const [b, ...rest2]: [string, ...number[]] = ["hi", 1, 2, 3];
```

구조분해 할당에서는 나머지 속성(rest property) 문법을 사용할 수 있다.

**옵셔널 수식어 사용**

```
let tuple: [number, boolean?, string?] = [1, false, "hi"];
tuple = [3, true];
tuple = [5];
```

`?`는 옵셔널(optional) 수식어로 해당 자리에 값이 올 수도 있고 안 올 수도 있을 때 사용한다. 즉, 옵셔널 수식어를 사용하면 해당 자리의 타입이 `명시한 타입 | undefined`가 된다.

## 2.5 타입으로 쓸 수 있는 것을 구분하자

대부분의 리터럴 값 및 `Date`, `Math`, `Error`, `String`, `Object`, `Number`, `Boolean` 등의 내장 객체는 타입으로 사용할 수 있다. 그러나 변수의 이름은 그 자체로는 타입으로 사용할 수 없고 `typeof` 키워드를 붙여 타입으로 사용 가능하다.

이때 `String`, `Object`, `Number`, `Boolean`, `Symbol`은 타입으로 사용하는 것이 권장되지 않는다. `Number` 객체 간 연산자를 사용할 수 없고 `string`에 `String`을 대입할 수도 없기 때문이다. 또한 `Object` 타입의 변수는 문자열 대입이 가능하다.

**typeof 키워드 사용**

```
function add(x: number, y: number) {
  return x + y;
}
const add2: typeof add = (x, y) => x + y;
```

클래스의 경우는 `typeof` 키워드 없이도 이름만으로 타입으로 사용 가능하다.

**클래스 타이핑**

```
class Person {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

const person: Person = new Person("yushin");
```

## 2.6 유니언 타입으로 OR 관계를 표현하자

타입스크립트에는 타이핑을 위한 유니언 타입과 파이프 연산자(|)가 있다. 유니언 타입은 하나의 변수가 여러 타입을 가질 수 있는 가능성을 표시한다.

**유니언 타입**

```
let strOrNum: string | number = "hello";
strOrNum = 123;
```

자바스크립트의 자유도가 타입스크립트에 의해 제한된 대표적인 예가 `parseInt`이다. 자바스크립트에선 `parseInt(1)`, `parseInt('1')` 둘 다 어떤 에러도 발생시키지 않지만, 타입스크립트에선 에러를 발생시킨다. 이때 타입 좁히기(Type Narrowing)라는 기법을 사용해야 한다.

**parseInt를 사용하기 위한 타입 좁히기**

```
let strOrNum: string | number = "hello";
strOrNum = 123;

if (typeof strOrNum === "number") {
    strOrNum.toFixed();
}
```

## 2.7 타입스크립트에만 있는 타입을 배우자

### 2.7.1 any

`any`는 타입스크립트에서 지양해야 할 타입이다. 모든 동작을 허용하고 타입스크립트의 타입 검사 대상에서 벗어나게 되어 타입스크립트의 사용 의미가 퇴색된다. 한 번 `any` 타입을 사용하면 그 뒤에 파생되는 모든 값들도 `any` 타입으로 추론되므로 사용을 지양하자.

`JSON.parse`와 `fetch`의 경우 타입스크립트가 명시적으로 `any`를 반환한다. 그러므로 이들의 경우 직접 타이핑하여 향후 파생되는 타입이 `any`가 되는 것을 방지해야 한다.

**fetch, JSON.parse 타이핑**

```
fetch("https://api.scsdevs.com/v1/sections")
  .then<
    {
      id: number;
      subject: string;
      description: string;
      createdAt: Date;
      updatedAt: Date;
      creator: object;
    }[]
  >((response) => {
    return response.json();
  })
  .then((result) => {
    console.log(result);
  });

const result: { name: string } = JSON.parse(`{"name": "yushin"}`);
```

### 2.7.2 unknown

`unknown`은 `any`와 비슷하게 모든 타입을 대입할 수 있지만, 대입 이후 어떤 동작도 수행할 수 없게 된다. 대표적으로 try-catch 문의 에러 타입에 등장하는데, 이는 `any`, `unknown` 타입 외 어떤 타입도 대입할 수 없기 때문에 `as` 키워드로 타입 주장(Type Assertion)할 수 있다.

**as 키워드를 사용한 타입 주장**

```
try {
  throw new Error("에러");
} catch (e) {
  const error = e as Error;
  console.log(error.message);
}
```

`as` 키워드와 비슷한 것으로 `!`(non-null assertion) 연산자가 있다. 이는 `null`, `undefined` 타입이 아님을 주장하는 연산자이다.

**! 연산자 사용**

```
const func = (param: string | null | undefined) => {
  param!.slice(3);
};
```

### 2.7.3 void

**void 타입 추론**

```
const noReturn = () => {};
```

함수의 반환값이 없는 경우 반환값이 `void`로 추론된다. `void`는 함수의 반환값을 무시하도록 하는 특수한 타입으로, `undefined`가 아닌 다른 타입을 반환해도 그 행위 자체를 막지는 않지만 반환값을 사용할 순 없다.

**함수 반환값 void 타이핑**

```
const func1: () => void = () => 3; // 오류 X
const func2 = (): void => 3; // 오류
```

`func1`처럼 함수 전체를 타이핑해야 반환값이 무시될 수 있다. 반환값이 무시되는 것은 그 자체로 부정적인 것은 아니다. 주로 콜백 함수에서도 사용된다.

**콜백 함수 예시: forEach**

```
[1, 2, 3].forEach((v) => v);
[1, 2, 3].forEach((v) => console.log(v));
[1, 2, 3].forEach((v) => v.toString());
```

배열의 `forEach` 메서드는 콜백 함수를 인수로 받는다. 이 콜백 함수는 숫자를 반환할 수도 있고, 반환값이 없을 수도 있고, 문자열을 반환할 수도 있다. 이런 경우에 반환값이 무엇인지 알 수 없으므로 `(v: number) => void`처럼 타이핑할 수 있는 것이다.

즉, `void`는 두 가지 목적을 위해 사용될 수 있다.

- 사용자가 함수의 반환값을 사용하지 못하도록 제한한다.
- 반환값을 사용하지 않는 콜백 함수를 타이핑할 때 사용한다.

### 2.7.4 {}, Object

`{}` 타입(또는 `Object` 타입)은 `null`, `undefined` 타입을 제외한 모든 값을 의미할 수 있다. 이 타입의 변수에는 값을 대입할 순 있지만 사용할 순 없다. 그러므로 타이핑하는 의미가 무색해진다. if문 안에 `unknown` 타입이 존재하는 경우 이 타입을 확인할 수 있다.

**{}, Object 타입**

```
const str: {} = "hello";
const num: {} = 123;
const bool: {} = true;
const obj: {} = { name: "yushin" };
const arr: {} = [1, 2, 3];
const func: {} = () => {};
...
const str: Object = "hello";
const num: Object = 123;
const bool: Object = true;
const obj: Object = { name: "yushin" };
const arr: Object = [1, 2, 3];
const func: Object = () => {};
```

### 2.7.5 never

`never` 타입에는 어떤 타입도 대입할 수 없다. 예외를 던지는 함수, 무한 반복문이 있는 함수 등은 어떤 값도 반환할 수 없으므로 반환값의 타입이 `never`로 추론되는 경우가 있다.

### 2.7.6 타입 간 대입 가능표

|      ->       | any | unknown | {}  | void | undefined | null | never |
| :-----------: | :-: | :-----: | :-: | :--: | :-------: | :--: | :---: |
|    **any**    |     |    O    |  O  |  O   |     O     |  O   |   X   |
|  **unknown**  |  O  |         |  X  |  X   |     X     |  X   |   X   |
|    **{}**     |  O  |    O    |     |  X   |     X     |  X   |   X   |
|   **void**    |  O  |    O    |  X  |      |     X     |  X   |   X   |
| **undefined** |  O  |    O    |  X  |  O   |           |  X   |   X   |
|   **null**    |  O  |    O    |  X  |  X   |     X     |      |   X   |
|   **never**   |  O  |    O    |  O  |  O   |     O     |  O   |       |

## 2.8 타입 별칭으로 타입에 이름을 붙이자

**타입 별칭 사용**

```
type A = string;
const str: A = "hello";
```

위와 같이 기존 타입에 새로운 이름을 붙인 것을 타입 별칭(type alias)이라고 부른다. 타입 별칭은 `type` 키워드를 사용해 선언할 수 있으며, 대문자로 시작하는 단어로 만드는 것이 관습이다. 주로 객체를 타이핑할 때 사용한다.

**타입 별칭을 사용한 객체 타이핑**

```
type Person = {
  name: string;
  age: number;
  married: boolean;
};

const person1: Person = {
  name: "yushin",
  age: 24,
  married: false,
};
const person2: Person = {
  name: "yeonwoo",
  age: 23,
  married: false,
};
```

## 2.9 인터페이스로 객체를 타이핑하자

객체 타입에는 인터페이스(interface) 선언을 사용해 이름을 붙일 수도 있다.

**인터페이스를 사용한 객체 타이핑**

```
interface Person {
  name: string;
  age: number;
  married: boolean;
}

const person1: Person = {
  name: "yushin",
  age: 24,
  married: false,
};
const person2: Person = {
  name: "yeonwoo",
  age: 23,
  married: false,
};

interface Func {
  (x: number, y: number): number;
}
const add: Func = (x, y) => x + y;

interface Arr {
  length: number;
  [key: number]: string;
}
const arr: Arr = ["1", "3", "5"];
```

인터페이스 이름 역시 대문자로 시작하는 단어로 만드는 것이 관습이다. 여기서 배열을 타이핑할 때 `[key: number]: string`과 같은 표현을 사용하고 있는데, 이를 인덱스 시그니처(Index Signature) 문법이라고 한다. 이는 이 객체의 `length`를 제외한 인덱스 시그니처 이후에 선언된 속성 키가 전부 number라는 의미이다.

일반적으로 자바스크립트 객체의 속성 키는 문자열과 심볼만 가능하고, 어떤 값이 들어오든 속성 키가 문자열로 변환된 후 인덱싱된다. 하지만 타입스크립트에서는 배열의 타이핑을 위해 속성 키가 `number` 타입인 것까지는 허용한다. 따라서 타입스크립트에서는 `string`, `number`, `symbol`을 속성 키의 타입으로 사용할 수 있고, 자바스크립트에서 `number` 타입이 `string` 타입으로 변환되는 것이다.

### 2.9.1 인터페이스 선언 병합

타입 별칭과 달리 인터페이스는 같은 이름으로 여러 번 선언할 경우 서로 합쳐진다는 특성이 있다. 이를 선언 병합(declaration merging)이라고 부른다. 이러한 기능은 인터페이스를 다른 사람이 확장할 수 있도록 하기 위해 만들어진 것이다. 인터페이스 간 속성이 겹칠 경우 그 타입도 같아야 하므로 이 점에는 주의해야 한다.

**인터페이스 선언 병합**

```
interface Merge {
  one: string;
}

interface Merge {
  two: number;
}

const exmaple: Merge = {
  one: "1",
  two: 2,
};
```

### 2.9.2 네임스페이스

인터페이스의 선언 병합이라는 특성으로 인해 가끔은 내가 사용하고 있는 라이브러리에서 정의한 인터페이스와 내가 정의한 인터페이스 간 이름이 같아 의도치 않게 병합되는 일이 일어날 수도 있다. 이를 대비하여 네임스페이스(namespace)가 존재한다.

**네임스페이스 사용**

```
namespace Example {
  export interface Inner {
    test: string;
  }
  export type test2 = number;
}

const ex1: Example.Inner = {
  test: "hello",
};
const ex2: Example.test2 = 123;
```

네임스페이스의 내부 타입을 사용하려면 이를 `export`해야 한다.

**네임스페이스 중첩**

```
namespace Example {
  export namespace Outer {
    export interface Inner {
      test: string;
    }
    export type test2 = number;
  }
}

const ex1: Example.Outer.Inner = {
  test: "hello",
};
const ex2: Example.Outer.test2 = 123;
```

네임스페이스 간 중첩도 가능하다. 이때도 내부에 있는 네임스페이스는 `export`되어야 한다. 만약 네임스페이스 안에 값이 존재한다면 이를 자바스크립트 객체로 사용할 수 있기 때문에 변수에 대입하여 사용할 수 있다. 그러나 타입은 자바스크립트 객체로 사용 불가능하기에 접근할 수 없음을 주의해야 한다.

## 2.10 객체의 속성과 메서드에 적용되는 특징을 알자

객체의 속성에 공통적으로 적용될 수 있는 특성으로 옵셔널(optional), `readonly` 수식어가 있다.

**객체의 속성에 ?, readonly 사용**

```
interface Example {
  hello: string;
  world?: number;
  readonly wow: boolean;
  readonly multiple?: symbol;
}

const example: Example = {
  hello: "hi",
  wow: false,
};
```

객체의 속성과 관련하여 특이한 점이 있는데, 기본적으로 객체를 타이핑할 때 선언하지 않은 속성에 대해선 에러가 발생하지만 상황에 따라 에러가 발생하지 않기도 한다.

**선언하지 않은 속성의 타입 검사**

```
interface Example {
  hello: string;
  world?: number;
  readonly wow: boolean;
  readonly multiple?: symbol;
}

const example: Example = {
  hello: "hi",
  wow: false,
  why: "에러?",
};

const obj = {
  hello: "hi",
  wow: false,
  why: "에러?",
};
const example2: Example = obj;
```

`example` 변수는 타입 에러가 발생하지만, `example2` 변수는 에러가 발생하지 않는다. `example`은 객체 리터럴을 직접 대입하였고, `example2`는 객체 변수를 대입하고 있다. 객체 리터럴 대입 시 잉여 속성 검사(Excess Property Checking)가 발생하는데, 이는 타입 선언 시 선언하지 않은 속성을 사용할 때 에러를 표시하는 것이다. 그러나 변수를 대입할 때는 객체 간 대입 가능한지를 비교하게 된다.

다음으로 객체에서도 전개 문법과 나머지 속성을 사용할 수 있다.

**객체 내 전개 문법과 나머지 속성 사용**

```
const {
  prop: { nested, ...rest },
} = { prop: { nested: "hi", a: 1, b: true } };

const spread = { a: "hi", b: 123 };
const obj = { ...spread };
```

구조분해 할당을 타이핑할 때는 다음과 같이 한다.

**구조분해 할당 타이핑**

```
const {
  prop: { nested },
}: { prop: { nested: string } } = {
  prop: { nested: "hi" },
};

console.log(nested);
```

### 2.10.1 인덱스 접근 타입

특정 속성의 타입을 별도의 타입으로 만들 수도 있다. 이때 특정 속성과 연동되게 타입을 만들고 싶다면 다음과 같이 타이핑한다.

**특정한 속성에 연동되는 타이핑**

```
type Animal = {
  name: string;
};

type N1 = Animal["name"];
```

이런 식으로 객체의 속성의 타입에 접근하는 방식을 인덱스 접근 타입(Indexed Access Type)이라고 부른다. `keyof` 연산자와 인덱스 접근 타입을 활용하면 키의 타입과 값의 타입도 구할 수 있다.

**keyof 연산자와 인덱스 접근 타입 활용**

```
const obj = {
  hello: "world",
  name: "yushin",
  age: 24,
};

type Keys = keyof typeof obj;
type Values = (typeof obj)[Keys];
```

`obj`는 값이기 때문에 타입으로 바로 활용할 수 없어 `typeof` 연산자를 활용했다. `Keys` 타입에는 `obj`의 속성 키 타입이 들어 있으므로 `Values`는 값의 타입이 된다.

**keyof의 특성**

```
type Keys = keyof any;
type ArrayKeys = keyof [1, 2, 3];
let a: ArrayKeys = "lastIndexOf";
a = "length";
a = "2";
a = 3;
```

`keyof any`는 `string | number | symbol`이 되고, 배열에 `keyof`를 적용하면 `number | 배열 속성의 이름 유니언 | 배열 인덱스 문자열의 유니언`이 된다. 배열 인덱스 문자열은 배열에 인덱싱 가능한 `'0' | '1' | '2'`을 의미한다. 이때 주의해야 할 점은 배열의 3번 인덱스는 존재하지 않지만 모든 `number`는 배열의 키로 허용되기 때문에 `3`은 대입 가능하다는 것이다.

**튜플과 배열에 인덱스 접근 타입 사용**

```
type Arr = [1, 3, 5];
type First = Arr[0];
type Length = Arr["length"];

type Arr2 = (string | boolean)[];
type E1 = Arr2[number];
```

튜플과 배열에도 인덱스 접근 타입을 사용할 수 있고, 특히 `[number]` 인덱스 접근 타입으로 배열 요소들의 타입을 모두 가져올 수도 있다.

**인덱스 접근 타입 활용으로 특정 키들의 값 타입만 추려내기**

```
const obj = {
  hello: "world",
  name: "yushin",
  age: 24,
};
type Values = (typeof obj)["hello" | "name"];
```

`"hello"`, `"name"` 속성의 값은 모두 `string` 타입이므로 `Values`의 타입도 `string`이 된다.

**객체 메서드 선언 방식**

```
interface Example {
  a(): void;
  b: () => void;
  c: {
    (): void;
  };
}
```

객체 메서드 선언은 세 가지 방식이 가능하다.

1. 메서드(매개변수): 반환값
2. 메서드: (매개변수) => 반환값
3. 메서드: { (매개변수): 반환값 }

### 2.10.2 매핑된 객체 타입

인덱스 시그니처를 활용하면 객체의 속성 값을 전부 특정 타입으로 만들 수 있다. 그런데 이때 속성 전부의 타입을 지정하는 대신 일부 속성에만 타입을 부여할 수도 있다. 이때는 매핑된 객체 타입(Mapped Object Type)이라는 것을 사용한다. 이는 기존의 다른 타입으로부터 새로운 객체 속성을 만들어내는 타입을 의미한다.

**매핑된 객체 타입을 사용한 일부 속성 타이핑**

```
type HelloAndHi = {
  [key in "hello" | "hi"]: string;
};
```

`in` 연산자 오른쪽에는 유니언 타입이 와야 한다. 유니언 타입에 속한 타입이 하나씩 평가되어 객체의 속성이 된다. 이를 활용한 사례들을 보자.

**매핑된 객체 타입을 활용한 객체 복사**

```
// 객체 타입 복사
interface Original {
  name: string;
  age: number;
  married: boolean;
}

type Copy = {
  [key in keyof Original]: Original[key];
};

// 튜플과 배열에 적용
type Tuple = [1, 2, 3];
type CopyTuple = {
  [Key in keyof Tuple]: Tuple[Key];
};

const copyTuple: CopyTuple = [1, 2, 3];

type Arr = number[];
type CopyArr = {
  [Key in keyof Arr]: Arr[Key];
};

const copyArr: CopyArr = [1, 3, 9];

```

다양한 타입으로부터 값을 가져오면서 수식어를 붙이거나 제거할 수도 있다. 읽기 전용으로 만들려면 `readonly`를, 옵셔널로 만들려면 `?` 수식어를 붙이고, 수식어 앞에 `-`를 붙이면 해당 수식어가 제거된 채로 속성을 가져올 수 있다.

**매핑된 객체 타입을 활용한 수식어 추가 및 제거**

```
// 수식어 추가
interface Original {
  name: string;
  age: number;
  married: boolean;
}
type Copy = {
  readonly [Key in keyof Original]: Original[Key];
};

// 수식어 제거
interface Original2 {
  readonly name?: string;
  readonly age?: number;
  readonly married?: boolean;
}
type Copy2 = {
  -readonly [Key in keyof Original2]-?: Original2[Key];
};
```

속성 이름을 바꿀 수도 있다. `Capitalize`는 타입스크립트에서 제공하는 타입으로 문자열의 첫 번째 자리를 대문자화한다. `as` 예약어로 속성 이름을 어떻게 바꿀지 정할 수 있다.

**Capitalize 타입을 사용한 속성 이름의 변경**

```
interface Original {
  name: string;
  age: number;
  married: boolean;
}
type Copy = {
  [Key in keyof Original as Capitalize<Key>]: Original[Key];
};
```

## 2.11 타입을 집합으로 생각하자(유니언, 인터섹션)

**유니언, 인터섹션 연산자**

```
type A = string | boolean;
type B = boolean | number;
type C = A & B; // never

type D = {} & (string | null); // string

type E = string & boolean; // never

type F = unknown | {}; // unknown
type G = never & {}; // never

type H = { a: "b" } & number; // { a: "b" } & number
type I = null & { a: "b" }; // never
type J = {} & string; // string
```

타입스크립트의 타입은 집합 관계로 볼 수 있다. 그래서 유니언 연산자를 사용하면 합집합을 나타낼 수 있고, 인터섹션 연산자를 사용하면 교집합을 나타낼 수 있다. 집합적인 관점에서 `never` 타입은 공집합이라고 볼 수 있고, `unknown` 타입은 전체집합이라고 볼 수 있다.

타입스크립트는 좁은 타입을 넓은 타입에 대입하는 것을 허용한다. 집합 관계로 생각하자면 A 타입이 B 타입에 포함되는 경우 A를 B에 대입할 수 있는 것이다. 그러므로 `never` 타입은 모든 타입에 대입할 수 있고, `unknown`은 자기 자신과 `any` 타입을 제외한 모든 타입에 대입할 수 없다. 여기서 `any`는 집합 관계를 무시하는 이상한 타입이다.

단, `null`, `undefined`를 제외한 원시 자료형과 객체에 대해 `&` 연산을 적용할 때는 `never`가 되지 않는다.

## 2.12 타입도 상속이 가능하다

**인터페이스를 사용한 타입의 상속**

```
interface Animal {
  name: string;
}

interface Dog extends Animal {
  bark(): void;
}

interface Cat extends Animal {
  meow(): void;
}
```

`extends` 예약어를 사용하면 기존 타입을 상속할 수 있다. 상속을 통해 기존 타입의 중복 선언을 막을 수 있다.

타입 별칭에서도 상속처럼 작업할 수 있다.

**타입 별칭을 사용한 타입의 상속**

```
type Animal = {
  name: string;
};

type Dog = Animal & {
  bark(): void;
};

type Cat = Animal & {
  meow(): void;
};

type Name = Cat["name"];
```

인터페이스와 타입 간 상속도 가능하고, 다중 상속도 가능하다. 상속할 때 부모 타입에 있는 속성을 확장할 수도 있다. 주의해야 할 점은 타입 별칭 사용 시 `&` 연산자가 아닌 `|` 연산자를 사용하면 전혀 다른 의미를 갖게 된다는 것, 그리고 부모 타입에 있는 속성을 아예 다른 속성으로 변경하는 것은 불가능하다는 것이다.

## 2.13 객체 간에 대입할 수 있는지 확인하는 법을 배우자

2.10절에서 객체 리터럴이 아닌 변수를 대입하면 잉여 속성 검사가 일어나지 않는 것을 확인한 바 있다. 이런 경우엔 객체 간 대입 가능 여부를 따져봐야 한다.

**객체 간 대입**

```
interface A {
  name: string;
}
interface B {
  name: string;
  age: number;
}

const aObj = {
  name: "yushin",
};

const bObj = {
  name: "yeonwoo",
  age: 23,
};

const aToA: A = aObj; // O
const bToA: A = bObj; // O
const aToB: B = aObj; // X
const bToB: B = bObj; // O
```

좁은 타입을 넓은 타입에 대입할 순 있지만, 역은 불가능하다. 좁은 타입은 더 구체적인 타입, 넓은 타입은 더 추상적인 타입이다. 집합 관계로 보면 `B`는 `A`와 `{ age: number }` 타입의 교집합인 것이다.

이와 관련하여 객체의 속성을 제외한 것에 `readonly` 수식어가 붙거나, `?` 연산자가 붙은 타입은 원래의 타입보다 더 넓은 타입이다. 수정 가능한 객체는 수정 불가능한 객체 집합에 있어도 상관이 없다. 왜냐하면 수정을 안 하면 되기 때문이다. 그러나 역은 불가능하다. 수정 불가능한 객체가 수정 가능해선 안 되기 때문이다. 옵셔널 객체는 그 자체로 `undefined`와 합집합이기 때문에 더 넓은 타입이 되는 것이다.

단, 객체의 속성에 `readonly` 수식어가 붙은 것은 서로 대입할 수 있다.

**객체의 속성은 작동 방식이 다르다**

```
type ReadOnly = {
  readonly a: string;
};
type Mandatory = {
  a: string;
};

const o: ReadOnly = {
  a: "hi",
};
const m: Mandatory = {
  a: "hi",
};

const o2: ReadOnly = m;
const m2: Mandatory = o;
```

이것은 예외적인 것은 아니고 타입스크립트의 구조적 타입 시스템이 우선하기 때문이다.

### 2.13.1 구조적 타이핑

**구조적 타이핑**

```
interface Money {
  amount: number;
  unit: string;
}
interface Liter {
  amount: number;
  unit: string;
}

const liter: Liter = { amount: 1, unit: "liter" };
const circle: Money = liter;
```

타입스크립트에서는 객체의 모든 속성이 동일하면 타입 이름이 다르더라도 같은 타입으로 간주한다. 이를 구조적 타이핑(structural typing)이라고 부른다. 이는 두 타입 간에 서로의 타입이 완벽히 일치해야 한다는 것이 아니라, 하나라도 다른 타입의 모든 속성을 그대로 가지고 있으면 적용된다.

그러므로 위 예제에서 `Money` 타입과 `Liter` 타입이 동일하지 않은 것으로 인식되게 하려면 브랜딩(branding)이라는 기법을 사용해야 한다.

**브랜딩 사용**

```
interface Money {
  __type: "money";
  amount: number;
  unit: string;
}
interface Liter {
  __type: "liter";
  amount: number;
  unit: string;
}

const liter: Liter = { amount: 1, unit: "liter", __type: "liter" };
const circle: Money = liter; // X
```

여기서 `__type` 같은 속성을 브랜드(brand) 속성이라고 부른다.

## 2.14 제네릭으로 타입을 함수처럼 사용하자

자바스크립트에서는 값에 중복이 발생하면 함수를 사용해 최적화하기도 한다. 대표적인 것이 팩토리 패턴이다.

**팩토리 패턴**

```
const personFactory = (name, age) => ({
  type: "human",
  race: "yellow",
  name,
  age,
});

const person1 = personFactory("yushin", 24);
const person2 = personFactory("yeonwoo", 23);
```

타입스크립트에선 이처럼 타입의 중복이 발생하면 제네릭(generic)을 사용해 중복을 제거한다.

**인터페이스에 제네릭 사용**

```
interface Person<N, A> {
  type: "human";
  race: "yellow";
  name: N;
  age: A;
}

interface Yushin extends Person<"yushin", 24> {}
interface Yeonwoo extends Person<"yeonwoo", 23> {}
```

제네릭은 `<>` 안에 타입 매개변수(Type Parameter)를 전달해 사용한다. 인터페이스뿐만 아니라 클래스, 타입 별칭, 함수에도 제네릭 사용이 가능하다.

**타입 별칭에 제네릭 사용**

```
type Person<N, A> = {
  type: "human";
  race: "yellow";
  name: N;
  age: A;
};

type Yushin = Person<"yushin", 24>;
type Yeonwoo = Person<"yeonwoo", 23>;
```

인터페이스와 타입 별칭 간에는 교차 사용이 가능하다.

**클래스에 제네릭 사용**

```
class Person<N, A> {
  name: N;
  age: A;

  constructor(name: N, age: A) {
    this.name = name;
    this.age = age;
  }
}
```

**함수에 제네릭 사용**

```
// 함수 표현식
const personFactoryE = <N, A>(name: N, age: A) => ({
  type: "human",
  race: "yellow",
  name,
  age,
});

// 함수 선언문
function personFactoryD<N, A>(name: N, age: A) {
  return {
    type: "human",
    race: "yellow",
    name,
    age,
  };
}
```

함수에 제네릭을 사용하는 경우엔 표현식과 선언문의 제네릭 위치가 다르므로 주의해야 한다.

**타입 매개변수의 기본값 지정**

```
interface Person<N = string, A = number> {
  type: "human";
  race: "yellow";
  name: N;
  age: A;
}

type Person1 = Person; // string, number
type Person2 = Person<number>; // number, number
type Person3 = Person<number, boolean>; // number, boolean
```

타입스크립트 5.0부터는 상수 타입 매개변수가 추가되었다. 이것은 타입에 대응되는 값이 `as const`인 것과 같은 효과를 낸다.

**상수 타입 매개변수**

```
function values<const T>(initial: T[]) {
  return {
    hasValue(value: T) {
      return initial.includes(value);
    },
  };
}

const savedValues = values(["a", "b", "c"]);
savedValues.hasValue("a");
```

이 예제에서 실매개변수로 전달되는 배열은 상수 타입 매개변수 선언으로 인해 튜플로 취급된다.

### 2.14.1 제네릭에 제약 걸기

타입 매개변수에는 `extends` 문법으로 제약(constraint)을 사용할 수 있다. 이는 상속의 의미가 아닌 타입 종류를 제한하는 의미이다. 제약이 걸려 있는 타입은 그보다 더 좁은 타입만 대입 가능하다.

**제네릭에 extends 사용**

```
interface Example<A extends number, B = string> {
  a: A;
  b: B;
}

type Usecase1 = Example<string, boolean>; // X
type Usecase2 = Example<1, boolean>; // O
type Usecase3 = Example<number>; // O
```

**자주 사용되는 제약**

```
<T extends object>  // 모든 객체
<T extends any[]> // 모든 배열
<T extends (...args: any) => any> // 모든 함수
<T extends abstract new (...args: any) => any>  // 생성자 타입
<T extends keyof any> // string | number | symbol
```

## 2.15 조건문과 비슷한 컨디셔널 타입이 있다

**컨디셔널 타입**

```
type A1 = string;
type B1 = A1 extends string ? number : boolean;

type A2 = number;
type B2 = A2 extends string ? number : boolean;
```

`extends`와 삼항 연산자를 사용해 컨디셔널 타입을 만들 수 있다. 이는 어떤 타입이 특정 타입의 부분집합인 경우와 그렇지 않은 경우에 타입을 어떻게 대입할지에 관한 것이다. 삼항 연산자는 중첩이 가능하다.

`never`는 공집합이기 때문에 모든 타입을 `extends` 할 수 있다. 매핑된 객체 타입에선 키가 `never`이면 해당 속성은 제거되는데 이를 활용해 컨디셔널 타입을 함께 사용할 수 있다.

**매핑된 객체 타입에서의 컨디셔널 타입 사용**

```
type OmitByType<O, T> = {
  [K in keyof O as O[K] extends T ? never : K]: O[K];
};

type Result = OmitByType<
  {
    name: string;
    age: number;
    married: boolean;
    rich: boolean;
  },
  boolean
>;
```

타입에서 특정 타입의 부분집합인 특정 키를 제거하는 코드이다.

### 2.15.1 컨디셔널 타입 분배법칙

컨디셔널 타입, 제네릭, `never`의 조합은 복잡한 상황에서 주로 쓰인다. 예를 들어 `string | number` 타입으로부터 `string[]` 타입을 얻고 싶은 상황을 가정해 보자. `string | number` 타입은 기본적으로 `string` 타입보다 넓은 타입이기 때문에 그 자체로 컨디셔널 타입 문법을 사용할 수 없다. 이때 제네릭의 분배법칙이 사용된다.

**컨디셔널 타입과 제네릭의 분배법칙**

```
type Start = string | number;
type Result<Key> = Key extends string ? string[] : never;
let n: Result<Start> = ["hello"];
```

검사하려는 타입이 제네릭이면서 유니언이면 분배법칙이 수행된다. 이 경우 `Result<string | number>`는 `Result<stirng> | Result<number>`가 되는 것이다. 이후에 `Result<number>` 타입은 `never`로 변환되어 사라져 `string[]` 타입이 반환된다. `boolean` 타입은 이런 방식으로 시도하면 `boolean[]` 타입이 아닌 `false[] | true[]` 타입이 반환되므로 주의해야 한다.

그리고 분배법칙이 수행되는 것을 막고 싶은 경우가 있을 수도 있다. 이럴 때는 `type Result<Key> = [Key] extends [string] ? string[] : never`처럼 `[]`로 묶어주어야 한다.

**never의 분배법칙**

```
type R<T> = T extends string ? true : false;
type RR = R<never>; // never
```

`never`의 경우 공집합이기 때문에 분배법칙 자체를 수행하지 않는다. 그래서 `true` 또는 `false` 타입이 아닌 `never` 타입이 반환된다. 컨디셔널 타입에서 제네릭과 `never`가 만나면 `never`가 된다. 그래서 이 경우에 `never`가 유의미하게 작동하게 하려면 `[]`로 감싸서 분배법칙을 막아야 한다.

**never의 분배법칙 차단**

```
type IsNever<T> = [T] extends [never] ? true : false;
type T = IsNever<never>; // true
type F = IsNever<"never">; // false
```

## 2.16 함수와 메서드를 타이핑하자
