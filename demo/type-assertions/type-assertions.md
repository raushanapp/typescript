# Type Assertions in TypeScript

A type assertion tells TypeScript to treat a value as a particular type when
you already know more about it than the compiler can determine. The examples
in [`index.ts`](./index.ts) use the `as` syntax:

```ts
const greeting: unknown = "Hello ";
const greet = greeting as string;
const numChars = (greeting as string).length;
```

Because `greeting` is declared as `unknown`, TypeScript will not allow string
operations on it until its type is narrowed or asserted. In this example, the
value is known to be a string, so the assertion lets the code access
`.length`; `numChars` is `6`.

## Assertions do not convert or validate values

An assertion only affects compile-time checking. It does not change the
runtime value or check that the value has the asserted type:

```ts
const greeting: unknown = "Hello ";
const addStr = greeting as number;
const result = addStr + 2;
console.log(result); // "Hello 2", not 8
```

TypeScript accepts this assertion because the source type is `unknown`, but
the value is still a string at runtime. The `+` operator therefore
concatenates. This is why the source marks `greeting as number` as wrong.
Avoid asserting a type just to silence an error; verify or narrow the value
instead.

## Asserting a more specific class type

The source declares an `Employee` interface and a `Manager` class that
implements it and adds a `sayHello` method:

```ts
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

const alice: Employee = new Manager();
```

The variable `alice` is declared as `Employee`, so TypeScript only exposes
members in that interface. The source asserts that this particular value is a
`Manager` to call the additional method:

```ts
(alice as Manager).sayHello();
```

This assertion is valid here because `alice` was created with `new Manager()`.
An assertion does not prove that every `Employee` is a `Manager`; if `alice`
could contain another implementation, this could fail at runtime. When the
value is not guaranteed in advance, check it before accessing the
class-specific method:

```ts
if (alice instanceof Manager) {
  alice.sayHello();
}
```

`instanceof` performs a runtime check and narrows the type inside the block.
Use an assertion only when you have reliable information that TypeScript
cannot see. For untrusted values, such as data from an API, validate the
value's shape at runtime rather than asserting that it is correct.