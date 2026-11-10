/* eslint-disable */
import { strict as assert } from "assert";

let n = 1;
// "Postfix" increment
// The value of n is incremented after the current expression is evaluated
n++;
assert.equal(n, 2);
// "Prefix" increment
// The value of n is incremented before the current expression is evaluated
++n;
assert.equal(n, 3);

n = 5;
const k = n++;
// assert.equal(k, 6); --> error because n++ returns the value before incrementing
assert.equal(n, 6);

// "Prefix" increment example
n = 5;
const j = ++n;
assert.equal(j, 6); // --> prefix increment returns the value after incrementing
// assert.equal(n, 6);

n = 5;
const t = --n;
assert.equal(t, 4); // --> prefix decrement returns the value after decrementing
// assert.equal(n, 4);

n = 5;
n += 5;
assert.equal(n, 10); // --> addition assignment increases the value of n by 5
n -= 5;
assert.equal(n, 5); // --> subtraction assignment decreases the value of n by 5

n -= 1;
assert.equal(n, 4); // --> subtraction assignment decreases the value of n by 1

//  +=
//  -=
//  *=
//  /=
//  %=
