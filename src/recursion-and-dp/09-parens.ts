// LCCI 08.09. Bracket
//
// Implement an algorithm to print all valid (e.g., properly opened and closed)
// combinations of n pairs of parentheses.
//
// Example:
//   Input: n = 3
//   Output: ["((()))","(()())","(())()","()(())","()()()"]
//
// Constraints:
//   1 <= n <= 8

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
