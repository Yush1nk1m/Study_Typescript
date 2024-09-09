// any: 특정 변수의 타입을 확실히 알지 못할 때 사용
let anyVar = 10;
anyVar = true;
anyVar = {};
anyVar = () => { };
anyVar.toUpperCase();
anyVar.toFixed();
let num = 10;
num = anyVar;
export {};
