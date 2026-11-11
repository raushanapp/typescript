# Objects in TypeScript

The examples in [`index.ts`](./index.ts) create object literals to group
related data and behavior. An object stores values under named properties.
Those properties can be read with dot notation, and a property can also hold
a function (a method).

## Creating an object and reading properties

Curly braces with `name: value` pairs create an object:

```ts
const person = {
  name: "Alice",
  age: 30,
};

const alice = person.name;
const age = person.age;
```

TypeScript infers the object's shape from its properties: `name` is a string
and `age` is a number. The expressions `person.name` and `person.age` read
those values using dot notation. In the source file, assertions check that
they are `"Alice"` and `30`:

```ts
import { strict as assert } from "assert";

assert.equal(alice, "Alice");
assert.equal(age, 30);
```

An object can also be accessed with bracket notation, which is useful when
the property name is stored in a variable:

```ts
const propertyName = "name";
const name = person[propertyName]; // "Alice"
```

## Objects can contain methods

The `user` object in the source includes string and number properties as well
as a `greet` method:

```ts
const user = {
  name: "Bob",
  age: 30,
  greet() {
    console.log(
      `Hello, my name is ${this.name} and I am ${this.age} years old`,
    );
  },
};

user.greet();
```

Call the method with `user.greet()` so `this` refers to `user`. The method
uses `this.name` and `this.age` to read the values from that object and prints:

```text
Hello, my name is Bob and I am 30 years old
```

The source also checks the properties and confirms that `greet` is a
function:

```ts
assert.equal(user.name, "Bob");
assert.equal(user.age, 30);
assert.equal(typeof user.greet, "function");
```

## TypeScript object types

TypeScript infers an object type from the properties it has. You can also
describe that shape explicitly with a type:

```ts
type Person = {
  name: string;
  age: number;
};

const person: Person = {
  name: "Alice",
  age: 30,
};
```

An object assigned to `Person` must provide the required properties with the
specified types. For example, `age: "30"` would be an error because `age` must
be a number. Object types can also mark properties as optional with `?`:

```ts
type Contact = {
  name: string;
  email?: string;
};
```

The `?` means a `Contact` may omit `email`; when it is present, it must be a
string.

## `const` and object mutability

Declaring an object with `const` prevents reassigning the variable, but does
not by itself make the object's properties immutable:

```ts
const person = { name: "Alice", age: 30 };
person.age = 31; // Allowed
// person = { name: "Bob", age: 25 }; // Error: cannot reassign a const
```

If properties should not be reassigned, mark them `readonly` in the type:

```ts
type ReadonlyPerson = {
  readonly name: string;
  readonly age: number;
};
```

## Assertions in the example

The source imports Node.js's strict assertion API. A passing assertion prints
nothing; a failing assertion throws an error. The `console.log` inside
`user.greet()` is the visible output when the file runs.
