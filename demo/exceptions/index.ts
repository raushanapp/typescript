/* eslint-disable */

// Exceptions are a way to handle errors and unexpected behavior in your code.
// When an exception occurs, it interrupts the normal flow of the program and
// jumps to a predefined error-handling routine. Exceptions can be used to
// catch and handle errors in a way that doesn't crash the program or cause
// unexpected behavior. Exceptions are thrown using the `throw` keyword and
// caught using the `try...catch` statement.
//
// Useful links:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
//

function divide(lhs: number, rhs: number): number {
  if (lhs === 0) {
    throw new Error("cannot divide by zero");
  }
  return lhs / rhs;
}

function div(lhs: number, rhs: number): number {
  try {
    return divide(lhs, rhs);
  } catch (error) {
    console.error("An error occurred:", (error as Error).message);
    throw error;
  }
}

try {
  const a = div(10, 2);
  console.log(a);
  const b = div(10, 0);
  console.log(b);
} catch {
} finally {
  console.log("Division attempt finished.");
}
