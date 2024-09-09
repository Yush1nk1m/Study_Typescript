// object
// object literal type
// 구조적 타입 시스템 <-> 명목적 타입 시스템
let user = {
    id: 1,
    name: "김유신",
};
let dog = {
    name: "초코",
    color: "black",
};
user = {
    name: "안연우",
};
let config = {
    apiKey: "MY API KEY",
};
export {};
// config.apiKey = "hacked";
