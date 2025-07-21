// 16.9. Operations
//
// Implement addition, subtraction, multiplication, and division without using +, -, *, or /

// ➕ Bitwise Addition
function add(a: number, b: number): number {
  while (b !== 0) {
    const carry = a & b; // Calculate carry
    a = a ^ b; // Sum without carry
    b = carry << 1; // Carry shifted left
  }
  return a;
}

function negate(x: number): number {
  return add(~x, 1); // Two's complement: -x = ~x + 1
}

function subtract(a: number, b: number): number {
  return add(a, negate(b));
}

function multiply(a: number, b: number): number {
  let result = 0;
  const isNegative = b < 0;
  let absB = isNegative ? negate(b) : b;
  let absA = a;

  while (absB > 0) {
    if (absB & 1) result = add(result, absA);
    absA <<= 1;
    absB >>>= 1;
  }

  return isNegative ? negate(result) : result;
}

function divide(a: number, b: number): number {
  if (b === 0) throw new Error('Division by zero');

  const isNegative = a < 0 !== b < 0;
  let absA = a < 0 ? negate(a) : a;
  let absB = b < 0 ? negate(b) : b;

  let result = 0;
  while (absA >= absB) {
    let temp = absB,
      multiple = 1;
    while (add(temp, temp) <= absA) {
      temp = add(temp, temp);
      multiple = add(multiple, multiple);
    }
    absA = subtract(absA, temp);
    result = add(result, multiple);
  }

  return isNegative ? negate(result) : result;
}

// Exporting as a grouped module for testing
export const operations = { add, subtract, multiply, divide };
