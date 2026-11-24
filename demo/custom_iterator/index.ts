/* eslint-disable */
import { strict as assert } from "assert";

// Useful links:
// https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html

// EXAMPLE 1: Basic Generator Function
function* genValues(): Generator<number> {
  yield 1;
  yield 2;
  yield 3;
}

const values = genValues();
assert.equal(values.next().value, 1);
assert.equal(values.next().value, 2);
assert.equal(values.next().value, 3);
assert.equal(values.next().value, undefined);

// EXAMPLE 2: Class-Based Iterator - Range
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
let rangeValues: number[] = [];
for (const value of range) {
  rangeValues.push(value);
}
assert.deepEqual(rangeValues, [1, 2, 3, 4, 5]);

// EXAMPLE 3: Fibonacci Sequence Iterator
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

const fibonacci = new FibonacciSequence(6);
const fibValues = [...fibonacci];
assert.deepEqual(fibValues, [0, 1, 1, 2, 3, 5]);

// EXAMPLE 4: String Iterator with Filtering
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

const vowels = new StringIterator("hello", (char) =>
  "aeiouAEIOU".includes(char)
);
const vowelList = [...vowels];
assert.deepEqual(vowelList, ["e", "o"]);

// EXAMPLE 5: Infinite Counter with Lazy Evaluation
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

const counter = new InfiniteCounter(10);
let lazyCount = 0;
const lazyValues: number[] = [];
for (const num of counter) {
  if (lazyCount >= 3) break;
  lazyValues.push(num);
  lazyCount++;
}
assert.deepEqual(lazyValues, [10, 11, 12]);

// EXAMPLE 6: Bidirectional Iterator
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

const forward = new ReversibleArray([1, 2, 3, 4, 5], false);
assert.deepEqual([...forward], [1, 2, 3, 4, 5]);

const backward = new ReversibleArray([1, 2, 3, 4, 5], true);
assert.deepEqual([...backward], [5, 4, 3, 2, 1]);

// EXAMPLE 7: Tree Node Traversal
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

const tree: TreeNode<number> = {
  value: 1,
  left: { value: 2, left: { value: 4 }, right: { value: 5 } },
  right: { value: 3 },
};

const inOrderResult = [...new BinaryTreeIterator(tree, "inOrder")];
assert.deepEqual(inOrderResult, [4, 2, 5, 1, 3]);

const preOrderResult = [...new BinaryTreeIterator(tree, "preOrder")];
assert.deepEqual(preOrderResult, [1, 2, 4, 5, 3]);

const postOrderResult = [...new BinaryTreeIterator(tree, "postOrder")];
assert.deepEqual(postOrderResult, [4, 5, 2, 3, 1]);

console.log("✓ All custom iterator examples passed!");

