// 5. *Recursive Multiply*:

// Write a recursive function to multiply two positive integers without using the * operator. You can use addition, subtraction, and bit shifting, but you should minimize the number of those operations.

export function recursiveMultiply(a: number, b: number): number {
  const smaller = a < b ? a : b;
  const bigger = a < b ? b : a;
  return multiply(smaller, bigger);
}

export function multiply(smaller: number, bigger: number): number {
  if (smaller === 0) return 0;
  if (smaller === 1) return bigger;

  const half = smaller >> 1;
  const halfProd = multiply(half, bigger);

  if (smaller % 2 === 0) {
    return halfProd + halfProd;
  } else {
    return halfProd + halfProd + bigger;
  }
}
