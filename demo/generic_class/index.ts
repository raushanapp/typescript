/* eslint-disable */
import { strict as assert } from "assert";

// Generic classes offer the ability to define a class that can work with a
// variety of different data types. By using generic type parameters, you can
// create a single class that can be customized to work with any type of data
// that you need.
//
// Similarly to generic functions, generic classes allow you to write more
// flexible and reusable code, since you don't have to create a separate class
// for every possible data type.
//
// Useful links:
// https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-classes

// EXAMPLE 1: Basic Stack - Last In First Out (LIFO) Data Structure
class Stack<T> {
  private elements: T[] = [];

  public push(element: T): void {
    this.elements.push(element);
  }

  public pop(): T | undefined {
    return this.elements.pop();
  }

  public peek(): T | undefined {
    return this.elements[this.elements.length - 1];
  }

  public empty(): boolean {
    return this.elements.length === 0;
  }

  public size(): number {
    return this.elements.length;
  }
}

// Stack with strings
const strings = new Stack<string>();
strings.push("hello");
strings.push("world");
assert.equal(strings.peek(), "world");
assert.equal(strings.pop(), "world");
assert.equal(strings.peek(), "hello");
assert.equal(strings.empty(), false);

// Stack with numbers
const numbers = new Stack<number>();
numbers.push(1);
numbers.push(2);
assert.equal(numbers.pop(), 2);
assert.equal(numbers.peek(), 1);
assert.equal(numbers.empty(), false);

// EXAMPLE 2: Multiple Type Parameters - Pair Class
class Pair<T, U> {
  constructor(private first: T, private second: U) {}

  getFirst(): T {
    return this.first;
  }

  getSecond(): U {
    return this.second;
  }

  swap(): Pair<U, T> {
    return new Pair(this.second, this.first);
  }
}

const stringNumberPair = new Pair<string, number>("age", 25);
assert.equal(stringNumberPair.getFirst(), "age");
assert.equal(stringNumberPair.getSecond(), 25);

const swapped = stringNumberPair.swap();
assert.equal(swapped.getFirst(), 25);
assert.equal(swapped.getSecond(), "age");

// EXAMPLE 3: Generic with Constraints - Repository Pattern
interface Entity {
  id: number;
}

class Repository<T extends Entity> {
  private items: T[] = [];
  private nextId: number = 1;

  add(item: Omit<T, "id">): T {
    const newItem = { ...item, id: this.nextId++ } as T;
    this.items.push(newItem);
    return newItem;
  }

  getById(id: number): T | undefined {
    return this.items.find((item) => item.id === id);
  }

  getAll(): T[] {
    return [...this.items];
  }
}

interface User extends Entity {
  name: string;
  email: string;
}

const userRepo = new Repository<User>();
const user = userRepo.add({ name: "John", email: "john@example.com" });
assert.equal(user.id, 1);
assert.equal(user.name, "John");

const fetchedUser = userRepo.getById(1);
assert.equal(fetchedUser?.name, "John");

// EXAMPLE 4: API Response Wrapper
class ApiResponse<T> {
  constructor(
    public success: boolean,
    public data: T,
    public message: string = ""
  ) {}

  isSuccess(): boolean {
    return this.success;
  }
}

interface Post {
  id: number;
  title: string;
}

const response = new ApiResponse<Post>(
  true,
  { id: 1, title: "Learning Generics" },
  "Success"
);
assert.equal(response.isSuccess(), true);
assert.equal(response.data.title, "Learning Generics");

console.log("✓ All generic class examples passed!");
