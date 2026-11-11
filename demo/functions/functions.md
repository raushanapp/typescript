# Functions in TypeScript

A function is a named, reusable block of code. The examples in
[`index.ts`](./index.ts) define two functions and call them in several ways.

## Parts of a function

```ts
function sayHello() {
  console.log("hello");
}
```

```text
function  sayHello  ( )  {  console.log("hello");  }
   │         │       │            │
 keyword    name  parameter     function body
                    list
```

- **Name:** `sayHello` identifies the function. The code comment calls the
  name part the function signature; strictly, a signature also includes the
  parameters and return type.
- **Parameter list:** the part inside `()`. It is empty for `sayHello`.
- **Body:** the code inside `{}` that runs when the function is called.

Defining a function does not run it. It runs only when called:

```ts
sayHello(); // prints: hello
```

## Parameters and return values

```ts
function sum(lhs, rhs) {
  return lhs + rhs;
}
```

`lhs` and `rhs` (left-hand side and right-hand side) are **parameters**:
names for the values the function receives. `return` ends the function and
sends a value back to the caller.

The values passed in a call are called **arguments**:

```ts
const answer = sum(2, 2); // arguments: 2 and 2
console.log(answer);      // 4
```

```text
sum(2, 2)
    │  │
    ▼  ▼
 lhs=2  rhs=2  ──►  return 2 + 2  ──►  4  ──►  answer
```

A function that has no `return` statement, such as `sayHello`, returns
`undefined`.

## Using a result as an argument

A function call is an expression, so its result can be passed to another call:

```ts
const answer2 = sum(answer, 2); // sum(4, 2)
assert.equal(answer2, 6);
```

## Nested calls

Calls can be placed directly inside the argument list. Inner calls are
evaluated first, from left to right:

```ts
const answer3 = sum(sum(1, 1), sum(2, 2));
assert.equal(answer3, 6);
```

```text
sum( sum(1, 1), sum(2, 2) )
       │           │
       ▼           ▼
       2           4
        └────┬─────┘
             ▼
          sum(2, 4)
             │
             ▼
             6
```

## The same calculation with variables

Storing the intermediate results in variables gives the same result and is
often easier to read and debug:

```ts
const lhs = sum(1, 1);        // 2
const rhs = sum(2, 2);        // 4
const answer4 = sum(lhs, rhs); // 6
assert.equal(answer4, 6);
```

The top-level `lhs` and `rhs` are separate from the parameters of `sum`. Inside
the function, the parameter names are used; outside, the constants are used.

## Add types to parameters

In `index.ts`, `lhs` and `rhs` have no type annotations. This file compiles
because the project's compiler settings allow implicit `any` (`noImplicitAny`
is `false`), so the parameters are typed as `any`. That means the function also
accepts values it should not:

```ts
sum("2", 2); // "22": string concatenation, not addition
```

Annotating the parameters and return type prevents this:

```ts
function sum(lhs: number, rhs: number): number {
  return lhs + rhs;
}

sum(2, 2);     // 4
// sum("2", 2); // Error: string is not assignable to number
```

With annotations, TypeScript reports an error at compile time instead of
producing a surprising result at runtime.

## Assertions

The file uses Node.js's strict assertion API. A passing assertion prints
nothing; a failing one throws an error:

```ts
import { strict as assert } from "assert";
```

Running the file prints `hello` from `sayHello()` and `4` from
`console.log(answer)`.
