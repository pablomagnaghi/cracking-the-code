// LCCI 17.22. Word Transformer
//
// Given two words of equal length that are in a dictionary, write a method to
// transform one word into another word by changing only one letter at a time.
// The new word you get in each step must be in the dictionary.
//
// Example 1:
//   Input: beginWord = "hit", endWord = "cog",
//          wordList = ["hot","dot","dog","lot","log","cog"]
//   Output: ["hit","hot","dot","lot","log","cog"]
//
// Example 2:
//   Input: beginWord = "hit", endWord = "cog",
//          wordList = ["hot","dot","dog","lot","log"]
//   Output: []  (endWord "cog" is not in the word list)

export function wordTransformerSequence(
  start: string,
  end: string,
  dictionary: Set<string>
): string[] {
  if (start === end) return [start];
  if (start.length !== end.length) return [];
  if (!dictionary.has(start) || !dictionary.has(end)) return [];

  const queue: string[] = [start];
  const visited = new Set<string>([start]);
  const parents = new Map<string, string>(); // to reconstruct path

  while (queue.length) {
    const word = queue.shift()!;
    if (word === end) {
      // reconstruct path
      const path = [];
      let cur = end;
      while (cur) {
        path.push(cur);
        cur = parents.get(cur) || '';
        if (cur === '') break;
      }
      return path.reverse();
    }

    for (const neighbor of getNeighbors(word, dictionary)) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        parents.set(neighbor, word);
        queue.push(neighbor);
      }
    }
  }

  return [];
}

function getNeighbors(word: string, dictionary: Set<string>): string[] {
  const neighbors: string[] = [];
  const chars = word.split('');

  for (let i = 0; i < chars.length; i++) {
    const originalChar = chars[i];
    for (let c = 97; c <= 122; c++) {
      const newChar = String.fromCharCode(c);
      if (newChar === originalChar) continue;

      chars[i] = newChar;
      const newWord = chars.join('');
      if (dictionary.has(newWord)) neighbors.push(newWord);
    }
    chars[i] = originalChar;
  }
  return neighbors;
}
