# Loops in TypeScript

Loops repeat a block of code. TypeScript supports the same loop statements as
JavaScript. The companion [`index.ts`](./index.ts) demonstrates `for` and
`while` loops, including counting up and down, `break`, `continue`, and a loop
that stops when a condition is met.

## `for`: repeat a known number of times

A `for` loop has an initializer, a condition, and an update expression:

```ts
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
```

The initializer (`let i = 1`) runs once. Before each iteration, TypeScript
checks the condition (`i <= 5`). After the body runs, it evaluates the update
(`i++`). This prints `1` through `5`.

Use a `for` loop when you need a counter or need to repeat something a known
number of times. For example, visit each position in an array:

```ts
const colors = ["red", "green", "blue"];

for (let i = 0; i < colors.length; i++) {
  console.log(`${i}: ${colors[i]}`);
}
```

The same form can count down:

```ts
for (let count = 3; count >= 1; count--) {
  console.log(count);
}
console.log("Go!");
```

## `while`: repeat while a condition is true

A `while` loop checks its condition before each iteration. Update the state
inside the body so the condition eventually becomes false:

```ts
let attempts = 0;
let connected = false;

while (!connected && attempts < 3) {
  attempts++;
  console.log(`Connection attempt ${attempts}`);
  connected = attempts === 2;
}
```

Use `while` when the number of repetitions is not known in advance, such as
processing items until a queue is empty or waiting until a state changes. Be
careful to make progress toward the stopping condition; otherwise, the loop
may run forever.

## `do...while`: run at least once

A `do...while` loop checks its condition after the body, so the body always
runs at least once:

```ts
let menuChoice = "";

do {
  menuChoice = prompt("Enter 'help' to see options") ?? "";
} while (menuChoice !== "help");
```

Use it when an action must happen before deciding whether to repeat, such as
showing a menu or asking for input at least once. In browser and Node.js
environments, `prompt` may not be available; replace it with the input method
provided by your application.

## `for...of`: visit values in an iterable

Use `for...of` to read each value from an array, string, or another iterable:

```ts
const scores = [8, 10, 7];
let total = 0;

for (const score of scores) {
  total += score;
}

console.log(total); // 25
```

This is usually the clearest choice when you need array values but do not need
their indexes. `for...of` also works with strings:

```ts
for (const character of "cat") {
  console.log(character);
}
```

Use an indexed `for` loop instead when the index is needed, or when you need
to control which positions are visited.

## `for...in`: visit an object's keys

Use `for...in` to enumerate an object's property names. Its keys are strings:

```ts
const stock: Record<string, number> = {
  apples: 4,
  oranges: 2,
};

for (const item in stock) {
  console.log(`${item}: ${stock[item]}`);
}
```

Use it for key-based object data such as a dictionary. Avoid using `for...in`
to iterate array values: it gives keys like `"0"` and `"1"`, not the values,
and enumeration order is not the intended way to process an array. Prefer
`for...of` for array values. If an object may inherit enumerable properties,
filter for its own properties before processing them.

## `break` and `continue`

`break` exits the nearest loop immediately. It is useful when the result is
found and there is no reason to keep searching:

```ts
const ids = [12, 24, 36, 48];
let firstLargeId: number | undefined;

for (const id of ids) {
  if (id > 30) {
    firstLargeId = id;
    break;
  }
}

console.log(firstLargeId); // 36
```

`continue` skips the rest of the current iteration and moves to the next one.
It is useful for ignoring values that do not need processing:

```ts
for (let number = 1; number <= 10; number++) {
  if (number % 2 === 0) {
    continue;
  }

  console.log(number); // 1, 3, 5, 7, 9
}
```

## Choosing a loop

| Loop | Good fit |
| --- | --- |
| `for` | A counter, a known repetition count, or array indexes |
| `while` | Repeat until a condition changes; count may not be known |
| `do...while` | Run the body at least once, then decide whether to repeat |
| `for...of` | Read values from an array, string, or other iterable |
| `for...in` | Enumerate keys of an object |

Use the loop form that makes the stopping condition and the item being handled
easy to understand. Always make sure a loop can reach its exit condition, and
use `break` when an early exit is intentional.