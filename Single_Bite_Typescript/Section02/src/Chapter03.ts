// object
// object literal type
// 구조적 타입 시스템 <-> 명목적 타입 시스템
let user: {
  id?: number; // optional property
  name: string;
} = {
  id: 1,
  name: "김유신",
};

let dog: {
  name: string;
  color: string;
} = {
  name: "초코",
  color: "black",
};

user = {
  name: "안연우",
};

let config: {
  readonly apiKey: string;
} = {
  apiKey: "MY API KEY",
};

// config.apiKey = "hacked";
