// LCCI 16.02. Words Frequency
//
// Design a method to find the frequency of occurrences of any given word in a book.
// What if we were running this algorithm multiple times?
//
// Example:
//   WordsFrequency(["i", "have", "an", "apple", "he", "have", "a", "pen"])
//   get("you") -> 0
//   get("have") -> 2
//   get("an") -> 1
//   get("apple") -> 1
//
// Constraints:
//   - There are only lowercase letters in book[i].
//   - 1 <= book.length <= 100000
//   - 1 <= book[i].length <= 10
//   - get will not take words that are not in book.

export function wordFrequencies(document: string): Map<string, number> {
  const freqMap = new Map<string, number>();

  const words = document
    .toLowerCase()
    .replace(/[^\w\s]/g, '') // Remove punctuation (non-word, non-space chars)
    .split(/\s+/); // Split by whitespace

  for (const word of words) {
    if (word.length === 0) continue;
    freqMap.set(word, (freqMap.get(word) ?? 0) + 1);
  }

  return freqMap;
}
