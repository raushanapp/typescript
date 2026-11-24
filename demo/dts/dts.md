# TypeScript Definition Files (.d.ts)

## What are Definition Files?

Definition files (`.d.ts` files) are TypeScript files that contain **type information only** - they describe the shape and types of JavaScript code without containing any implementation. They act as an interface between JavaScript code and TypeScript, allowing TypeScript to understand and type-check JavaScript libraries.

A `.d.ts` file contains:
- Type definitions (interfaces, types, enums)
- Function signatures
- Class definitions
- Variable declarations
- Module exports

But **NO implementation code** (no function bodies, no variable values, etc.)

## Why Use Definition Files?

| Reason | Benefit |
|--------|---------|
| **Type Safety** | Use untyped JavaScript libraries in TypeScript with full type checking |
| **Intellisense** | Get IDE autocomplete and documentation from plain JavaScript libraries |
| **Backward Compatibility** | Add types to existing JavaScript without changing implementation |
| **Smaller Bundles** | Type information is stripped at compile time, keeping bundle size small |
| **Third-Party Libraries** | Provide type information for packages that don't include types |
| **Documentation** | Types serve as documentation for library consumers |

## Basic Syntax

### Function Signatures
```typescript
// mylib.d.ts
export function add(a: number, b: number): number;
export function greet(name: string): string;
export function delay(ms: number): Promise<void>;
```

### Variables and Constants
```typescript
export const API_KEY: string;
export const MAX_RETRIES: number;
export let configData: { host: string; port: number };
```

### Classes
```typescript
export class User {
  name: string;
  email: string;
  id: number;
  
  constructor(name: string, email: string);
  updateEmail(newEmail: string): void;
  getProfile(): { name: string; email: string };
}
```

### Interfaces and Types
```typescript
export interface Config {
  host: string;
  port: number;
  debug?: boolean;
}

export type Status = "pending" | "active" | "inactive";
```

### Enums
```typescript
export enum LogLevel {
  Debug = 0,
  Info = 1,
  Warning = 2,
  Error = 3,
}
```

## Real-World Example: Library with Multiple Exports

### Implementation (mylib.js)
```javascript
function add(a, b, ...args) {
  let total = a + b;
  for (let n of args) {
    total += n;
  }
  return total;
}

function max(arr) {
  if (arr.length === 0) {
    return null;
  }
  return arr.reduce((a, b) => Math.max(a, b));
}

function setCase(message, kind) {
  if (kind === "uppercase") {
    return message.toUpperCase();
  } else if (kind === "lowercase") {
    return message.toLowerCase();
  } else {
    throw new Error("invalid kind: must be 'uppercase' or 'lowercase'");
  }
}

function quote(message) {
  return () => {
    return `"${message}"`;
  };
}

module.exports = {
  add,
  max,
  quote,
  setCase,
};
```

### Type Definition (mylib.d.ts)
```typescript
// Function signatures with rest parameters
export function add(a: number, b: number, ...numbers: number[]): number;

// Function with nullable return type
export function max(arr: number[]): number | null;

// Function that returns another function (higher-order)
export function quote(message: string): () => string;

// Custom type for limited string values
export type CaseKind = "uppercase" | "lowercase";

// Function using custom type
export function setCase(message: string, kind: CaseKind): string;
```

### TypeScript Usage (index.ts)
```typescript
import { add, max, quote, setCase } from "./mylib";
import type { CaseKind } from "./mylib";

// All functions now have full type safety and intellisense
const upper = setCase("hello", "uppercase"); // ✓ HELLO
const lower = setCase("hello", "lowercase"); // ✓ hello
// setCase("hello", "invalid"); // ✗ Compile error!

const sum = add(1, 2, 3, 4, 5); // ✓ Type-safe with rest params
const maximum = max([1, 2, 3, 5]); // ✓ Returns number | null

const quoter = quote("hello"); // Returns: () => string
const result = quoter(); // ✓ Returns: "hello"
```

## Common Use Cases

### 1. Wrapping Plain JavaScript Libraries

**Before:** No types, poor intellisense
```typescript
// math-utils.js (no types)
export const calculateArea = (radius) => Math.PI * radius * radius;
export const calculateVolume = (radius, height) => calculateArea(radius) * height;

// Using it
import { calculateArea } from "./math-utils";
calculateArea("hello"); // ✗ No error, but should be!
```

**After:** With type definitions
```typescript
// math-utils.d.ts
export function calculateArea(radius: number): number;
export function calculateVolume(radius: number, height: number): number;

// Using it
import { calculateArea } from "./math-utils";
calculateArea("hello"); // ✓ Compile error: Argument of type 'string' is not assignable to parameter of type 'number'
```

### 2. Defining Third-Party Library Types

```typescript
// jquery.d.ts (simplified)
export interface JQuery {
  text(): string;
  text(value: string): JQuery;
  html(): string;
  html(value: string): JQuery;
  addClass(className: string): JQuery;
  removeClass(className: string): JQuery;
  on(event: string, callback: (e: Event) => void): JQuery;
}

export function $(selector: string): JQuery;
export function $(element: HTMLElement): JQuery;
```

### 3. Complex API Type Definitions

```typescript
// api-client.d.ts
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  timestamp: Date;
}

export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

export interface PaginationOptions {
  page: number;
  limit: number;
  sort?: "asc" | "desc";
}

export class ApiClient {
  constructor(baseUrl: string, apiKey: string);
  
  getUser(id: number): Promise<ApiResponse<User>>;
  listUsers(options: PaginationOptions): Promise<ApiResponse<User[]>>;
  createUser(data: Omit<User, "id" | "createdAt">): Promise<ApiResponse<User>>;
  updateUser(id: number, data: Partial<User>): Promise<ApiResponse<User>>;
  deleteUser(id: number): Promise<ApiResponse<null>>;
  
  setApiKey(key: string): void;
  setBaseUrl(url: string): void;
}

export interface HttpConfig {
  timeout?: number;
  retries?: number;
  headers?: Record<string, string>;
}

export function configureApi(config: HttpConfig): void;
```

### 4. Event Emitter Type Definitions

```typescript
// event-emitter.d.ts
export interface EventMap {
  [key: string]: any;
}

export class EventEmitter<T extends EventMap = EventMap> {
  on<K extends keyof T>(event: K, listener: (data: T[K]) => void): this;
  once<K extends keyof T>(event: K, listener: (data: T[K]) => void): this;
  emit<K extends keyof T>(event: K, data: T[K]): boolean;
  off<K extends keyof T>(event: K, listener: (data: T[K]) => void): this;
  removeAllListeners(event?: keyof T): this;
}

// Usage example
interface MyEvents {
  "user-login": { userId: number; timestamp: Date };
  "user-logout": { userId: number };
  "error": Error;
}

export const emitter: EventEmitter<MyEvents>;
```

### 5. Database ORM Type Definitions

```typescript
// database.d.ts
export interface Query<T> {
  where(condition: Partial<T>): Query<T>;
  orderBy(field: keyof T, direction: "asc" | "desc"): Query<T>;
  limit(count: number): Query<T>;
  offset(count: number): Query<T>;
  execute(): Promise<T[]>;
  first(): Promise<T | null>;
  count(): Promise<number>;
}

export interface Repository<T> {
  find(id: string | number): Promise<T | null>;
  findAll(): Promise<T[]>;
  create(data: Omit<T, "id">): Promise<T>;
  update(id: string | number, data: Partial<T>): Promise<T>;
  delete(id: string | number): Promise<boolean>;
  query(): Query<T>;
}

export function createRepository<T>(tableName: string): Repository<T>;
```

### 6. Utility Function Type Definitions

```typescript
// string-utils.d.ts
export function capitalize(str: string): string;
export function camelCase(str: string): string;
export function kebabCase(str: string): string;
export function truncate(str: string, length: number): string;
export function reverseString(str: string): string;
export function isPalindrome(str: string): boolean;

// array-utils.d.ts
export function chunk<T>(arr: T[], size: number): T[][];
export function flatten<T>(arr: (T | T[])[]): T[];
export function unique<T>(arr: T[]): T[];
export function shuffle<T>(arr: T[]): T[];
export function sample<T>(arr: T[], count: number): T[];
```

### 7. Configuration/Plugin System

```typescript
// plugin-system.d.ts
export interface PluginContext {
  config: Record<string, any>;
  logger: Logger;
}

export interface Plugin {
  name: string;
  version: string;
  initialize(context: PluginContext): Promise<void>;
  execute(input: any): Promise<any>;
  destroy(): Promise<void>;
}

export class PluginManager {
  register(plugin: Plugin): void;
  load(pluginName: string): Promise<void>;
  execute(pluginName: string, input: any): Promise<any>;
  getPlugin(pluginName: string): Plugin | null;
}

export interface Logger {
  debug(message: string, ...args: any[]): void;
  info(message: string, ...args: any[]): void;
  warn(message: string, ...args: any[]): void;
  error(message: string, ...args: any[]): void;
}
```

## When to Use Definition Files

✅ **Use `.d.ts` files when:**

1. **Wrapping Untyped JavaScript** - You have existing JS code that needs TypeScript types
2. **Third-Party Libraries** - Creating types for libraries that don't include them
3. **Library Distribution** - Publishing a library with both JS and type information
4. **Legacy Code Migration** - Gradually adding types to existing JavaScript
5. **Separating Types from Implementation** - Keeping types in separate files for clarity
6. **Multiple Implementation Versions** - Support different target environments (Node.js, browsers, etc.)
7. **External API Definitions** - Define types for REST APIs, GraphQL schemas, or other external services
8. **Plugin Systems** - Define type contracts for plugins
9. **Configuration Objects** - Type configuration files and settings
10. **Ambient Declarations** - Provide global types without importing

❌ **Don't use `.d.ts` when:**
- You're writing new TypeScript code (use `.ts` with `declaration: true` in tsconfig)
- Implementation and types should stay together
- You need to maintain and test the code together

## Module Declaration Patterns

### CommonJS Module
```typescript
// mylib.d.ts
export function myFunction(x: number): string;
export const MY_CONSTANT: string;
export class MyClass {
  constructor(name: string);
  method(): void;
}
```

### ES Module
```typescript
// same as CommonJS for most cases
export function myFunction(x: number): string;
export default class DefaultExport { }
```

### Namespace Declaration
```typescript
// helpers.d.ts
export namespace StringUtils {
  function capitalize(str: string): string;
  function reverse(str: string): string;
  const REGEX_PATTERN: RegExp;
}
```

### Ambient Declaration (Global Types)
```typescript
// global.d.ts
declare global {
  interface Window {
    myGlobalFunction: () => void;
    MY_CONFIG: { apiKey: string };
  }
  
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      API_SECRET: string;
    }
  }
}

export {};
```

## Best Practices

### 1. Keep Implementation and Types in Sync
```typescript
// ✗ Bad: Type doesn't match implementation
// mylib.js
function greet(name) {
  return `Hello, ${name}!`;
}

// mylib.d.ts
export function greet(name: number): number; // Wrong!

// ✓ Good: Accurate types
export function greet(name: string): string;
```

### 2. Use Specific Types Over `any`
```typescript
// ✗ Bad
export function process(data: any): any;

// ✓ Good
export function process(data: Record<string, unknown>): { success: boolean; result: string };
```

### 3. Document Public APIs with JSDoc
```typescript
/**
 * Formats a date according to the specified format string
 * @param date - The date to format
 * @param format - Format string (e.g., 'YYYY-MM-DD', 'MM/DD/YYYY')
 * @returns Formatted date string
 * @throws Error if format is invalid
 */
export function formatDate(date: Date, format: string): string;
```

### 4. Use Readonly for Constants
```typescript
export const API_VERSION: "1.0" = "1.0";
export const MAX_RETRIES: 3 = 3;
export const SUPPORTED_FORMATS: readonly string[] = ["json", "xml", "csv"];
```

### 5. Use Union Types for Limited Values
```typescript
// ✗ Bad
export function setLogLevel(level: string): void;

// ✓ Good
export function setLogLevel(level: "debug" | "info" | "warn" | "error"): void;
```

## Generating Definition Files Automatically

You can generate `.d.ts` files automatically from TypeScript source:

```json
{
  "compilerOptions": {
    "declaration": true,
    "declarationDir": "./dist",
    "emitDeclarationOnly": false
  }
}
```

This compiles TypeScript to JavaScript and automatically generates `.d.ts` files.

## Real-World Scenarios

### Scenario 1: Monorepo with Shared Types
```
packages/
├── core/
│   ├── src/
│   │   └── utils.ts
│   └── dist/
│       ├── utils.js
│       └── utils.d.ts
├── web/
│   └── src/
│       └── app.ts (imports from core)
└── mobile/
    └── src/
        └── app.ts (imports from core)
```

### Scenario 2: JavaScript + TypeScript Migration
```
legacy/
├── utils.js (legacy code)
├── utils.d.ts (new type definitions)
└── index.ts (gradual TypeScript adoption)
```

### Scenario 3: Cross-Platform Support
```
mylib/
├── browser.js
├── browser.d.ts
├── node.js
├── node.d.ts
└── index.d.ts (re-exports appropriate version)
```

## References

- [TypeScript Handbook: Declaration Files](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html)
- [Declaration File Templates](https://www.typescriptlang.org/docs/handbook/declaration-files/templates/module-d-ts.html)
- [DefinitelyTyped Repository](https://github.com/DefinitelyTyped/DefinitelyTyped)
- [TypeScript Do's and Don'ts](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [Publishing Type Definitions](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html)
