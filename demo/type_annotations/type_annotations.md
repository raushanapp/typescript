# Type Annotations in TypeScript

The examples in [`index.ts`](./index.ts) show how to write type annotations for
variables, arrays, tuples, objects, and functions.

A **type annotation** tells TypeScript what kind of value a variable can hold
or what kind of values a function accepts and returns. Write a colon (`:`)
after the name, followed by the type:

```ts
const myName: string = "Jayson";
```

Here, `myName` is a `string`. If you try to assign a value of an incompatible
type, TypeScript reports an error while checking the code.

## Basic types

The file demonstrates these types:

```ts
const myName: string = "Jayson";
const amount: number = 2 + 2;
const powerLevel: bigint = 9000n + 1n;
const yes: boolean = true;
const nothing: null = null;
const undef: undefined = undefined;
const symbolExample: symbol = Symbol("example");
```

- `string` is text, such as `"Jayson"`.
- `number` is a JavaScript number, such as `4`.
- `bigint` represents large integer values written with the `n` suffix, such
  as `9000n`.
- `boolean` is either `true` or `false`.
- `null` and `undefined` are distinct values and types.
- `symbol` represents a unique symbol value.

The annotation describes a type; the value on the right-hand side is still the
value assigned at runtime.

## Arrays, tuples, and objects

Use `Type[]` to describe an array whose elements have the same type:

```ts
const arrayExample: number[] = [1, 2, 3];
```

Every item in `arrayExample` must be a `number`.

A **tuple** describes an array with specific types at specific positions:

```ts
const tupleExample: [string, number] = ["age", 30];
```

The first item must be a `string` and the second a `number`. This differs from
`(string | number)[]`, which allows an array of varying length where each item
can be either type.

An object type describes the expected property names and types:

```ts
const objectExample: { name: string; age: number } = {
  name: "Jayson",
  age: 30,
};
```

This object must have a `name` property containing a string and an `age`
property containing a number.

## Function types

A function type describes the parameter types and the return type. The arrow
(`=>`) separates the parameter types from the result type:

```ts
const funcExample: (x: number, y: number) => number = (x, y) => x + y;
```

This function accepts two numbers and returns a number. The parameters `x` and
`y` get their types from the annotation on `funcExample`.

You can also annotate parameters and the return type directly in a function
declaration:

```ts
function sum(lhs: number, rhs: number): number {
  const total = lhs + rhs;
  return total;
}

const one = sum(1, 2);
const two = sum(3, 1);
```

`lhs` and `rhs` must be numbers, and `sum` promises to return a number. Passing
a string, for example `sum("1", 2)`, is a type error. The return annotation
also helps catch a function body that returns a value of the wrong type.

## Union and literal types

A **union type** uses `|` to allow a value to be one of several types:

```ts
const unionExample: string | number = "Hello";
```

This variable can hold a string or a number.

The last example is a **union of string literal types**:

```ts
const enumExample: "Option1" | "Option2" = "Option1";
```

Only the exact strings `"Option1"` and `"Option2"` are allowed. Despite the
variable name, this is not a TypeScript `enum`; it is a union type made from
two string literals.

## Type inference

TypeScript can often determine a variable's type from its initial value, so
you do not need to annotate every variable:

```ts
const greeting = "Hello"; // inferred as string
const count = 4;          // inferred as number
```

Annotations are especially useful for function parameters, where they define
which inputs are allowed, and for documenting the intended shape of values.
The project enables `strict` checking, but sets `noImplicitAny` to `false`;
explicit parameter annotations such as those on `sum` still make the intended
input types clear and prevent accidental use of the wrong types.

Type annotations are checked by TypeScript and are erased when TypeScript
produces JavaScript. They do not validate or convert values at runtime.
