/* eslint-disable */
import { strict as assert } from "assert";
import { add, max, quote, setCase } from "./mylib";
import type { CaseKind } from "./mylib";

// Useful links:
// https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html

// EXAMPLE 1: Function with Rest Parameters
// add function accepts 2+ numbers and returns their sum
const sum1 = add(1, 2);
assert.equal(sum1, 3);

const sum2 = add(1, 2, 3);
assert.equal(sum2, 6);

const sum3 = add(1, 2, 3, 5);
assert.equal(sum3, 11);

// EXAMPLE 2: Function with Nullable Return Type
// max returns the maximum number or null for empty arrays
const maximum1 = max([1, 2, 3, 5]);
assert.equal(maximum1, 5);

const maximum2 = max([10]);
assert.equal(maximum2, 10);

const maximum3 = max([]);
assert.equal(maximum3, null);

// EXAMPLE 3: Higher-Order Function (function returning function)
// quote returns a function that wraps a message in quotes
const quoter = quote("hello");
assert.equal(typeof quoter, "function");

const quoted = quoter();
assert.equal(quoted, '"hello"');

// EXAMPLE 4: Function with String Literal Union Type
// CaseKind type restricts values to specific strings
const upper = setCase("hello", "uppercase");
assert.equal(upper, "HELLO");

const lower = setCase("HELLO", "lowercase");
assert.equal(lower, "hello");

// This would cause a compile error (but we can't test at runtime):
// setCase("hello", "invalid"); // ✗ Type error!

console.log("✓ All type definition examples passed!");

