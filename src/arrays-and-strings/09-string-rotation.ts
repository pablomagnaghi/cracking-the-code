// LCCI 01.09. String Rotation
//
// Assume you have a method isSubstring which checks if one word is a substring of another.
// Given two strings, s1 and s2, write code to check if s2 is a rotation of s1 using only
// one call to isSubstring (e.g., "waterbottle" is a rotation of "erbottlewat").
//
// Example 1:
//   Input: s1 = "waterbottle", s2 = "erbottlewat"
//   Output: true
//
// Example 2:
//   Input: s1 = "aa", s2 = "aba"
//   Output: false
//
// Constraints:
//   - 0 <= s1.length, s2.length <= 100000

export function isSubstring(s1: string, s2: string): boolean {
  return s1.includes(s2);
}

export function stringRotation(s1: string, s2: string): boolean {
  if (!s1 || !s2) {
    return false;
  }

  if (s1.length !== s2.length || s1.length === 0) {
    return false;
  }

  const combined = s1 + s1;
  return isSubstring(combined, s2);
}
