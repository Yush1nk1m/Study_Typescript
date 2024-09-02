type IsNever<T> = [T] extends [never] ? true : false;
type T = IsNever<never>; // true
type F = IsNever<"never">; // false
