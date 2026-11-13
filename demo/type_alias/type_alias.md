# Type Aliases in TypeScript

The example in [`index.ts`](./index.ts) defines a type alias called
`PersonName`. A **type alias** gives a descriptive name to a type, making
declarations easier to read and helping communicate what a value represents.

## The example: naming a primitive type

```ts
type PersonName = string;

const myName: PersonName = "Jayson";
const alsoMyName: string = "Alice";
```

`PersonName` is an alias for `string`. It does not create a new kind of runtime
value or a distinct, incompatible type. Both variables still contain ordinary
strings, and a `PersonName` can be used anywhere a `string` is expected.

The main benefit is meaning: `PersonName` tells a reader what the string is
for, while `string` only tells them its basic representation.

## Use aliases in function signatures

The file contrasts a generic parameter name with a more descriptive one:

```ts
function print(thing: string) {
  console.log(`Name is ${thing}`);
}

function printName(name: PersonName) {
  console.log(`Name is ${name}`);
}
```

The first function is valid TypeScript, but `thing` and `string` do not make
clear that the expected value is a person's name. The second communicates that
intent through both the parameter name and its type.

An alias can be reused for parameters, variables, and return types:

```ts
function formatName(name: PersonName): PersonName {
  return name.trim();
}

const formattedName: PersonName = formatName(myName);
```

The compiler still checks the value as a string. For example, passing a number
to `printName` is a type error:

```ts
// printName(42); // Error: number is not assignable to string
```

## Aliases for more complex types

Aliases are also useful for object shapes and unions:

```ts
type Person = {
  name: PersonName;
  age: number;
};

type Status = "pending" | "active" | "complete";

const person: Person = { name: "Jayson", age: 30 };
const status: Status = "active";
```

Now `Person` and `Status` can be reused across multiple declarations. The
object alias describes the required properties and their types. The union
alias limits `Status` to one of the listed string values.

## Type alias versus interface

Both `type` aliases and `interface` declarations can describe object shapes:

```ts
type UserByType = { id: number; name: string };

interface UserByInterface {
  id: number;
  name: string;
}
```

For simple object shapes, either may be appropriate. A type alias can name
types beyond object shapes, such as primitives, unions, and tuples. Interfaces
are specifically for object-like shapes and support declaration merging;
aliases cannot be reopened and merged that way. Follow the convention used by
your project when both options fit.

## Interview recap

- **What is a type alias?** A name for a type, declared with `type Name = ...`.
- **Why use one?** To improve readability, express intent, and reuse a type.
- **Does `type PersonName = string` make a nominally distinct type?** No. It is
  structurally the same type as `string`; it does not prevent other strings
  from being passed in.
- **Can a type alias represent a union?** Yes, for example
  `type Status = "pending" | "active"`.
- **How does it differ from an interface?** Aliases can represent unions,
  primitives, tuples, and object shapes. Interfaces describe object-like
  shapes and can be extended or declaration-merged.

Type aliases are compile-time TypeScript constructs. They do not create
JavaScript classes or perform runtime validation.