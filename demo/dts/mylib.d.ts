// function add(a, b, ...args) {
//   let total = a + b;
//   for (let n of args) {
//     total += n;
//   }
//   return total;
// }

// function max(arr) {
//   if (arr.length === 0) {
//     return null;
//   }
//   return arr.reduce((a, b) => Math.max(a, b));
// }

export function add(a: number, b: number, ...numbers: number[]): number;
export function max(arr: number[]): number | null;
export function quote(message: string): () => string;
export type CaseKind = "uppercase" | "lowercase";
export function setCase(message: string, kind: CaseKind): string;
