# Interfaces in TypeScript

The examples in [`index.ts`](./index.ts),
[`optional_interface_properties.ts`](./optional_interface_properties.ts), and
[`properties_nested.ts`](./properties_nested.ts), and
[`methods.ts`](./methods.ts) show how interfaces describe the expected shape
and behavior of objects.

An **interface** is a named contract for an object: it lists properties and
their types. TypeScript checks that a value used as that interface has the
required properties with compatible types. An interface is a compile-time
type description; it does not create an object or validate data at runtime.

## Describing an object

A JavaScript object can be created without an interface:

```ts
const alice = {
  name: "Alice",
  age: 30,
};
```

In TypeScript, describe the expected properties and use the interface to type
the object:

```ts
interface Person {
  name: string;
  age: number;
}

const alice: Person = {
  name: "Alice",
  age: 30,
};
```

Both `name` and `age` are required. Omitting either property or giving it an
incompatible type is a type error. TypeScript uses structural typing here: an
object is compatible because its properties match the shape, not because it
was created with a special `Person` constructor.

## Using an interface in a function

Interfaces can type function parameters, so the function can rely on the
properties declared by the interface:

```ts
function printAge(person: Person): void {
  console.log(person.age);
}

printAge(alice);
```

The `: Person` annotation tells TypeScript that `person` has a numeric `age`.
The `: void` return annotation indicates that the function does not return a
useful value.

The final `printAge(person)` example in `index.ts` leaves the parameter
unannotated. Prefer `person: Person` in TypeScript so the expected input is
explicit and checked.

## Describing methods with an interface

An interface can require a method as well as properties. In `methods.ts`, the
`Notifier` interface says that an implementation must provide a `send`
method that accepts a string and returns no useful value:

```ts
interface Notifier {
  send(message: string): void;
}
```

Classes use `implements` to declare that they fulfill the interface contract:

```ts
class EmailNotifier implements Notifier {
  send(message: string): void {
    console.log(`[Email] ${message}`);
  }
}

class SMSNotifier implements Notifier {
  send(message: string): void {
    console.log(`[SMS] ${message}`);
  }
}

class TestNotifier implements Notifier {
  send(message: string): void {
    console.log(`[Test] ${message}`);
  }
}
```

TypeScript checks that each class provides a compatible `send` method. The
interface does not provide the implementation itself; each class supplies its
own behavior. In this example, the methods only log to the console—the TODO
comments in the source indicate that actual email or text delivery is not
implemented.

A function can depend on the interface rather than a specific class:

```ts
function logAndSend(notifier: Notifier, message: string): void {
  console.log("Sending message...");
  notifier.send(message);
  console.log("Message sent successfully.");
}

logAndSend(new EmailNotifier(), "Hello via Email!");
logAndSend(new SMSNotifier(), "Hello via SMS!");
logAndSend(new TestNotifier(), "Hello via Test!");
```

`logAndSend` can work with any value that has a compatible `send` method. This
keeps the caller independent of how each notifier implements its
behavior, making it easier to swap implementations or provide a test double.

## Optional properties

Add `?` after a property name when the property may be omitted:

```ts
interface UserProfile {
  userName: string;
  email?: string;
}

const withoutEmail: UserProfile = {
  userName: "Bob",
};

const withEmail: UserProfile = {
  userName: "Bob",
  email: "bob@example.com",
};
```

`userName` is required; `email` is optional. When reading `email`, account for
the possibility that it is `undefined`:

```ts
function logUser(user: UserProfile): void {
  const email = user.email ?? "Not provided";
  console.log(`User: ${user.userName}, Email: ${email}`);
}
```

The nullish coalescing operator `??` uses the fallback when the left side is
`null` or `undefined`. Since `email` is optional, it can be `undefined` when
missing. Unlike `||`, `??` does not replace other falsy values such as an
empty string.

## Nested interfaces

An interface can use another interface to describe a nested object:

```ts
interface Address {
  street: string;
  city: string;
}

interface User {
  name: string;
  age: number;
  address: Address;
}

const david: User = {
  name: "David",
  age: 30,
  address: {
    street: "123 Main St",
    city: "New York",
  },
};
```

Here, `address` is required and must itself match the `Address` shape. Reusing
`Address` keeps the nested structure clear and allows it to be shared by other
interfaces.

## Interview recap

- **What does an interface do?** Names an object shape and lets TypeScript
  check values against that shape.
- **Are properties required?** Yes, unless marked optional with `?`.
- **How do you use one with a function?** Annotate the parameter, for example
  `function printAge(person: Person)`.
- **Can an interface require methods?** Yes. Declare the method signature, then
  have objects or classes provide a compatible implementation.
- **What is structural typing?** Compatibility is based on the properties and
  their types, rather than the object's declared name or origin.
- **Does an interface validate external data at runtime?** No. Use a runtime
  validation approach when data from an API or another untrusted source must
  be checked.

Interfaces are commonly used for object shapes and can be extended or
declaration-merged. Unlike interfaces, type aliases can also directly name
unions and primitive types. Choose the form that best matches the type and the
project's conventions.