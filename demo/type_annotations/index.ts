/* eslint-disable */
import { strict as assert } from "assert";
// Type annotations are used to provide type information for variables,
// functions, and other data structures in a program. By adding type
// annotations, you can specify the expected types of data and prevent errors
// that could occur from using the wrong type. This allows for better code
// reliability, maintainability, and readability.
//
// Useful links:
// https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-annotations-on-variables
//

const myName: string = "Jayson";
const amount: number = 2 + 2;
const hello: string = `Hello, ${myName}`;
const powerLevel: bigint = 9000n + 1n;
const yes: boolean = true;
const nothing: null = null;
const undef: undefined = undefined;
const symbolExample: symbol = Symbol("example");
const arrayExample: number[] = [1, 2, 3];
const tupleExample: [string, number] = ["age", 30];
const objectExample: { name: string; age: number } = {
  name: "Jayson",
  age: 30,
};
const funcExample: (x: number, y: number) => number = (x, y) => x + y;
const unionExample: string | number = "Hello";
const enumExample: "Option1" | "Option2" = "Option1";

function sum(lhs: number, rhs: number): number {
  const total = lhs + rhs;
  return total;
}

const one = sum(1, 2);
const two = sum(3, 1);
