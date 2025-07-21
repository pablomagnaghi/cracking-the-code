// 16.26 Calculator
//
// Problem:
// Implement a basic calculator to evaluate a simple expression string.
// The expression string may contain non-negative integers, +, -, *, / operators and empty spaces.
// The integer division should truncate toward zero.

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
