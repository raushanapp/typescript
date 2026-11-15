# Optional Fields in TypeScript

An optional property is one that an object may omit. Add `?` after the
property name in an interface or object type. The example in
[`index.ts`](./index.ts) uses an optional warranty on a line item:

```ts
type Warranty = "standard" | "extended";

interface LineItem {
  name: string;
  quantity: number;
  warranty?: Warranty;
}
```

`name` and `quantity` are required. `warranty` may be absent; if provided, it
must be either `"standard"` or `"extended"`. Optional does not mean nullable:
`null` is not allowed unless it is explicitly included in the property's
type.

## Create objects with and without the field

Both of these values satisfy `LineItem`:

```ts
const boxFan: LineItem = {
  name: "Box Fan",
  quantity: 2,
};

const headerFan: LineItem = {
  name: "Header Fan",
  quantity: 2,
  warranty: "standard",
};
```

The first object omits the optional property. The second includes it with an
allowed value. A value such as `"lifetime"` would be rejected because it is
not part of `Warranty`.

## Read an optional property safely

When reading `item.warranty`, account for it being `undefined` if the field is
missing. `warrantyInfo` accepts only valid warranty values:

```ts
function warrantyInfo(warranty: Warranty): string {
  switch (warranty) {
    case "standard":
      return "90 day warranty";
    case "extended":
      return "180 day extended warranty";
  }
}
```

The source checks the optional property before passing it to `warrantyInfo`:

```ts
function printLine(item: LineItem): void {
  console.log(`item ${item.name}`);
  console.log(`Quantity: ${item.quantity}`);

  if (item.warranty !== undefined) {
    console.log(`Warranty: ${warrantyInfo(item.warranty)}`);
  } else {
    console.log("Warranty: none");
  }
}
```

Inside the first branch, TypeScript narrows `item.warranty` to `Warranty`.
Inside the `else` branch, it is `undefined`. This lets `warrantyInfo` accept
only actual warranty values.

The source calls `printLine` for a line item without a warranty and one with a
standard warranty. It prints:

```text
item Box Fan
Quantity: 2
Warranty: none
item Header Fan
Quantity: 2
Warranty: 90 day warranty
```

The `Warranty` type also allows `"extended"`. The source's extended message
currently has a spelling typo (`"180 day extended warrantyy"`), though the
shown calls do not use that case.