interface Person<N, A> {
  type: "human";
  race: "yellow";
  name: N;
  age: A;
}

interface Yushin extends Person<"yushin", 24> {}
interface Yeonwoo extends Person<"yeonwoo", 23> {}
