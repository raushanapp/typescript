# Const Assertions (`as const`)

A **const assertion** tells TypeScript to infer a literal expression as
narrowly as possible and mark its literal properties and elements `readonly`.
It is written with `as const`:

```ts
const Colors = ["red", "green", "blue"] as const;
```

Without the assertion, TypeScript generally infers an array of `string` that
can be changed. With it, `Colors` is inferred as a readonly tuple:
`readonly ["red", "green", "blue"]`. Its elements keep their individual
string-literal types, and array mutation methods such as `push` are not
available.

## Deriving a union from an array

The example in [`index.ts`](./index.ts) uses the tuple to derive a `Color`
type from its values:

```ts
const Colors = ["red", "green", "blue"] as const;
type Color = (typeof Colors)[number];

const blue: Color = "blue";

for (const color of Colors) {
  console.log(color);
}
```

`typeof Colors` gets the tuple's type. Indexing that type with `number` gets
the type of any tuple element, resulting in `"red" | "green" | "blue"`.
Consequently, a `Color` can be one of those values, but not an arbitrary
string.

This pattern is useful when a program needs both a runtime list to iterate
over and a corresponding union type for compile-time checking. Keeping the
values in one place avoids separately maintaining an array and a list of
literal types.

## Deriving a union from an object

A const assertion also preserves the string literals in an object:

```ts
const Department = {
  Executive: "Executive",
  Sales: "Sales",
  Warehouse: "Warehouse",
} as const;

type Department = (typeof Department)[keyof typeof Department];

let key: keyof typeof Department;
for (key in Department) {
  console.log(`Key = ${key}, floor = ${Department[key]}`);
}
```

Here, `keyof typeof Department` is the union of the property names
(`"Executive" | "Sales" | "Warehouse"`). Indexing the object's type with
those keys produces the union of its values. In this example the keys and
values happen to be the same strings, but they can differ. This is a useful
pattern for enum-like constants: the object can be used at runtime, while
its keys and values provide precise types.

## Why and when to use `as const`

Use a const assertion for literal configuration, fixed lookup tables, action
names, or other values that should retain their exact literal types and
should not be mutated through the inferred TypeScript type. It can make
invalid values harder to introduce and lets types be derived from the runtime
data rather than duplicated.

For example, literal action names can be used as a narrow type:

```ts
const actions = ["save", "cancel"] as const;
type Action = (typeof actions)[number];

function handleAction(action: Action): void {
  console.log(action);
}

handleAction("save"); // valid
// handleAction("delete"); // Type error: "delete" is not an Action
```

## Important distinction

`as const` affects TypeScript's type inference; it does not freeze a value at
runtime. JavaScript can still mutate an object through another mutable
reference, and `Object.freeze` is a separate runtime operation. Likewise,
declaring a variable with `const` prevents reassigning the variable, but by
itself does not make the contents of an array or object readonly.