// 11.01. Mistake
//
// Find the mistake(s) in the following code:
//   unsigned int i;
//   for (i = 100; i >= 0; --i)
//     printf("%d\n", i);
//
// The bug is that an unsigned int can never be negative, so the condition
// i >= 0 is always true. When i reaches 0 and is decremented, it wraps
// around to the maximum unsigned int value, creating an infinite loop.
//
// Approach:
//   - analyzeCode returns a structured description of the bug(s) found.
//   - findMistake returns the corrected output: an array counting from 100
//     down to 0 inclusive, which is what the original code intended.
//
// Example:
//   findMistake() => [100, 99, 98, ..., 1, 0]
//   analyzeCode() => { bug: '...', fix: '...' }
//
// Constraints:
//   - The corrected loop should count from 100 down to 0 inclusive.

export interface BugReport {
  bugDescription: string;
  originalCode: string;
  issue: string;
  fix: string;
  fixedCode: string;
}

/**
 * Returns the corrected output of the buggy code: numbers from 100 down to 0.
 */
export function findMistake(): number[] {
  const result: number[] = [];
  // Corrected version: use a signed integer type (number in TS) and stop
  // the loop properly. In C, changing to `int i` or adjusting the condition
  // to `i > 0` and printing 0 separately would fix the bug.
  for (let i = 100; i >= 0; --i) {
    result.push(i);
  }
  return result;
}

/**
 * Returns a structured analysis of the bug in the original code.
 */
export function analyzeCode(): BugReport {
  return {
    bugDescription:
      'Infinite loop caused by unsigned integer underflow',
    originalCode:
      'unsigned int i; for (i = 100; i >= 0; --i) printf("%d\\n", i);',
    issue:
      'An unsigned int can never be negative. The condition i >= 0 is always ' +
      'true for an unsigned int. When i reaches 0 and is decremented, it wraps ' +
      'around to UINT_MAX (4294967295 on most systems), so the loop never terminates.',
    fix:
      'Either change the type to a signed int, or change the loop condition ' +
      'to i > 0 and handle printing 0 separately after the loop.',
    fixedCode:
      'int i; for (i = 100; i >= 0; --i) printf("%d\\n", i);',
  };
}
