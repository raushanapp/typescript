/* eslint-disable */
import { strict as assert } from "assert";
// Generic functions are functions that are designed to work with different
// types of data. They allow you to create a function that can be used with
// various types of data without having to write a separate function for each
// type. This makes your code more efficient, reusable, and easier to maintain.
// Generic functions are especially useful when working with collections of
// data, such as arrays, because they allow you to create a function that can
// work with any type of data in the collection.
//
// Useful links:
// https://www.typescriptlang.org/docs/handbook/2/generics.html#hello-world-of-generics
//

//  Regular function

function getFirstNumber(arr: number[]): number | undefined {
  if (arr.length > 0) {
    return arr[0];
  }
  return undefined;
}

function getFirstString(arr: string[]): string | undefined {
  if (arr.length > 0) {
    return arr[0];
  }
  return undefined;
}

interface Sample {}

function getFirstStringOrNumber(
  arr: (string | number | boolean | Sample)[],
): string | number | boolean | Sample | undefined {
  if (arr.length > 0) {
    return arr[0];
  }
  return undefined;
}

getFirstStringOrNumber([1, "a", 3]);

function getFirst<T>(arr: T[]): T | undefined {
  if (arr.length > 0) {
    return arr[0];
  }
  return undefined;
}

getFirst([1, 2]);
getFirst(["a", "b"]);
getFirst([true, false]);
getFirst([{}, {}]);
