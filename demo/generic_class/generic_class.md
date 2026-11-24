# Generic Classes in TypeScript

## What are Generic Classes?

Generic classes are classes that can work with multiple data types while maintaining type safety. They use type parameters (usually denoted by `<T>`) to allow flexibility without sacrificing the benefits of static type checking.

Generic classes enable you to:
- Write reusable code that works with any type
- Maintain type safety across different data types
- Avoid code duplication
- Provide better IDE support and compile-time error detection

## Syntax

```typescript
class ClassName<T> {
  // class implementation using type T
}
```

## Basic Example: Stack Class

A stack is a perfect example of a generic class because it can hold any type of data while maintaining the same logic (Last-In-First-Out):

```typescript
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
```

### Usage Examples:

```typescript
// Using Stack with strings
const stringStack = new Stack<string>();
stringStack.push("hello");
stringStack.push("world");
console.log(stringStack.pop()); // "world"
console.log(stringStack.peek()); // "hello"

// Using Stack with numbers
const numberStack = new Stack<number>();
numberStack.push(1);
numberStack.push(2);
numberStack.push(3);
console.log(numberStack.pop()); // 3
console.log(numberStack.peek()); // 2

// Using Stack with custom objects
interface User {
  id: number;
  name: string;
}

const userStack = new Stack<User>();
userStack.push({ id: 1, name: "Alice" });
userStack.push({ id: 2, name: "Bob" });
console.log(userStack.pop()); // { id: 2, name: "Bob" }
```

## Multiple Type Parameters

You can define classes with multiple generic type parameters:

```typescript
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

// Usage
const pair = new Pair<string, number>("age", 25);
console.log(pair.getFirst()); // "age"
console.log(pair.getSecond()); // 25

const swapped = pair.swap();
console.log(swapped.getFirst()); // 25
console.log(swapped.getSecond()); // "age"
```

## Generic Constraints

You can constrain generic types to ensure they have specific properties or extend certain types:

```typescript
// Constraint: T must have a 'length' property
class Collection<T extends { length: number }> {
  getLength(item: T): number {
    return item.length;
  }
}

// Valid usages
new Collection<string>().getLength("hello"); // 5
new Collection<number[]>().getLength([1, 2, 3]); // 3

// Invalid (would cause compile error)
// new Collection<number>().getLength(123); // Error: number doesn't have length
```

## Repository Pattern Example

Generic classes are commonly used in data access patterns:

```typescript
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
    return this.items.find(item => item.id === id);
  }

  getAll(): T[] {
    return [...this.items];
  }

  update(id: number, updates: Partial<T>): T | undefined {
    const item = this.getById(id);
    if (item) {
      Object.assign(item, updates);
    }
    return item;
  }

  delete(id: number): boolean {
    const index = this.items.findIndex(item => item.id === id);
    if (index > -1) {
      this.items.splice(index, 1);
      return true;
    }
    return false;
  }
}

// Usage
interface Product extends Entity {
  name: string;
  price: number;
}

const productRepo = new Repository<Product>();
const product = productRepo.add({ name: "Laptop", price: 999 });
console.log(product); // { id: 1, name: "Laptop", price: 999 }

const updated = productRepo.update(1, { price: 899 });
console.log(updated); // { id: 1, name: "Laptop", price: 899 }
```

## When to Use Generic Classes

✅ **Use Generic Classes when:**

1. **Data Structures** - Creating reusable data structures like Stack, Queue, LinkedList, Tree
2. **Repository/DAO Pattern** - Creating generic data access layers for different entity types
3. **API Responses** - Wrapping API responses with consistent structure for different data types
4. **Cache Implementations** - Creating a cache that can store any type of data
5. **Configuration Holders** - Classes that hold configuration for different types
6. **Wrapper/Decorator Classes** - Creating wrappers around different types with consistent behavior

## Common Use Cases

### 1. API Response Wrapper
```typescript
class ApiResponse<T> {
  constructor(
    public success: boolean,
    public data: T,
    public message: string = ""
  ) {}
}

interface Post {
  id: number;
  title: string;
}

const response = new ApiResponse<Post>(
  true,
  { id: 1, title: "Learning Generics" },
  "Post fetched successfully"
);
```

### 2. Event Emitter
```typescript
class EventEmitter<T> {
  private listeners: ((data: T) => void)[] = [];

  on(listener: (data: T) => void): void {
    this.listeners.push(listener);
  }

  emit(data: T): void {
    this.listeners.forEach(listener => listener(data));
  }
}

interface UserEvent {
  userId: number;
  action: string;
}

const userEmitter = new EventEmitter<UserEvent>();
userEmitter.on(event => console.log(`User ${event.userId} ${event.action}`));
userEmitter.emit({ userId: 1, action: "logged in" });
```

### 3. Async Wrapper
```typescript
class AsyncResult<T, E> {
  private constructor(
    public isSuccess: boolean,
    public data?: T,
    public error?: E
  ) {}

  static success<T, E>(data: T): AsyncResult<T, E> {
    return new AsyncResult(true, data);
  }

  static failure<T, E>(error: E): AsyncResult<T, E> {
    return new AsyncResult(false, undefined, error);
  }

  map<U>(fn: (data: T) => U): AsyncResult<U, E> {
    if (this.isSuccess && this.data) {
      return AsyncResult.success(fn(this.data));
    }
    return AsyncResult.failure(this.error!);
  }
}
```

## Benefits Summary

| Benefit | Description |
|---------|-------------|
| **Reusability** | Write once, use with any type |
| **Type Safety** | Catch type errors at compile time |
| **Code Organization** | Cleaner, more maintainable code |
| **DRY Principle** | Don't Repeat Yourself - avoid duplicate code |
| **Developer Experience** | Better IDE autocomplete and type hints |

## References

- [TypeScript Handbook: Generic Classes](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-classes)
- [TypeScript Generic Constraints](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints)
