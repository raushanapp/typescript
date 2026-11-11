/* eslint-disable */
import { strict as assert } from "assert";

// Control flow is the order in which statements are executed in a program. It
// allows programmers to control the flow of their code based on certain
// conditions or events.
//
// Useful links:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else
//

const age = 25;
if (age >= 18) {
  console.log("You are an adult.");
} else {
  console.log("You are not an adult.");
}

const score = 85;
let grade;
if (score >= 90) {
  grade = "A";
} else if (score >= 80) {
  grade = "B";
} else if (score >= 70) {
  grade = "C";
} else if (score >= 60) {
  grade = "D";
} else {
  grade = "F";
}
console.log(`Your grade is ${grade}.`);

//  Compound boolean expressions
const isMember = true;
const hasPaidDues = false;

if (isMember && hasPaidDues) {
  console.log("Full Club Access granted.");
} else {
  console.log("Limited Club Access");
}

const isStudent = false;
const hasCoupon = true;

if (isStudent || hasCoupon) {
  console.log("eligible for discount");
} else {
  console.log("not eligible for discount");
}
