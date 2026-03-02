// LCCI 16.26. Calculator
//
// Given an arithmetic expression consisting of non-negative integers and the
// operators +, -, *, / (no parentheses), compute the result.
// The expression may contain spaces. Integer division should truncate toward zero.
//
// Example 1:
//   Input: "3+2*2"
//   Output: 7
//
// Example 2:
//   Input: " 3/2 "
//   Output: 1
//
// Example 3:
//   Input: " 3+5 / 2 "
//   Output: 5
//
// Constraints:
//   - The expression is always valid.
//   - You may not use any built-in eval function.

export function calculate(expression: string): number {
  const stack: number[] = [];
  let currentNum = 0;
  let prevOperator = '+';
  let i = 0;
  const n = expression.length;

  while (i < n) {
    let ch = expression[i];

    if (ch === ' ') {
      i++;
      continue;
    }

    // Handle negative numbers
    if ((ch === '-' || ch === '+') && (i === 0 || '+-*/'.includes(expression[i - 1]))) {
      // This is a sign, not an operator
      let sign = ch === '-' ? -1 : 1;
      i++;
      let num = 0;
      while (i < n && /\d/.test(expression[i])) {
        num = num * 10 + Number(expression[i]);
        i++;
      }
      currentNum = sign * num;
      continue;
    }

    if (/\d/.test(ch)) {
      currentNum = 0;
      while (i < n && /\d/.test(expression[i])) {
        currentNum = currentNum * 10 + Number(expression[i]);
        i++;
      }
      continue;
    }

    // Operator
    applyOperation(stack, prevOperator, currentNum);
    currentNum = 0;
    prevOperator = ch;
    i++;
  }

  applyOperation(stack, prevOperator, currentNum);
  return stack.reduce((a, b) => a + b, 0);
}

function applyOperation(stack: number[], operator: string, num: number): void {
  switch (operator) {
    case '+':
      stack.push(num);
      break;
    case '-':
      stack.push(-num);
      break;
    case '*':
      stack.push(stack.pop()! * num);
      break;
    case '/':
      stack.push(stack.pop()! / num); // float division
      break;
  }
}
