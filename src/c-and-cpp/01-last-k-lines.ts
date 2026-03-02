// 12.01. Last K Lines
//
// Write a method to print the last K lines of an input file using C++.
// Adapted: implement a function that returns the last K lines of a string
// input using a circular buffer approach.
//
// Approach:
//   Split the input string by newlines. Use a circular buffer (fixed-size
//   array of length K) to keep track of the last K lines as we iterate.
//   A write pointer (modulo K) wraps around so that only the most recent
//   K lines are retained. After processing, read the buffer starting from
//   the write pointer to preserve original order.
//
// Example:
//   Input: "a\nb\nc\nd\ne", k = 3
//   Output: ["c", "d", "e"]
//
// Constraints:
//   - If k <= 0, return an empty array.
//   - If k >= number of lines, return all lines.
//   - Input may be an empty string.

export function lastKLines(input: string, k: number): string[] {
  if (k <= 0) return [];
  if (input === '') return [];

  const lines = input.split('\n');
  const totalLines = lines.length;

  if (k >= totalLines) return lines;

  // Circular buffer approach
  const buffer: string[] = new Array(k);
  let writeIndex = 0;

  for (const line of lines) {
    buffer[writeIndex % k] = line;
    writeIndex++;
  }

  // Read from the buffer in order
  const result: string[] = [];
  const start = writeIndex % k;
  for (let i = 0; i < k; i++) {
    result.push(buffer[(start + i) % k]);
  }

  return result;
}
