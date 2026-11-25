# Advanced TypeScript Definition Files (.d.ts) - Complex Types

## What is dts2 About?

The `dts2` folder demonstrates **advanced type definition patterns** for more complex real-world scenarios. While `dts` covers basic patterns, `dts2` focuses on:

- **Complex nested object types** (API responses with nested data structures)
- **Union types** with specific string literals
- **Readonly arrays and tuples**
- **Type inference from constants**
- **Discriminated unions** (types with status/kind fields)
- **Generic interfaces** for reusable patterns
- **Real-world API response handling**

This is essential when working with:
- REST API responses
- Complex data structures
- Database query results
- Webhook payloads
- Configuration objects with strict values
- Enterprise applications with detailed type contracts

## Real-World Example: API Response Typing

### The Problem

When working with APIs, responses have complex nested structures with restricted values. Without proper type definitions, it's easy to make mistakes:

```javascript
// mylib.js - Untyped JavaScript
function apiResponse() {
  return {
    status: "success",  // Could be "success" or "failure"
    data: {
      items: [
        {
          id: 1,
          name: "Widget 1",
          price: 10.99,
          quantity: 50,
          department: "Electronics",  // Limited to specific departments
        },
        // ... more items
      ],
    },
  };
}
```

**Without .d.ts:**
```typescript
const response = apiResponse();
if (response.status === "pending") { } // ✗ No error! Wrong value allowed
response.data.items[0].department = "InvalidDept"; // ✗ No error! Invalid value
response.data.items = "not an array"; // ✗ No error! Wrong type
```

### The Solution: Advanced Type Definitions

```typescript
// mylib.d.ts - Type Definitions with Advanced Patterns

// 1. UNION TYPE for status values (discriminated union key)
export type Status = "success" | "failure";

// 2. READONLY TUPLE extracting valid values from constant
const Departments = ["Electronics", "Home & Kitchen", "Toys & Games"] as const;
export type Department = (typeof Departments)[number];

// 3. NESTED INTERFACE for API item
export interface ApiResponseItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  department: Department;  // Restricted to valid departments
}

// 4. COMPLEX INTERFACE for complete response
export interface ApiResponse {
  status: Status;  // Only "success" or "failure"
  data: {
    items: ApiResponseItem[];  // Array of items
  };
}

// 5. FUNCTION SIGNATURE with union return type
export function apiResponse(): ApiResponse | undefined;
```

**With .d.ts:**
```typescript
const response = apiResponse();
if (response.status === "pending") { }  // ✓ Compile error! Invalid value
response.data.items[0].department = "InvalidDept";  // ✓ Compile error!
response.data.items = "not an array";  // ✓ Compile error!
```

## Advanced Type Patterns Demonstrated

### 1. Union Types for Discriminators

**Pattern:** Creating a type from specific string literals to restrict values to known options.

```typescript
// Define status as union of specific strings
export type Status = "success" | "failure";

// Or more complex scenarios:
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export type Environment = "development" | "staging" | "production";
export type LogLevel = "debug" | "info" | "warn" | "error";

// Usage in interface:
export interface HttpRequest {
  method: HttpMethod;  // Only these 5 values allowed
  url: string;
  headers?: Record<string, string>;
}

export interface ServerConfig {
  environment: Environment;  // Only these 3 values allowed
  apiKey: string;
}
```

**Benefits:**
- IDE autocomplete with only valid options
- Compile-time error if invalid value is used
- Self-documenting code
- Easy to maintain and extend

### 2. Readonly Constants with Type Inference

**Pattern:** Using `as const` on arrays/objects to create precise type literals, then extracting the type.

```typescript
// Define the source of truth as a constant
const Departments = ["Electronics", "Home & Kitchen", "Toys & Games"] as const;

// Extract the type from the constant (now it's a union of those exact strings)
export type Department = (typeof Departments)[number];

// Alternative patterns:
const VALID_ROLES = ["admin", "user", "guest"] as const;
export type UserRole = (typeof VALID_ROLES)[number];

const API_ENDPOINTS = {
  users: "/api/users",
  posts: "/api/posts",
  comments: "/api/comments",
} as const;
export type Endpoint = (typeof API_ENDPOINTS)[keyof typeof API_ENDPOINTS];

// Benefits:
// 1. Single source of truth (constants define both values AND types)
// 2. If you update Departments, the type automatically updates
// 3. Can use the constant in runtime validation too
```

**Real-World Example:**
```typescript
// constants.ts - Single source of truth
export const USER_STATUSES = ["active", "inactive", "suspended", "deleted"] as const;
export type UserStatus = (typeof USER_STATUSES)[number];

export const PAYMENT_METHODS = ["credit_card", "debit_card", "paypal", "stripe"] as const;
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];

// Now both runtime and types use the same values
function validateUserStatus(status: UserStatus): boolean {
  return USER_STATUSES.includes(status);
}
```

### 3. Nested Interface Structures

**Pattern:** Creating interfaces that represent complex, deeply nested data structures.

```typescript
// API Response with nested data structure
export interface ApiResponseItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  department: Department;
}

export interface ApiResponse {
  status: Status;
  data: {
    items: ApiResponseItem[];
  };
}

// More complex nesting example:
export interface User {
  id: number;
  username: string;
  email: string;
  profile: {
    firstName: string;
    lastName: string;
    avatar: string;
    bio?: string;
  };
  settings: {
    notifications: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
    privacy: {
      profilePublic: boolean;
      showEmail: boolean;
    };
  };
  posts: Post[];
}

export interface Post {
  id: number;
  title: string;
  content: string;
  author: User;  // Can reference other interfaces
  comments: Comment[];
}

export interface Comment {
  id: number;
  text: string;
  author: User;
  post: Post;
  createdAt: Date;
}
```

### 4. Optional and Readonly Properties

**Pattern:** Marking properties as optional or immutable.

```typescript
// Optional properties (not always present)
export interface ApiResponse {
  status: Status;
  data: {
    items: ApiResponseItem[];
  };
  error?: string;  // Optional - may or may not be present
  metadata?: {
    page: number;
    totalPages: number;
    totalItems: number;
  };
}

// Readonly properties (cannot be modified)
export interface Config {
  readonly apiKey: string;  // Cannot change after creation
  readonly baseUrl: string;
  readonly timeout: number;
  readonly retries: number;
}

// Readonly arrays
export interface Repository {
  readonly name: string;
  readonly tags: readonly string[];  // Array cannot be modified
  readonly dependencies: readonly string[];
}

// Practical example - API client configuration:
export interface ApiClientConfig {
  readonly baseUrl: string;
  readonly apiKey: string;
  readonly timeout?: number;
  readonly retries?: number;
  readonly headers?: Readonly<Record<string, string>>;
  readonly interceptors?: {
    readonly onRequest?: (config: any) => any;
    readonly onError?: (error: any) => any;
  };
}
```

### 5. Array of Complex Objects

**Pattern:** Defining arrays containing complex typed objects.

```typescript
// Array of items with specific structure
export interface ApiResponse {
  status: Status;
  data: {
    items: ApiResponseItem[];  // Array of ApiResponseItem objects
  };
}

// More examples:

// Database query results
export interface QueryResult<T> {
  rows: T[];  // Generic array
  count: number;
  offset: number;
}

// Paginated response
export interface PaginatedResponse<T> {
  items: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}

// Search results with metadata
export interface SearchResults {
  results: SearchResult[];
  facets: {
    category: Facet[];
    brand: Facet[];
    price: Facet[];
  };
}

export interface SearchResult {
  id: string;
  title: string;
  url: string;
  snippet: string;
  relevanceScore: number;
}

export interface Facet {
  value: string;
  count: number;
}
```

## Real-World Use Cases

### Use Case 1: REST API Response Typing

**Scenario:** You're building a TypeScript client for a REST API that returns complex responses.

```typescript
// API documentation says:
// GET /api/products
// Returns: {
//   status: "success" | "failure",
//   data: {
//     items: Array of products
//   }
// }

// Without .d.ts - Problems:
const response = await fetch('/api/products');
const data = await response.json();
// data has type 'any' - no type safety
data.stats = "invalid";  // ✗ No error
data.data.items[0].price = "not a number";  // ✗ No error

// With .d.ts - Solution:
export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export interface ApiResponse<T> {
  status: "success" | "failure";
  data: T;
  error?: string;
}

// Usage with full type safety:
const response: ApiResponse<{ items: Product[] }> = await fetchProducts();
response.stats = "invalid";  // ✓ Compile error!
response.data.items[0].price = "not a number";  // ✓ Compile error!

if (response.status === "success") {
  response.data.items.forEach(product => {
    console.log(product.name, product.price);  // ✓ Full intellisense
  });
}
```

**When to use:**
- Building a TypeScript client for external APIs
- Creating SDK/wrapper for third-party services
- Ensuring API response integrity
- Team collaboration with shared API contracts

### Use Case 2: Configuration Objects with Restricted Values

**Scenario:** Application configuration that only allows specific values for certain fields.

```typescript
// Without .d.ts - Problems:
const config = {
  environment: "developement",  // ✗ Typo, but no error
  logLevel: "verbose",           // ✗ Unknown level, no error
  database: "mongo",             // ✗ Unknown database, no error
};

// With .d.ts - Solution:
export type Environment = "development" | "staging" | "production";
export type LogLevel = "debug" | "info" | "warn" | "error";
export type DatabaseType = "postgresql" | "mysql" | "mongodb";

export interface ApplicationConfig {
  readonly environment: Environment;
  readonly logLevel: LogLevel;
  readonly database: DatabaseType;
  readonly timeout: number;
  readonly retries: number;
}

// Usage:
const config: ApplicationConfig = {
  environment: "developement",  // ✓ Compile error! Typo caught
  logLevel: "verbose",           // ✓ Compile error! Invalid level
  database: "mongo",             // ✓ Compile error! Use "mongodb"
  timeout: 5000,
  retries: 3,
};
```

**When to use:**
- Application configuration files
- Feature flags
- Environment-specific settings
- Plugin system configurations
- Build tool options

### Use Case 3: Webhook Payload Validation

**Scenario:** Receiving webhooks from third-party services with complex nested payloads.

```typescript
// Stripe webhook payload example
export type StripeEventType =
  | "payment_intent.succeeded"
  | "payment_intent.payment_failed"
  | "charge.refunded"
  | "customer.subscription.created"
  | "customer.subscription.deleted";

export interface StripeEventData {
  object: {
    id: string;
    type: "payment_intent" | "charge" | "subscription";
    amount: number;
    currency: string;
    status: string;
  };
}

export interface StripeWebhookEvent {
  id: string;
  object: "event";
  type: StripeEventType;
  created: number;
  data: StripeEventData;
  request?: {
    id: string | null;
    idempotency_key: string | null;
  };
}

// Usage:
function handleWebhook(event: StripeWebhookEvent) {
  if (event.type === "payment_intent.succeeded") {
    console.log("Payment succeeded:", event.data.object.amount);
  } else if (event.type === "customer.subscription.deleted") {
    console.log("Subscription cancelled");
  }
  // ✓ Autocomplete for event type, data structure is type-safe
}
```

**When to use:**
- Handling third-party webhooks
- Validating external event payloads
- Building serverless functions
- Event-driven architectures

### Use Case 4: Database Query Results

**Scenario:** Defining types for database query results with complex structures.

```typescript
export interface QueryResult<T> {
  data: T[];
  count: number;
  offset: number;
}

export interface User {
  id: number;
  username: string;
  email: string;
  createdAt: Date;
}

// Usage:
async function getUsers(): Promise<QueryResult<User>> {
  const result = await db.query('SELECT * FROM users');
  return {
    data: result.rows,
    count: result.rows.length,
    offset: 0,
  };
}

// Generic query function:
export interface FindOptions {
  limit?: number;
  offset?: number;
  sort?: Record<string, "asc" | "desc">;
  where?: Record<string, any>;
}

export function find<T>(
  model: string,
  options: FindOptions
): Promise<QueryResult<T>>;
```

**When to use:**
- ORM type definitions
- Database client wrappers
- Query builder patterns
- Data access layers

### Use Case 5: Discriminated Unions (Advanced Pattern)

**Scenario:** Creating types that can represent different states with shared and unique properties.

```typescript
// Without discriminated union - Problems:
interface Response {
  status: "success" | "failure";
  data?: any;
  error?: string;
}
// Can have both data AND error, or neither - confusing!

// With discriminated union - Solution:
export type Response<T> = SuccessResponse<T> | FailureResponse;

export interface SuccessResponse<T> {
  status: "success";
  data: T;
}

export interface FailureResponse {
  status: "failure";
  error: string;
  errorCode: number;
}

// Usage:
function handleResponse<T>(response: Response<T>) {
  if (response.status === "success") {
    // ✓ TypeScript knows 'data' exists here
    console.log(response.data);
    // response.error  // ✓ Compile error! Doesn't exist in success
  } else {
    // ✓ TypeScript knows 'error' exists here
    console.log(response.error);
    // response.data  // ✓ Compile error! Doesn't exist in failure
  }
}
```

**When to use:**
- Result types (success/failure patterns)
- State machines
- Error handling with type safety
- Multiple response scenarios

## Type Pattern Categories

### Category 1: Literal Types (Restricted Values)
```typescript
export type Status = "pending" | "active" | "inactive";
export type Priority = "low" | "medium" | "high" | "critical";
export type Environment = "dev" | "staging" | "prod";
```
**Use:** Restrict values to known options

### Category 2: Nested Objects
```typescript
export interface Response {
  meta: {
    timestamp: Date;
    version: string;
  };
  data: {
    items: Item[];
  };
}
```
**Use:** Complex data structures

### Category 3: Arrays of Objects
```typescript
export interface Response {
  items: Item[];
  metadata: {
    total: number;
  };
}
```
**Use:** Collections and lists

### Category 4: Optional Properties
```typescript
export interface User {
  id: number;
  username: string;
  bio?: string;      // Optional
  avatar?: string;   // Optional
}
```
**Use:** Properties that may not always be present

### Category 5: Readonly Properties
```typescript
export interface Config {
  readonly apiKey: string;
  readonly baseUrl: string;
}
```
**Use:** Immutable configurations

### Category 6: Generic Interfaces
```typescript
export interface Response<T> {
  data: T;
  status: "success" | "failure";
}
```
**Use:** Reusable patterns for different data types

### Category 7: Union Types (Discriminated)
```typescript
export type Result<T> = 
  | { status: "success"; data: T }
  | { status: "error"; error: Error };
```
**Use:** Multiple possible states

## Comparison: dts vs dts2

| Feature | dts | dts2 |
|---------|-----|------|
| **Complexity** | Simple | Advanced |
| **Function Types** | Basic functions | API responses |
| **Data Structures** | Flat | Nested objects |
| **Union Types** | Simple unions | Discriminated unions |
| **Return Types** | Simple | Complex with undefined |
| **Use Case** | Library wrapping | Real-world APIs |
| **Example** | Math utilities | API responses |

## When to Use dts2 Patterns

✅ **Use dts2 patterns when:**

1. **REST API Clients** - Type-safe communication with APIs
2. **Configuration Objects** - Restricted values for settings
3. **Database Access** - Complex query results
4. **Webhook Handling** - Validating external payloads
5. **Data Transformation** - Complex data mapping
6. **State Management** - Redux, Zustand state types
7. **Monorepo Shared Types** - Cross-package type contracts
8. **Third-Party Integrations** - Stripe, AWS, etc.
9. **GraphQL Responses** - Type-safe query results
10. **Error Handling** - Structured error types

## Best Practices for Advanced Types

### 1. Keep Types Synchronized
```typescript
// ✗ Bad: Type doesn't match implementation
export interface User {
  id: number;
  username: string;
  email: string;
}
// But JavaScript returns: { id, name, email_address }

// ✓ Good: Accurate types
export interface User {
  id: number;
  name: string;
  email_address: string;
}
```

### 2. Use Discriminated Unions for Multiple States
```typescript
// ✓ Good: Clear separation of concerns
export type ApiResponse<T> =
  | { status: "success"; data: T }
  | { status: "error"; error: Error }
  | { status: "loading" };
```

### 3. Document Complex Types
```typescript
/**
 * API Response for product queries
 * @param T - Type of items in the response
 * 
 * @example
 * const response: ApiResponse<Product[]> = await getProducts();
 * if (response.status === "success") {
 *   response.data.forEach(product => console.log(product.name));
 * }
 */
export interface ApiResponse<T> {
  status: "success" | "failure";
  data?: T;
  error?: string;
}
```

### 4. Use Readonly for Constants
```typescript
export interface DbConfig {
  readonly host: string;
  readonly port: number;
  readonly database: string;
}
```

### 5. Extract Types from Constants
```typescript
// Single source of truth
const API_VERSIONS = ["v1", "v2", "v3"] as const;
export type ApiVersion = (typeof API_VERSIONS)[number];

// Now both runtime and types use the same source
export function validateVersion(version: ApiVersion): boolean {
  return API_VERSIONS.includes(version);
}
```

## Real-World Example Flow

```typescript
// 1. Define the API response type (dts2 patterns)
export type Status = "success" | "failure";
export interface User {
  id: number;
  username: string;
  email: string;
}
export interface ApiResponse<T> {
  status: Status;
  data?: T;
  error?: string;
}

// 2. Use in async function
async function fetchUser(id: number): Promise<ApiResponse<User>> {
  try {
    const response = await fetch(`/api/users/${id}`);
    const json = await response.json();
    return json as ApiResponse<User>;
  } catch (error) {
    return {
      status: "failure",
      error: error.message,
    };
  }
}

// 3. Handle response with type safety
const response = await fetchUser(1);
if (response.status === "success" && response.data) {
  console.log(response.data.username);  // ✓ Full type safety
} else {
  console.error(response.error);  // ✓ Error handling with types
}
```

## References

- [TypeScript Handbook: Discriminated Unions](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions)
- [TypeScript Handbook: Union Types](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html#union-types)
- [TypeScript Handbook: Interfaces](https://www.typescriptlang.org/docs/handbook/2/objects.html)
- [TypeScript Handbook: Type Operators](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)
- [Declaration Files Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
