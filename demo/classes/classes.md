# Classes in TypeScript

The examples in [`index.ts`](./index.ts) show how to define classes, create
instances, initialize properties, and add methods.

A **class** is a template for creating objects with related data and behavior.
Use `new` to create an instance. Unlike an interface, a class exists at runtime
and its constructor and methods are available on created objects.

## Define a class and create an instance

The `Color` class initializes each property when an instance is created:

```ts
class Color {
  r: number = 0;
  g: number = 0;
  b: number = 0;
}

const red = new Color();
red.r = 255;

console.log(red.r); // 255
```

`r`, `g`, and `b` are instance properties, each initialized to `0`. The
constructor is omitted, so `new Color()` creates an instance using those field
initializers. `red.r = 255` changes the `r` property on that particular
instance.

## Initialize properties with a constructor

A constructor runs when `new` creates an instance. It can accept arguments and
use them to initialize the instance's properties:

```ts
class Dimension {
  length: number;
  width: number;

  constructor(length: number, public height: number) {
    this.length = length;
    this.width = 1;
  }
}

const one = new Dimension(5, 10);
// one.length === 5
// one.width === 1
// one.height === 10
```

`length` and `width` are declared as fields and assigned in the constructor.
The `public height: number` parameter is a **parameter property**: TypeScript
declares a public instance property named `height` and initializes it from the
argument, so a separate `this.height = height` assignment is unnecessary.

`public` is one of TypeScript's visibility modifiers. Class members are public
by default, but a constructor parameter becomes a parameter property only when
marked with `public`, `private`, `protected`, or `readonly`. A plain
constructor parameter is not automatically stored on the instance.

## Add behavior with methods

An instance method can read and update that instance's properties through
`this`:

```ts
class Point {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  translate(x: number, y: number): void {
    this.x += x;
    this.y += y;
  }
}
```

The constructor sets the starting coordinates. `translate` adds the supplied
offsets to the current coordinates; it mutates the point and does not return a
new one.

```ts
const p = new Point(5, 5);
p.translate(-5, -5);
// p is now at (0, 0)

const d = new Point(10, 10);
d.translate(-5, -5);
// d is now at (5, 5)
```

These are separate instances, so changing `p` does not change `d`. The
`assert.deepEqual` calls in `index.ts` verify these resulting coordinate
pairs.

## Type checking and runtime

The annotations such as `number` are checked by TypeScript and are erased from
the emitted JavaScript. The class itself remains a JavaScript class that can
create objects at runtime. TypeScript checks that constructor arguments,
property assignments, and method arguments use compatible types; it does not
automatically validate external data at runtime.

## Interview recap

- **What is a class?** A runtime template that creates objects with properties
  and methods.
- **What does a constructor do?** Initializes a new instance and can receive
  the values needed to set it up.
- **What is a parameter property?** A constructor parameter with an access
  modifier, such as `public height: number`, that also declares and initializes
  an instance property.
- **What does `this` refer to in an instance method?** The particular instance
  on which the method was called.
- **How is a class different from an interface?** A class can be instantiated
  and provides runtime behavior; an interface describes a type shape for
  compile-time checking.