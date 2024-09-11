/**
 * 타입 추론(Type inference)
 */

let a = 10;
let b = "hello";
let c = {
  id: 1,
  name: "김유신",
  profile: {
    nickname: "유신",
  },
  urls: ["https://github.com/Yush1nk1m"],
};

let { id, name, profile } = c;

let [one, two, three] = [1, "hello", true];

function func(message = "hello") {
  return "hello";
}

// implicit any type
let d;

d = 10;
d.toFixed();

d = "hello";
d.toUpperCase();
// d.toFixed();

const num = 10;
const str = "hello";

let arr = [1, "string"];
