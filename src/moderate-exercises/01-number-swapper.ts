// 16.1. Number Swapper
//
// Write a function to swap two numbers in place (i.e., without using temporary variables).

export function swapNumbers(a: number, b: number): [number, number] {
  // Use arithmetic method (safe if no overflow)
  a = a + b;
  b = a - b; // Now b is original a
  a = a - b; // Now a is original b
  return [a, b];
}
