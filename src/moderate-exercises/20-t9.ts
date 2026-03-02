// LCCI 16.20. T9
//
// On old cell phones, users typed on a numeric keypad and the phone would provide
// a list of words that matched these numbers. Given a digit string, return all
// matching words from a provided dictionary.
//
// Example 1:
//   Input: num = "8733", words = ["tree", "used"]
//   Output: ["tree", "used"]
//
// Example 2:
//   Input: num = "2", words = ["a", "b", "c", "d"]
//   Output: ["a", "b", "c"]
//
// Constraints:
//   - num.length <= 1000
//   - words.length <= 500
//   - words[i].length == num.length
//   - num does not contain 0 or 1 digits.

const t9Mapping: Record<string, string[]> = {
  '2': ['a', 'b', 'c'],
  '3': ['d', 'e', 'f'],
  '4': ['g', 'h', 'i'],
  '5': ['j', 'k', 'l'],
  '6': ['m', 'n', 'o'],
  '7': ['p', 'q', 'r', 's'],
  '8': ['t', 'u', 'v'],
  '9': ['w', 'x', 'y', 'z'],
};

export function t9Words(digits: string, dictionary: string[]): string[] {
  if (!digits || !dictionary || dictionary.length === 0) return [];
  const pattern = digitsToRegex(digits);
  return dictionary.filter((word) => pattern.test(word));
}

function digitsToRegex(digits: string): RegExp {
  const regexParts = digits.split('').map((d) => `[${t9Mapping[d].join('')}]`);
  return new RegExp(`^${regexParts.join('')}$`, 'i');
}
