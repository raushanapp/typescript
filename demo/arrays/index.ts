/* eslint-disable */
import { strict as assert } from "assert";

// Arrays offer a way to store and manipulate collections of values of the same
// type. They are defined using square brackets and can be populated with
// values at initialization, or later using various methods such as push(),
// splice(), and concat(). Arrays can be of a fixed length or dynamically
// resized as needed, and they can be used with various array methods to
// perform common operations like sorting, filtering, and mapping.
//
// Useful links:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
//

const numbers = [1, 2, 4, 5, 6];
let letter = ["a", "b", "c"];
//             0,   1,   2

const b = letter[1];

letter[1] = "z";
//  DO NOT MIX DATA TYPES
const mixed = [1, "a", true, {}, []];

const names = [
  ["Alice", "Carol"],
  ["Bob", "Dave"],
];
const alice = names[0][0];
const bob = names[1][0];
const carol = names[0][1];
const dave = names[1][1];

const emptyArray = [];

//  push adds an element to goes to left to right of the array
letter.push("d");
letter.push("e");
// pop removed the element goes from right to left of the array
// unshift adds an element to the beginning of the array
letter.unshift("x");
// shift removes the element from the beginning of the array
letter.shift();
letter.pop();
letter.slice(0, 1);

//  typescript is supersets of javascript
//  In TypeScript, you can define arrays with specific types to ensure type safety.

let userIds: number[] = [1, 2, 3];
let securityPins: string[] = ["1234", "0111", "0123"];

//  You can also define arrays using the Array<T> generic type
let productIds: Array<number> = [101, 102, 103];

let productNames: Array<string> = ["Laptop", "Phone", "Tablet"];

//  You can also define arrays with mixed types using tuples
let user: [number, string] = [1, "Alice"];
let product: Array<number> = [12, 34, 56];
