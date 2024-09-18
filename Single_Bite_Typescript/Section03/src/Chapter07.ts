/**
 * 타입 좁히기(Type narrowing)
 */

type Person = {
  name: string;
  age: number;
};

// value === number -> toFixed()
// value === string -> toUpperCase()
// value === Date -> getTime()
// value === Person -> console.log(`${name}은 ${age}살입니다.`)
function func(value: number | string | Date | Person | null) {
  // type guard
  if (typeof value === "number") {
    console.log(value.toFixed());
  } else if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else if (value instanceof Date) {
    console.log(value.getTime());
  } else if (value && "age" in value) {
    console.log(`${value.name}은 ${value.age}살입니다.`);
  }
}
