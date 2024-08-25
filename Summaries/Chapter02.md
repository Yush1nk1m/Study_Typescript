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
