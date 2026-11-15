/* eslint-disable */
import { strict as assert } from "assert";

// Type assertions allow you to tell the compiler that a value should be
// considered a certain type, even if TypeScript cannot infer the type
// automatically. You can use type assertions to help the compiler recognize
// the types of variables, function return types, and more. When using type
// assertions, be sure to only assert types that are actually correct, as
// asserting an incorrect type can lead to runtime errors in your code.
//
// Useful links:
// https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#type-assertions
//

const greeting: unknown = "Hello ";

const greet = greeting as string;

// Wrong!
// let addStr = greeting as number;
// const n = addStr + 2;
// console.log(n);

const numChars = (greeting as string).length;

interface Employee {
  position(): string;
}

class Manager implements Employee {
  position(): string {
    return "Manager";
  }
  sayHello(): void {
    console.log("Hello from Manager");
  }
}
//  here typescript only knows that alice is an Employee, so it won't allow access to sayHello() directly.
//  because typescript interprets only allows to access members defined in the Employee interface.
//  To access sayHello(), you need to use a type assertion to tell TypeScript that alice is actually a Manager.
const alice: Employee = new Manager();
// alice.sayHello(); // Error: Property 'sayHello' does not exist on type 'Employee'.
(alice as Manager).sayHello(); // Correct: Type assertion allows access to sayHello()
