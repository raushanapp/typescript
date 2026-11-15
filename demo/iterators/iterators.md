# Iterating over collections in TypeScript

The examples in [`index.ts`](./index.ts) show three ways to traverse data:
an indexed `for` loop, `for...of` for array values, and `for...in` for object
property keys. These loop forms serve different purposes.

## Indexed `for` loop: use an index

```ts
const abc = ["a", "b", "c"];

for (let i = 0; i < abc.length; i++) {
  console.log(abc[i]);
}
```

The loop starts at index `0`, continues while the index is less than the
array's length, and increments the index after each pass. It visits each
element in order. Use this form when the index is needed or when you need
control over which positions are visited.

## `for...of`: use array values

```ts
for (const letter of abc) {
  console.log(letter);
}
```

`for...of` visits the values of an iterable, such as an array. Here, `letter`
is `"a"`, then `"b"`, then `"c"`; it is not the array index. It is often the
clearest choice when processing array elements without needing their indexes.

## `for...in`: use object keys

```ts
const nums = {
  one: 1,
  two: 2,
  three: 3,
};

let property: keyof typeof nums;

for (property in nums) {
  console.log(property, nums[property]);
}
```

`for...in` visits enumerable property names. In this example, `property`
iterates over keys such as `"one"` and `"two"`, while `nums[property]` reads
the corresponding values. `keyof typeof nums` gives TypeScript a type made
from the keys known when `nums` is declared.

Use `for...in` for object keys, not array values: on an array it visits keys
such as `"0"` and `"1"`. For array elements, prefer `for...of` or an indexed
loop.

## Runtime keys and the object's type

The example then adds a property:

```ts
nums["letter"] = "c";

for (property in nums) {
  const answer = nums[property] * 2;
  console.log(property, answer);
}
```

The `for...in` loop sees `"letter"` at runtime because it enumerates the
object's current properties. But `keyof typeof nums` still describes the
original keys (`"one"`, `"two"`, and `"three"`); TypeScript does not update
that type when the object is changed at runtime. The added value is a string,
so multiplying it by `2` produces `NaN` in JavaScript. Depending on the
compiler settings, TypeScript may not catch this out-of-shape property access.

If an object is intended to accept dynamic keys and mixed values, declare that
shape and check the value before doing numeric work:

```ts
const values: Record<string, number | string> = {
  one: 1,
  two: 2,
  three: 3,
};

values["letter"] = "c";

for (const key in values) {
  const value = values[key];
  if (typeof value === "number") {
    console.log(key, value * 2);
  }
}
```

`Record<string, number | string>` says that string keys can map to either a
number or a string. The `typeof` check narrows the value to `number` before
multiplication, avoiding an unexpected `NaN`.