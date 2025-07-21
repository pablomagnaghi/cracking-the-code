// 16.20 T9

// Problem:
// Implement T9 predictive text. Given a digit sequence and a dictionary of valid words,
// return all words that match the digit sequence based on classic T9 keypad mapping.

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
