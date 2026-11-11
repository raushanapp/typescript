/* eslint-disable */
import { strict as assert } from "assert";

// Objects are a fundamental data type used to represent a collection of
// properties with their respective values. They are defined using either an
// object literal notation or a constructor notation.
//
// Useful links:
// https://www.typescriptlang.org/docs/handbook/2/objects.html
//

const person = {
  name: "Alice",
  age: 30,
};
const alice = person.name;
assert.equal(alice, "Alice");
const age = person.age;
assert.equal(age, 30);

const user = {
  name: "Bob",
  age: 30,
  greet() {
    console.log(
      `Hello, my name is ${this.name} and I am ${this.age} years old`,
    );
  },
};
assert.equal(user.name, "Bob");
assert.equal(user.age, 30);
assert.equal(typeof user.greet, "function");
user.greet();
