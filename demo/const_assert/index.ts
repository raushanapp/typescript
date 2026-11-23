/* eslint-disable */
// `as const` allows you to create readonly values in your code. When you use
// `as const` on an object, array or tuple, TypeScript infers that the values
// are constant and cannot be modified later. This can help prevent unexpected
// bugs in your code and make it easier to reason about. It's particularly
// useful when working with APIs or configurations where values should not be
// changed during runtime.
// Useful links:
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions

type Rgb = "red" | "green" | "blue";
const red: Rgb = "red";

{
  const Colors = ["red", "green", "blue"] as const;
  //  if i  use const assertion, I cannot push new elements to the array
  //  if but I don't use const assertion, I can still push new elements to the array
  //   Colors.push();
  type Color = (typeof Colors)[number];
  const blue: Color = "blue";

  for (const c of Colors) {
    console.log(c);
  }
}

{
  const Department = {
    Executive: "Executive",
    Sales: "Sales",
    Warehouse: "Warehouse",
  } as const;
  type Department = (typeof Department)[keyof typeof Department];
  let k: keyof typeof Department;
  for (k in Department) {
    console.log(`Key = ${k}, floor = ${Department[k]}`);
  }

  const exec: Department = Department.Executive;
}
