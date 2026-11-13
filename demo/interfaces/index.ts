/* eslint-disable */
import { strict as assert } from "assert";

// Interfaces provide a way to define the shape of objects or classes. They
// define the contracts that objects must follow, specifying the properties and
// methods that an object must have. Interfaces make it easier to write
// type-safe code by providing a way to ensure that objects are of the correct
// shape before they are used in a program. They also allow for code to be more
// modular and reusable, since objects can be easily swapped out as long as
// they adhere to the interface's contract.
//
// Useful links:
// https://www.typescriptlang.org/docs/handbook/2/objects.html
//

{
  //  Javascript
  const alice = {
    name: "Alice",
    age: 30,
  };

  console.log(alice); // { name: "Alice", age: 30 }
}

{
  interface Person {
    name: string;
    age: number;
  }

  const alice: Person = {
    name: "Alice",
    age: 30,
  };
  printAge(alice);
  function printAge(person: Person) {
    console.log(person.age);
  }
}

function printAge(person) {
  console.log(person.age);
}
