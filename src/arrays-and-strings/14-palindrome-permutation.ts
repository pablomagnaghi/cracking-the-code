// 4. *Palindrome Permutation*: 

// Given a string, write a function to check if it is a permutation of a palindrome.
// A palindrome is a word or phrase that is the same forwards and backwards. A permutation is a rearrangement of letters.
// The palindrome does not need to be limited to just dictionary words.
// ```
// EXAMPLE
// Input: Tact Coa
// Output True (permutations: "taco cat", "atco cta", etc.)
// ```

export function palindromePermutation(str: string) {
  if (str.length == 0) return true;

  str = str.replace(/[^a-zA-Z]+/g, '').toLocaleLowerCase();

  const charCount = new Map<string, number>();
  let oddFreqCharsCount = 0;

  for (const c of str) {
    charCount.set(c, (charCount.get(c) ?? 0) + 1);
  }

  // only one character can appear an odd number of times (the middle character)
  for (const freq of charCount.values()) {
    if (freq % 2 !== 0) {
      oddFreqCharsCount++;
      if (oddFreqCharsCount > 1) return false;
    }
  }

  return true;
}
