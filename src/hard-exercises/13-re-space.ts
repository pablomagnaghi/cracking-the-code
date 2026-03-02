// LCCI 17.13. Re-Space
//
// Oh, no! You have accidentally removed all spaces, punctuation, and
// capitalization in a lengthy document. A sentence like "I reset the
// computer. It still didn't boot!" became "iresetthecomputeritstilldidntboot".
// Given a dictionary and the document, design an algorithm to unconcatenate
// the document in a way that minimizes the number of unrecognized characters.
//
// Example:
//   Input: dictionary = ["looked","just","like","her","brother"]
//          sentence = "jesslookedjustliketimherbrother"
//   Output: 7  ("jess looked just like tim her brother" - 7 unrecognized)
//
// Constraints:
//   - 0 <= len(sentence) <= 1000
//   - Total number of characters in dictionary <= 150000
//   - There are only lowercase letters.

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
