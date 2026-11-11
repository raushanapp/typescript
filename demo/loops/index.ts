/* eslint-disable */

// The `for` loop consists of three expressions separated by semicolons,
// followed by curly braces where the loop body is placed.
//
// for (A;B;C) { }
//
// A: This is evaluated one time when the `for` loop is first encountered.
//    It is typically used to create a loop counter variable.
// B: A boolean expression which is checked _before_ the loop executes
//    the next iteration. This is used to determine whether the loop
//    should continue.
// C: An expression that is evaluated _after_ the loop body executes, on each
//    iteration. It is normally used to increment the loop counter created
//    in (A).
//
// Useful links:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for
//

//  Increment
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
//  Decrement
for (let i = 5; i >= 1; i--) {
  console.log(i);
}

for (let i = 1; i < 5000; i++) {
  console.log(i);
  if (i === 10) {
    console.log("Breaking at 10");
    break;
  }
}

for (let i = 1; i < 20; i++) {
  console.log(i);
  if (i % 5 === 0) {
    console.log("Skips");
    continue;
  }
}

// A `while` loop executes the body while (as long as) some boolean expression
// is `true`. It is your responsibility to manage when and how the loop exits.
//
// Useful links:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while
//

let i = 1;
while (i <= 5) {
  console.log(`${i}`);
  i++;
}

i = 1;
while (i <= 5) {
  console.log(`${i}`);
  break;
}

i = 1;
while (i <= 5) {
  if (i === 4) {
    i++;
    continue;
  }
  console.log(`${i}`);
  i++;
}

//  Infinite loop
//  Be careful with infinite loops as they will run forever unless broken out of.
//  Typically used with a `break` statement inside the loop body.
//
// Useful links:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while#infinite_loops
//

// Example of an infinite loop with a break condition
i = 1;
while (true) {
  console.log(`${i}`);
  if (i === 5) {
    break;
  }
  i++;
}
