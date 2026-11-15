/* eslint-disable */
// You can define optional fields in your object types. Optional fields are
// fields that may or may not be present in an object. You can make a field
// optional by appending a question mark "?" to its name in the type
// definition. This is useful when you have an object with some properties that
// are not always required.
//
// Useful links:
// https://www.typescriptlang.org/docs/handbook/2/objects.html#optional-properties

type Warranty = "standard" | "extended";

//  function to return what should be displayed for each warranty type

function warrantyInfo(warranty: Warranty): string {
  switch (warranty) {
    case "standard":
      return "90 day warranty";
    case "extended":
      return "180 day extended warrantyy";
  }
}

interface LineItem {
  name: string;
  quantity: number;
  //  undefined if not present
  warranty?: Warranty;
}

function printLine(item: LineItem): void {
  console.log(`item ${item.name}`);
  console.log(`Quantity: ${item.quantity}`);
  if (item.warranty !== undefined) {
    console.log(`Warranty: ${warrantyInfo(item.warranty)}`);
  } else {
    console.log(`Warranty: none`);
  }
}

const boxFan: LineItem = {
  name: "Box Fan",
  quantity: 2,
};

const headerFan: LineItem = {
  name: "Header Fan",
  quantity: 2,
  warranty: "standard",
};

printLine(boxFan);
printLine(headerFan);
