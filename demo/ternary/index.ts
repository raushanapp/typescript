/* eslint-disable */
import { strict as assert } from "assert";

// 'ternary' is a condensed if..else statement that can fit on a
// single line.
//
// Useful links:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator
//

// const age = 18;
const age = 16;

//  way to work with ternary operator
// we have boolean expression age >= 18, if true it returns "Allow", otherwise "Deny"
const msg = age >= 18 ? "Allow" : "Deny";

assert.equal(msg, "Deny");
