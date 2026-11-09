/* eslint-disable */
import assert from "assert";
//  Boolean logic in TypeScript
// boolean values in TypeScript are either true or false

// Boolean expressions in TypeScript
//  Boolean expressions evaluate to either true or false
//  boolean expression to combine evaluation results are called logical expressions
//  Logical expressions use logical operators like && (AND), || (OR), and ! (NOT)
//  evaluation start from inner most parenthesis and proceed outward
//

const yes = true;
const no = false;
const age = 18;
const canPurchase = age >= 18;
// assert.equal(canPurchase, false);
assert.equal(canPurchase, true);

// const favoiteColor = "yellow";
// const isFavoriteColorYellow = favoiteColor === "red"; this give us error because

const two = 2;
const isThree = 1 + two == 3;
assert.equal(isThree, true);

const isNotThree = 1 + two !== 10;
assert.equal(isNotThree, true);

//  <
//  <=
// >
// >=
//  !==
