// LCCI 08.14. Boolean Evaluation
//
// Given a boolean expression consisting of the symbols 0 (false), 1 (true),
// & (AND), | (OR), and ^ (XOR), and a desired boolean result value result,
// implement a function to count the number of ways of parenthesizing the
// expression such that it evaluates to result.
//
// Example 1:
//   Input: s = "1^0|0|1", result = 0
//   Output: 2
//   Explanation: Two possible parenthesizing ways are:
//     1^(0|(0|1)) and 1^((0|0)|1)
//
// Example 2:
//   Input: s = "0&0&0&1^1|0", result = 1
//   Output: 10
//
// Constraints:
//   There are no more than 19 operators in s.

type MemoKey = string;

export function countEval(expression: string, result: boolean): number {
  const memo = new Map<MemoKey, number>();
  return countWays(expression, result, memo);
}

function countWays(expr: string, result: boolean, memo: Map<MemoKey, number>): number {
  const key = `${expr}-${result}`;
  if (memo.has(key)) return memo.get(key)!;

  if (expr.length === 0) return 0;
  if (expr.length === 1) {
    const val = expr === '1';
    return val === result ? 1 : 0;
  }

  let ways = 0;
  for (let i = 1; i < expr.length; i += 2) {
    const operator = expr[i];
    const left = expr.substring(0, i);
    const right = expr.substring(i + 1);

    const leftTrue = countWays(left, true, memo);
    const leftFalse = countWays(left, false, memo);
    const rightTrue = countWays(right, true, memo);
    const rightFalse = countWays(right, false, memo);

    const total = (leftTrue + leftFalse) * (rightTrue + rightFalse);

    let totalTrue = 0;
    if (operator === '&') {
      totalTrue = leftTrue * rightTrue;
    } else if (operator === '|') {
      totalTrue = leftTrue * rightTrue + leftTrue * rightFalse + leftFalse * rightTrue;
    } else if (operator === '^') {
      totalTrue = leftTrue * rightFalse + leftFalse * rightTrue;
    }

    ways += result ? totalTrue : total - totalTrue;
  }

  memo.set(key, ways);
  return ways;
}
