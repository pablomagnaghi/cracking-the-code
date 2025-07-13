// 8.9 Parens:
// Implement a method to print all valid (e.g., properly opened and closed) combinations of n pairs of parentheses.
// Example:
//   Input: 3
//   Output: ["((()))", "(()())", "(())()", "()(())", "()()()"]

export function generateParens(n: number): string[] {
  const result: string[] = [];
  buildParens(n, n, '', result);
  return result;
}

function buildParens(left: number, right: number, current: string, result: string[]) {
  // Base case: when no parens remain
  if (left === 0 && right === 0) {
    result.push(current);
    return;
  }

  // Can only add a left paren if we have any remaining
  if (left > 0) {
    buildParens(left - 1, right, current + '(', result);
  }

  // Can only add a right paren if more right remain than left (to stay valid)
  if (right > left) {
    buildParens(left, right - 1, current + ')', result);
  }
}
