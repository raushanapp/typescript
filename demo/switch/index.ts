/* eslint-disable */
import { strict as assert } from "assert";

// Useful links:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
//

let someNumber = parseInt("10");
const sample = "sample";
const someString = `${sample}`;

switch (someString) {
  case "test":
    //  code
    break;
  case "sample":
    console.log("This is a sample string.");
    break;
  case "a":
    break;
  default:
    console.log("Unknown string.");
}

someNumber = parseInt("4");

switch (someNumber) {
  case 1:
    // code
    break;
  case 3:
    // code
    break;
  case 6:
    // code
    break;
  case 10:
    console.log("The number is 10.");
    break;
  default:
    console.log("Unknown number.");
}

//  this behaviour demonstrate how flow through a switch statement works.
someNumber = parseInt("4");
switch (someNumber) {
  case 1:
  // code for case 1
  case 3:
  // code for case 3
  case 4:
  // code for case 4
  case 5:
  // code for case 5
  case 6:
  case 10:
    console.log("The number is 10.");
    break;
  default:
    console.log("Unknown number.");
}
