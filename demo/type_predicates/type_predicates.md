# Type Predicates in TypeScript

A **type guard** is a runtime check that TypeScript can use to narrow a value's
type. The `sample` function in [`index.ts`](./index.ts) demonstrates built-in
guards: `typeof data === "string"` narrows `data` to `string`, and checking for
`"number"` narrows it to `number`.

A **user-defined type predicate** puts that narrowing check in a function. Its
return type has the form `parameterName is Type`. When the function returns
`true`, TypeScript treats the checked value as that type in the corresponding
branch.

## Define a predicate for a union

The source defines two shapes with different discriminant values:

```ts
interface Square {
  kind: "square";
  size: number;
}

interface Circle {
  kind: "circle";
  radius: number;
}

type Shape = Square | Circle;
```

The `kind` property is a **discriminant**: its literal value identifies which
member of the union a shape belongs to. The predicates check that property
and describe the resulting type to TypeScript:

```ts
function isSquare(shape: Shape): shape is Square {
  return shape.kind === "square";
}

function isCircle(shape: Shape): shape is Circle {
  return shape.kind === "circle";
}
```

At runtime each function returns an ordinary Boolean. The `shape is Square`
and `shape is Circle` return annotations tell the TypeScript compiler how to
narrow the argument when the result is true.

## Use predicates to access the right properties

```ts
function calculateArea(shape: Shape): number {
  if (isSquare(shape)) {
    return shape.size ** 2;
  }
  if (isCircle(shape)) {
    return Math.PI * shape.radius ** 2;
  }
  throw new Error("Unknown shape");
}

const square: Shape = { kind: "square", size: 4 };
const circle: Shape = { kind: "circle", radius: 3 };

console.log(calculateArea(square)); // 16
console.log(calculateArea(circle)); // about 28.27
```

Inside the first branch, TypeScript knows `shape` is a `Square`, so `size` is
available. Inside the second, it knows `shape` is a `Circle`, so `radius` is
available. The source calls this function `calauateArea`; the example above
uses the corrected spelling `calculateArea`.

For this small discriminated union, the predicates could be replaced by
direct checks such as `if (shape.kind === "square")`. Named predicates are
useful when the same narrowing condition needs to be reused or when it makes
the caller easier to read.

## Make the predicate's claim true

TypeScript trusts a user-defined predicate's return type; it does not prove
that the check really establishes the claimed type. Here, checking `kind` is
sufficient for a value already typed as `Shape`, because the union declares
that a square has a numeric `size` and a circle has a numeric `radius`.
However, this predicate alone does not validate arbitrary external data. For
untrusted input, validate the required properties and their values at runtime
before treating the input as a `Shape`.

The source also uses assertions to verify the two area results. Passing
assertions print nothing; failed assertions throw an error. The two
`console.log` calls are the visible output.