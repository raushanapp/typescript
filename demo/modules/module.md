# Modules in TypeScript

A module is a file that can expose some of its declarations for other files to
use. `export` makes a declaration available, and `import` brings it into
another file. The examples in this lesson are in [`index.ts`](./index.ts),
[`math.ts`](./math.ts), and [`coord.ts`](./coord.ts).

## Named exports and imports

[`math.ts`](./math.ts) uses named exports:

```ts
export function add(lhs: number, rhs: number): number {
  return lhs + rhs;
}

export const pi = Math.PI;
export type Int = number;
```

Import named exports with their exported names inside braces:

```ts
import { add, pi, Int } from "./math";

const three: Int = 3;
const four = add(2, 2);
```

You can rename an imported declaration with `as`. The alias is local to the
importing file; the exported name remains `Int`:

```ts
import { Int as Integer } from "./math";

const three: Integer = 3;
```

## Default exports

[`coord.ts`](./coord.ts) has a default export:

```ts
type Point = {
  x: number;
  y: number;
};

export default Point;
```

A default import does not use braces, and the importing file can choose its
local name. Since this export is a type, mark the import as type-only:

```ts
import type Coordinate from "./coord";

const origin: Coordinate = { x: 0, y: 0 };
```

## Putting the imports together

This example combines the exports from both files:

```ts
import { add, pi, Int as Integer } from "./math";
import type Coordinate from "./coord";

const three: Integer = 3;
const four = add(2, 2);
const origin: Coordinate = { x: 0, y: 0 };

console.log(three, four, pi, origin);
```

The paths `./math` and `./coord` are relative to the importing file. TypeScript
uses the corresponding files to check the imported names and types. A
type-only import is used for type checking and is not needed as a runtime
JavaScript import.