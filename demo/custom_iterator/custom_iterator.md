# Custom Iterators in TypeScript

## What are Iterators?

An iterator is an object that allows you to traverse through a sequence of elements one at a time. It implements the Iterator protocol by providing a `next()` method that returns objects with `value` and `done` properties.

Iterators in TypeScript/JavaScript are part of the **Iterable Protocol** and **Iterator Protocol**, which allow objects to define or customize their iteration behavior.

## Protocols

### Iterator Protocol
An iterator must have a `next()` method that returns an object with:
```typescript
{
  value: any;      // Current value in sequence
  done: boolean;   // true when iteration is complete
}
```

### Iterable Protocol
An object is iterable if it implements `[Symbol.iterator]()` method that returns an iterator.

```typescript
interface Iterable<T> {
  [Symbol.iterator](): Iterator<T>;
}

interface Iterator<T> {
  next(): IteratorResult<T>;
}
```

## Basic Example: Generator Functions

The simplest way to create an iterator is using **generator functions** (functions with `*`):

```typescript
function* generateNumbers(): Generator<number> {
  yield 1;
  yield 2;
  yield 3;
}

const nums = generateNumbers();
console.log(nums.next()); // { value: 1, done: false }
console.log(nums.next()); // { value: 2, done: false }
console.log(nums.next()); // { value: 3, done: false }
console.log(nums.next()); // { value: undefined, done: true }
```

### Using Generators with for...of Loop
```typescript
function* generateWeekdays(): Generator<string> {
  yield "Monday";
  yield "Tuesday";
  yield "Wednesday";
  yield "Thursday";
  yield "Friday";
}

for (const day of generateWeekdays()) {
  console.log(day);
}
```

## Class-Based Iterators: Implementing Iterable

Create a class that implements the `Iterable<T>` interface:

```typescript
class Range implements Iterable<number> {
  private start: number;
  private end: number;

  constructor(start: number, end: number) {
    this.start = start;
    this.end = end;
  }

  *[Symbol.iterator](): Generator<number> {
    for (let i = this.start; i <= this.end; i++) {
      yield i;
    }
  }
}

const range = new Range(1, 5);
for (const value of range) {
  console.log(value); // 1, 2, 3, 4, 5
}
```

## Real-World Use Cases

### 1. File System Tree Traversal
```typescript
interface FileNode {
  name: string;
  isDirectory: boolean;
  children?: FileNode[];
}

class FileSystemIterator implements Iterable<string> {
  constructor(private root: FileNode) {}

  *[Symbol.iterator](): Generator<string> {
    yield* this.traverse(this.root);
  }

  private *traverse(node: FileNode): Generator<string> {
    yield node.name;
    if (node.isDirectory && node.children) {
      for (const child of node.children) {
        yield* this.traverse(child);
      }
    }
  }
}

// Usage
const fileSystem: FileNode = {
  name: "root",
  isDirectory: true,
  children: [
    { name: "file1.txt", isDirectory: false },
    {
      name: "folder",
      isDirectory: true,
      children: [
        { name: "file2.txt", isDirectory: false },
        { name: "file3.txt", isDirectory: false },
      ],
    },
  ],
};

const iterator = new FileSystemIterator(fileSystem);
for (const fileName of iterator) {
  console.log(fileName);
}
// Output: root, file1.txt, folder, file2.txt, file3.txt
```

### 2. Database Query Results (Pagination)
```typescript
class DatabaseResults<T> implements Iterable<T> {
  constructor(
    private data: T[],
    private pageSize: number = 5
  ) {}

  *[Symbol.iterator](): Generator<T> {
    for (let i = 0; i < this.data.length; i++) {
      yield this.data[i];
      if ((i + 1) % this.pageSize === 0) {
        // Simulate fetching next page from database
        console.log(`Fetched page ${Math.floor((i + 1) / this.pageSize)}`);
      }
    }
  }
}

// Usage
const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" },
  { id: 4, name: "David" },
  { id: 5, name: "Eve" },
  { id: 6, name: "Frank" },
];

const results = new DatabaseResults(users, 2);
for (const user of results) {
  console.log(user);
}
```

### 3. Number Sequences (Fibonacci, Prime Numbers)
```typescript
class FibonacciSequence implements Iterable<number> {
  constructor(private limit: number) {}

  *[Symbol.iterator](): Generator<number> {
    let [prev, curr] = [0, 1];
    let count = 0;

    while (count < this.limit) {
      yield prev;
      [prev, curr] = [curr, prev + curr];
      count++;
    }
  }
}

// Usage
const fibonacci = new FibonacciSequence(10);
console.log([...fibonacci]); 
// [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

### 4. Infinite Sequences (Lazy Evaluation)
```typescript
class InfiniteCounter implements Iterable<number> {
  constructor(private start: number = 0) {}

  *[Symbol.iterator](): Generator<number> {
    let current = this.start;
    while (true) {
      yield current;
      current++;
    }
  }
}

// Usage - take first 5 elements
const counter = new InfiniteCounter(1);
let count = 0;
for (const num of counter) {
  if (count >= 5) break;
  console.log(num); // 1, 2, 3, 4, 5
  count++;
}
```

### 5. API Response Pagination
```typescript
interface ApiResponse<T> {
  data: T[];
  nextPage?: string;
}

class ApiPaginator<T> implements Iterable<T> {
  constructor(
    private fetchPage: (url: string) => Promise<ApiResponse<T>>,
    private initialUrl: string
  ) {}

  async *[Symbol.iterator](): AsyncGenerator<T> {
    let url: string | undefined = this.initialUrl;

    while (url) {
      const response = await this.fetchPage(url);
      for (const item of response.data) {
        yield item;
      }
      url = response.nextPage;
    }
  }
}

// Usage
// const paginator = new ApiPaginator(
//   async (url) => fetch(url).then(r => r.json()),
//   "https://api.example.com/users?page=1"
// );
// 
// for await (const user of paginator) {
//   console.log(user);
// }
```

### 6. Tree Traversal (In-Order, Pre-Order, Post-Order)
```typescript
interface TreeNode<T> {
  value: T;
  left?: TreeNode<T>;
  right?: TreeNode<T>;
}

class BinaryTreeIterator<T> implements Iterable<T> {
  constructor(
    private root: TreeNode<T> | undefined,
    private traversalType: "inOrder" | "preOrder" | "postOrder" = "inOrder"
  ) {}

  *[Symbol.iterator](): Generator<T> {
    if (this.traversalType === "inOrder") {
      yield* this.inOrder(this.root);
    } else if (this.traversalType === "preOrder") {
      yield* this.preOrder(this.root);
    } else {
      yield* this.postOrder(this.root);
    }
  }

  private *inOrder(node: TreeNode<T> | undefined): Generator<T> {
    if (node) {
      yield* this.inOrder(node.left);
      yield node.value;
      yield* this.inOrder(node.right);
    }
  }

  private *preOrder(node: TreeNode<T> | undefined): Generator<T> {
    if (node) {
      yield node.value;
      yield* this.preOrder(node.left);
      yield* this.preOrder(node.right);
    }
  }

  private *postOrder(node: TreeNode<T> | undefined): Generator<T> {
    if (node) {
      yield* this.postOrder(node.left);
      yield* this.postOrder(node.right);
      yield node.value;
    }
  }
}

// Usage
const tree: TreeNode<number> = {
  value: 1,
  left: { value: 2, left: { value: 4 }, right: { value: 5 } },
  right: { value: 3 },
};

console.log("In-Order:", [...new BinaryTreeIterator(tree, "inOrder")]);
// [4, 2, 5, 1, 3]

console.log("Pre-Order:", [...new BinaryTreeIterator(tree, "preOrder")]);
// [1, 2, 4, 5, 3]

console.log("Post-Order:", [...new BinaryTreeIterator(tree, "postOrder")]);
// [4, 5, 2, 3, 1]
```

### 7. String Character Iterator with Filtering
```typescript
class StringIterator implements Iterable<string> {
  constructor(
    private str: string,
    private filter?: (char: string) => boolean
  ) {}

  *[Symbol.iterator](): Generator<string> {
    for (const char of this.str) {
      if (!this.filter || this.filter(char)) {
        yield char;
      }
    }
  }
}

// Usage
const vowels = new StringIterator("hello world", (char) =>
  "aeiouAEIOU".includes(char)
);
console.log([...vowels]); // ['e', 'o', 'o']

const consonants = new StringIterator("hello world", (char) =>
  /[bcdfghjklmnpqrstvwxyz]/i.test(char)
);
console.log([...consonants]); // ['h', 'l', 'l', 'w', 'r', 'l', 'd']
```

## Generator Functions vs Class-Based Iterators

| Aspect | Generator Functions | Class-Based |
|--------|-------------------|-------------|
| **Syntax** | `function* () {}` | `class implements Iterable` |
| **Complexity** | Simpler for basic sequences | Better for complex state |
| **Reusability** | Limited, creates new iterator each time | Can be reused multiple times |
| **State Management** | Good for local variables | Better for maintaining state |
| **Performance** | Lightweight | Slightly heavier |
| **Composability** | Can use `yield*` | Can delegate internally |

## When to Use Custom Iterators

✅ **Use Iterators when:**

1. **Data Structures** - Traversing custom data structures (Trees, Graphs, Linked Lists)
2. **Lazy Evaluation** - Processing large datasets without loading everything into memory
3. **API Pagination** - Iterating through paginated API results
4. **Sequences** - Generating mathematical sequences (Fibonacci, primes)
5. **File System** - Traversing directory structures
6. **Database Queries** - Iterating through large result sets
7. **Event Streams** - Processing continuous data streams
8. **Infinite Sequences** - Creating infinite data sources with lazy evaluation
9. **Custom Filtering** - Iterating with built-in filtering logic
10. **State Transitions** - Modeling state machines or workflows

## Key Benefits

| Benefit | Description |
|---------|-------------|
| **Memory Efficiency** | Lazy evaluation loads data on-demand |
| **Code Reusability** | Use `for...of` with custom objects |
| **Clean Syntax** | Native language support via `for...of` |
| **Composability** | Can chain iterators together |
| **Separation of Concerns** | Iteration logic separate from business logic |

## Advanced Concepts

### Bidirectional Iterators
```typescript
class ReversibleArray<T> implements Iterable<T> {
  constructor(private data: T[], private reversed: boolean = false) {}

  *[Symbol.iterator](): Generator<T> {
    if (this.reversed) {
      for (let i = this.data.length - 1; i >= 0; i--) {
        yield this.data[i];
      }
    } else {
      for (const item of this.data) {
        yield item;
      }
    }
  }
}

const arr = new ReversibleArray([1, 2, 3, 4, 5], true);
console.log([...arr]); // [5, 4, 3, 2, 1]
```

### Iterator Composition
```typescript
function* map<T, U>(
  iterable: Iterable<T>,
  fn: (item: T) => U
): Generator<U> {
  for (const item of iterable) {
    yield fn(item);
  }
}

function* filter<T>(
  iterable: Iterable<T>,
  predicate: (item: T) => boolean
): Generator<T> {
  for (const item of iterable) {
    if (predicate(item)) {
      yield item;
    }
  }
}

// Usage
const numbers = [1, 2, 3, 4, 5];
const result = [...filter(map(numbers, (n) => n * 2), (n) => n > 4)];
console.log(result); // [6, 8, 10]
```

## References

- [TypeScript Handbook: Iterators and Generators](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html)
- [MDN: Iteration Protocols](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols)
- [Generator Functions Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator)
