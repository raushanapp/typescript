/* eslint-disable */
import { strict as assert } from "assert";

function greet(message) {
  //  " "
  // ' '
  // ` `
  console.log(`Hello, ${message}`);
}

greet("typescript");

const kids = 2;
const adults = 4;
const totalAttending = kids + adults;
const message = `There are ${totalAttending} people`;
console.log(`${message} to seat at the restaurant.`);
