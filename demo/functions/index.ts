/* eslint-disable */
import { strict as assert } from "assert";

//  a Function name called sayHello is called function signature
//  The part inside the parentheses () is called the parameter list
//  The code inside the curly braces {} is called the function body

function sayHello() {
  console.log("hello");
}

sayHello();

function sum(lhs, rhs) {
  return lhs + rhs;
}

const answer = sum(2, 2);
console.log(answer);

const answer2 = sum(answer, 2);
assert.equal(answer2, 6);

const answer3 = sum(sum(1, 1), sum(2, 2));
assert.equal(answer3, 6);

const lhs = sum(1, 1);
const rhs = sum(2, 2);
const answer4 = sum(lhs, rhs);
assert.equal(answer4, 6);
