// 17.13. Re-Space
//
// Problem:
// Given a dictionary of valid words and a sentence (string without spaces),
// find the minimum number of unrecognized characters after inserting spaces to
// form valid dictionary words in the sentence.

// Solution:
// Use dynamic programming to track the minimum unrecognized characters at each position
// by checking all possible dictionary words that can end at that position.

export function reSpace(dictionary: string[], sentence: string): number {
  const n = sentence.length;
  const dp = new Array(n + 1).fill(0);

  // Create a Set for O(1) dictionary lookup
  const dictSet = new Set(dictionary);

  for (let i = 1; i <= n; i++) {
    // Assume the ith character is unrecognized
    dp[i] = dp[i - 1] + 1;

    // Try all possible words that can end at position i
    for (let j = 0; j < i; j++) {
      const word = sentence.slice(j, i);
      if (dictSet.has(word)) {
        dp[i] = Math.min(dp[i], dp[j]);
      }
    }
  }

  return dp[n];
}
