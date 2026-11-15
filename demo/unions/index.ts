/* eslint-disable */
// Union types allows you to declare a variable or parameter that can hold
// multiple types of value and are declared using the pipe symbol (|) between
// the types. Union types can be useful when you want something to accept
// multiple types of input.
//
// Useful links:
// https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types

type Color = "red" | "green" | "blue";

const r: Color = "red";

function setBgColor(c: Color) {
  switch (c) {
    case "red":
      break;
    case "blue":
      break;
    case "green":
      break;
  }
}

setBgColor("blue");

type OneTwoThree = 1 | 2 | 3;

const one: OneTwoThree = 1;

type StrOrNum = string | number;

function sample(data: StrOrNum) {
  if (typeof data === "string") {
    console.log("String data:", data.toUpperCase());
  } else if (typeof data === "number") {
    console.log("Number data:", data + 10);
  }
}

sample("hello");
sample(5);
// sample(true); // Error: Argument of type 'true' is not assignable to parameter of type 'StrOrNum'.

function find(): string | undefined {
  return undefined;
}
