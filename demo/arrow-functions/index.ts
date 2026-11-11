/* eslint-disable */

// Arrow functions provide a concise syntax for defining functions. They are
// defined using a fat arrow (=>) and can be used in place of traditional
// function expressions. Arrow functions automatically bind the 'this' keyword
// to the parent context, making them useful in event handlers and callback
// functions. They also support implicit return statements for one-liner
// functions, which makes the code more readable.
//
// Useful links:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
//

{
  // this function declares a traditional function that doubles a number
  function double(x) {
    return x * x;
  }
  const four = double(2);
}

{
  // This function declares a function expression that doubles a number
  const double = function (x) {
    return x * x;
  };
  const four = double(2);
}

{
  const double = (x) => x * x;
  const four = double(2);
}
