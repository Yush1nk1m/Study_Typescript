// any: 특정 변수의 타입을 확실히 알지 못할 때 사용

let anyVar: any = 10;

anyVar = true;
anyVar = {};
anyVar = () => {};

anyVar.toUpperCase();
anyVar.toFixed();

let num: number = 10;
num = anyVar;

// unknown

let unknownVar: unknown;

unknownVar = "";
unknownVar = 1;
unknownVar = () => {};

// num = unknownVar;
// unknownVar.toUpperCase();

// type narrowing
if (typeof unknownVar === "number") {
  num = unknownVar;
}
