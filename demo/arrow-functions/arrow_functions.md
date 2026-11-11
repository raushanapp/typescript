# Arrow Functions in TypeScript

The examples in [`index.ts`](./index.ts) show three ways to write a function:
a function declaration, a traditional function expression, and an arrow
function. The arrow function uses the concise `=>` syntax.

## Syntax

An arrow function has parameters on the left of `=>` and its body on the
right:

```ts
const square = (x: number): number => x * x;

const four = square(2); // 4
```

When the body is a single expression, its value is returned automatically.
This is called an **implicit return**. With one parameter, the parentheses
around the parameter can be omitted:

```ts
const square = (x: number) => x * x;
const alsoSquare = (x: number) => {
  return x * x;
};
```

Use braces for a multi-statement body. A braced arrow body does not
automatically return a value; use `return` if the function should produce one.

If the arrow function should return an object literal, wrap the object in
parentheses so braces are parsed as an expression rather than a function
body:

```ts
const makePerson = (name: string) => ({ name });
```

## Comparing the forms in `index.ts`

The source defines a function in three ways:

```ts
function double(x: number): number {
  return x * x;
}

const doubleExpression = function (x: number): number {
  return x * x;
};

const doubleArrow = (x: number): number => x * x;

const four = double(2); // 4
```

Each version can be called similarly. A function declaration is available
throughout its containing scope, including before its declaration. Function
expressions and arrow functions are values assigned to variables, so they
cannot be used before their initialization. Arrow syntax is concise, but it
does not make it interchangeable with every traditional function.

One detail in the source: the comments describe `double` as doubling a
number, but each implementation calculates `x * x` (squaring). For an actual
double, use `x * 2`:

```ts
const double = (x: number): number => x * 2;
double(2); // 4
```

Both operations return `4` for an input of `2`, so that input alone does not
show the difference. For example, with an input of `3`, squaring returns `9`
and doubling returns `6`.

## `this` is lexical

An arrow function does not create its own `this`. It uses the `this` value
from the surrounding scope where the arrow was created. This can be useful
for callbacks that need to keep access to an enclosing object's `this`:

```ts
class Counter {
  count = 0;

  start() {
    setTimeout(() => {
      this.count++;
    }, 100);
  }
}
```

Here, the arrow callback uses the `Counter` instance's `this`. This is not
quite the same as saying an arrow automatically binds to whichever object
contains it. It also cannot be given a different `this` by calling it with
`.call()` or `.bind()`. Use a method or traditional function when a function
needs its own dynamic `this`, for example as a method that should receive its
calling object as `this`.

## When to use an arrow function

Arrow functions are a good fit for short callbacks and small functions that
produce a value:

```ts
const values = [1, 2, 3];
const squares = values.map((value) => value * value); // [1, 4, 9]
```

They are also useful when a callback should preserve the surrounding `this`.
For longer logic, a named function or a braced arrow body can be clearer.

## When not to use one

Do not choose an arrow solely because it is shorter. Avoid it when the
function needs its own `this`, such as a regular object method:

```ts
const user = {
  name: "Ada",
  greet() {
    return `Hello, ${this.name}`;
  },
};
```

Writing `greet` as an arrow property would not give it a `this` referring to
`user`; it would capture `this` from the surrounding scope instead. Also,
arrow functions are not constructors and cannot be called with `new`.

Finally, an expression-bodied arrow implicitly returns its expression. If
you intend to perform an action and return nothing, make that intent clear
with a block body:

```ts
values.forEach((value) => {
  console.log(value);
});
```