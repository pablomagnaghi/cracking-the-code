// LCCI 17.11. Find Closest
//
// You have a large text file containing words. Given any two words, find the
// shortest distance (in terms of number of words) between them in the file.
// If the operation will be called multiple times for the same file (but
// different pairs of words), can you optimize your solution?
//
// Example:
//   Input: words = ["I","am","a","student","from","a","university","in","a","city"],
//          word1 = "a", word2 = "student"
//   Output: 1
//
// Constraints:
//   - words.length <= 100000

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
