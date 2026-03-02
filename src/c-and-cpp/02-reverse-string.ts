// 12.02. Reverse String
//
// Implement a function to reverse a null-terminated string.
// Adapted: implement in-place string reversal via an array of characters,
// since strings are immutable in TypeScript.
//
// Approach:
//   Use two pointers starting at the beginning and end of the array.
//   Swap characters at the two pointers and move them toward the center.
//   This runs in O(n) time and O(1) extra space.
//
// Example:
//   Input: ['h', 'e', 'l', 'l', 'o']
//   Output: ['o', 'l', 'l', 'e', 'h']
//
// Constraints:
//   - The reversal must be performed in-place (mutating the input array).
//   - An empty array or single-character array should be handled.

export function reverseString(chars: string[]): string[] {
  let left = 0;
  let right = chars.length - 1;

  while (left < right) {
    const temp = chars[left];
    chars[left] = chars[right];
    chars[right] = temp;
    left++;
    right--;
  }

  return chars;
}
