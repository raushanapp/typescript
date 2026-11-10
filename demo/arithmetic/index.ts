// Arithmetic operations in typescript
/* eslint-disable */
import { strict as assert } from "assert";

// Addition
const sum = 5 + 3;
assert.equal(sum, 8);

// Subtraction
const difference = 10 - 4;
assert.equal(difference, 6);

// Multiplication --> bitInteger we can here
const product = 6 * 7;
assert.equal(product, 42);

// Division
const quotient = 20 / 5;
assert.equal(quotient, 4);

//  Infinity
const infinity = 1 / 0;
assert.equal(infinity, Infinity);

const nan = 0 / 0;
assert(isNaN(nan));
const rem = 10 % 3;
assert.equal(rem, 1);
const neg = -rem;
assert.equal(neg, -1);

const neg2 = -neg;
assert.equal(neg2, 1);

// Modulus
const remainder = 10 % 3;
assert.equal(remainder, 1);

const exp = 2 ** 3;
assert.equal(exp, 8);

const abs = Math.abs(-5); // Absolute value
assert.equal(abs, 5);
const pi = Math.PI;
