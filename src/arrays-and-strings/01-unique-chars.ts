// LCCI 01.01. Is Unique
//
// Implement an algorithm to determine if a string has all unique characters.
// What if you cannot use additional data structures?
//
// Example 1:
//   Input: s = "leetcode"
//   Output: false
//
// Example 2:
//   Input: s = "abc"
//   Output: true
//
// Constraints:
//   - 0 <= len(s) <= 100
//   - The string contains only lowercase letters

export function isUnique(str: string) {
  const charsSet = new Set<string>();

  for (const c of str) {
    if (charsSet.has(c)) {
      return false;
    }
    charsSet.add(c);
  }

  return true;
}
