// 17.11 Word Distance
//
// Problem:
// Given a list of words and two words word1 and word2, find the shortest distance (in indices) between these two words in the list.
//
// For example:
// Input: words = ["practice", "makes", "perfect", "coding", "makes"], word1 = "coding", word2 = "practice"
// Output: 3

export function shortestWordDistance(words: string[], word1: string, word2: string): number {
  let index1 = -1;
  let index2 = -1;
  let minDistance = Infinity;

  for (let i = 0; i < words.length; i++) {
    if (words[i] === word1) {
      index1 = i;
    }
    if (words[i] === word2) {
      index2 = i;
    }

    if (index1 !== -1 && index2 !== -1) {
      minDistance = Math.min(minDistance, Math.abs(index1 - index2));
    }
  }

  return minDistance === Infinity ? -1 : minDistance;
}
