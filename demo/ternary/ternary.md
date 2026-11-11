# Ternary (Conditional) Operator in TypeScript

The example in [`index.ts`](./index.ts) uses the ternary operator to choose
between two values based on a condition. It is also called the conditional
operator because it is the only JavaScript operator that takes three
operands.

## Syntax and evaluation

```ts
const result = condition ? valueIfTrue : valueIfFalse;
```

JavaScript evaluates `condition` first. If it is truthy, the expression
evaluates to `valueIfTrue`; otherwise, it evaluates to `valueIfFalse`. Only
the selected branch is evaluated. The operator produces a value, so it is
often used to initialize a variable or as part of a return expression.

The source example uses the comparison `age >= 18`:

```ts
import { strict as assert } from "assert";

const age = 16;
const msg = age >= 18 ? "Allow" : "Deny";

assert.equal(msg, "Deny");
```

Since `16 >= 18` is `false`, `msg` receives `"Deny"` and the assertion passes.
At age 18 or above, it receives `"Allow"`. The equivalent `if` / `else`
version is:

```ts
const age = 16;
let msg: string;
if (age >= 18) {
  msg = "Allow";
} else {
  msg = "Deny";
}
```

Use the ternary when both outcomes are simple expressions and the choice is
easy to understand. It can keep a straightforward value selection concise:

```ts
const itemCount = 3;
const label = itemCount === 1 ? "1 item" : `${itemCount} items`;
```

## Conditions and result types

The condition does not have to be a comparison; it is evaluated for
truthiness. A Boolean condition is usually clearest:

```ts
const isSignedIn = true;
const greeting = isSignedIn ? "Welcome back" : "Please sign in";
```

TypeScript determines the result type from both branches. Prefer values of
compatible types that represent the same kind of result, such as two strings
or two numbers. Mixing unrelated types can make later code harder to use:

```ts
const value = isSignedIn ? "Welcome back" : 0; // string | number
```

## When not to use it

Use a regular `if` / `else` when either branch needs multiple statements,
performs several actions, or requires explanation. A conditional expression
selects a value; it is not a replacement for a readable block of control flow.

```ts
const age = 16;
if (age >= 18) {
  console.log("Allow");
  console.log(`Recording access for age ${age}.`);
} else {
  console.log("Deny");
  console.log("Showing the underage message.");
}
```

Avoid deeply nested ternaries. They are legal, but can be difficult to scan
and easy to misread:

```ts
const isLoading = false;
const hasError = true;
const isReady = false;

// Hard to read: which condition corresponds to each outcome?
const status = isLoading ? "Loading" : hasError ? "Error" : isReady ? "Ready" : "Idle";
```

For several alternatives, use `if` / `else if` or `switch` instead:

```ts
const isLoading = false;
const hasError = true;
const isReady = false;

let status: string;
if (isLoading) {
  status = "Loading";
} else if (hasError) {
  status = "Error";
} else if (isReady) {
  status = "Ready";
} else {
  status = "Idle";
}
```

Parentheses can make a short nested expression's grouping explicit, but they
do not make a complicated chain easier to maintain. Also avoid using a
ternary only to choose between actions or side effects; use `if` / `else`
when the main purpose is to run code rather than produce a value.