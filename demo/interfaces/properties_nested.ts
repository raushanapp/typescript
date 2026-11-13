/* eslint-disable */
import { strict as assert } from "assert";

// Define an interface for an address
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

console.log(david);
