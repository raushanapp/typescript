/* eslint-disable */
import { strict as assert } from "assert";
// Type predicates offer a way to determine the type of data based on a
// condition. This is achieved by defining a function that takes a some data as
// an argument, applies type guards, and returns a boolean indicating whether
// the data is a specific type. The function is then used to narrow down the
// type of the variable in subsequent code. Type predicates are useful when
// dealing with union types or other situations where the type of a variable
// may not be known at compile-time. Type predicates allow the type to be
// determined correctly which avoids runtime errors.
// Useful links:
// https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates

//  type guard  :
type StrOrNum = string | number;

function sample(data: StrOrNum) {
  if (typeof data === "string") {
    // code ..
  } else if (typeof data === "number") {
    //  ...code
  }
}

//  type predicate : it check the arberty object type at runtime and narrows down the type

interface Square {
  kind: "square";
  size: number;
}

interface Circle {
  kind: "circle";
  radius: number;
}

type Shape = Square | Circle;

function isSquare(shape: Shape): shape is Square {
  return shape.kind === "square";
}

function isCircle(shape: Shape): shape is Circle {
  return shape.kind === "circle";
}

function calauateArea(shape: Shape): number {
  if (isSquare(shape)) {
    return shape.size ** 2;
  }
  if (isCircle(shape)) {
    return Math.PI * shape.radius ** 2;
  }
  throw new Error("Unknown shape");
}

const square: Shape = {
  kind: "square",
  size: 4,
};
const circle: Shape = {
  kind: "circle",
  radius: 3,
};
console.log(calauateArea(square));
console.log(calauateArea(circle));

assert.equal(calauateArea(square), 16);
assert.equal(calauateArea(circle), Math.PI * 3 ** 2);
