# `switch` Statements in TypeScript

The examples in [`index.ts`](./index.ts) use `switch` to select code based on
the value of an expression. JavaScript compares that value with each `case`
using strict equality (`===`). The first matching case runs. `break` exits the
`switch`; without it, execution continues into the following cases
(*fall-through*).

## Matching a string

The first example builds the string `"sample"` and switches on it:

```ts
const sample = "sample";
const someString = `${sample}`;

switch (someString) {
  case "test":
    // code for "test"
    break;
  case "sample":
    console.log("This is a sample string.");
    break;
  case "a":
    break;
  default:
    console.log("Unknown string.");
}
```

Because `someString` is `"sample"`, the `"sample"` case prints its message.
Its `break` prevents the `"a"` case and `default` from running. `default` is
optional and runs only when no case matches.

## Matching a number

The next example switches on the number `4`:

```ts
let someNumber = parseInt("4");

switch (someNumber) {
  case 1:
    // code for 1
    break;
  case 3:
    // code for 3
    break;
  case 6:
    // code for 6
    break;
  case 10:
    console.log("The number is 10.");
    break;
  default:
    console.log("Unknown number.");
}
```

No case matches `4`, so this code prints `"Unknown number."`. The
`"The number is 10."` message only runs when the value is `10`.

## Fall-through when `break` is omitted

The final example intentionally leaves out `break` statements:

```ts
someNumber = parseInt("4");

switch (someNumber) {
  case 1:
    // code for case 1
  case 3:
    // code for case 3
  case 4:
    // code for case 4
  case 5:
    // code for case 5
  case 6:
  case 10:
    console.log("The number is 10.");
    break;
  default:
    console.log("Unknown number.");
}
```

With `someNumber` equal to `4`, execution starts at `case 4` and continues
through `case 5`, `case 6`, and `case 10`, then prints the message and exits
at `break`. The message text says the number is 10, but the value in this
example is actually 4; it demonstrates fall-through, not a check that the
number equals 10.

Cases can intentionally share a block by placing them together without code
between them, as with `case 6` and `case 10`. For ordinary separate branches,
include `break` to avoid accidentally running later case bodies.