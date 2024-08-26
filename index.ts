interface Original {
  name: string;
  age: number;
  married: boolean;
}
type Copy = {
  [Key in keyof Original as Capitalize<Key>]: Original[Key];
};
