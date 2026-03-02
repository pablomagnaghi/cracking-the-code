// LCCI 01.03. String to URL
//
// Write a method to replace all spaces in a string with '%20'. You may assume that
// the string has sufficient space at the end to hold the additional characters, and
// that you are given the "true" length of the string.
//
// Example 1:
//   Input: "Mr John Smith ", 13
//   Output: "Mr%20John%20Smith"
//
// Example 2:
//   Input: "               ", 5
//   Output: "%20%20%20%20%20"
//
// Constraints:
//   - 0 <= S.length <= 500000

export function URLify(str: string): string {
  return str.replace(/ /g, '%20');
}

export function URLifyWithTrueLength(str: string, trueLength: number): string {
  let result = '';
  for (let i = 0; i < trueLength; i++) {
    const c = str[i];
    result += c === ' ' ? '%20' : c;
  }
  return result;
}
