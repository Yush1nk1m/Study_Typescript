/**
 * unknown type: 전체집합
 */

function unknownExam() {
  let a: unknown = 1;
  let b: unknown = "hello";
  let c: unknown = true;
  let d: unknown = null;
  let e: unknown = undefined;

  let unknownVar: unknown;
  //   let num: number = unknownVar;
  //   let str: string = unknownVar;
  //   let bool: boolean = unknownVar;
}

/**
 * never type: 공집합
 */

function neverExam() {
  function neverFunc(): never {
    while (true) {}
  }

  let num: number = neverFunc();
  let str: string = neverFunc();
  let bool: boolean = neverFunc();

  //   let never1: never = 10;
  //   let never2: never = "string";
  //   let never3: never = true;
}

/**
 * void type
 */

function voidExam() {
  function voidFunc(): void {
    console.log("hi");
    return undefined;
  }

  let voidVar: void = undefined;
}

/**
 * any type: never의 상위 집합이자 이를 제외한 모든 타입의 상위 집합이면서 하위 집합
 */

function anyExam() {
  function infLoop(): never {
    while (true) {}
  }
  let unknownVar: unknown;
  let anyVar: any;
  let undefinedVar: undefined;
  let neverVar: never = infLoop();

  anyVar = unknownVar;
  unknownVar = anyVar;

  anyVar = undefinedVar;
  undefinedVar = anyVar;

  //   neverVar = anyVar;
  anyVar = neverVar;
}
