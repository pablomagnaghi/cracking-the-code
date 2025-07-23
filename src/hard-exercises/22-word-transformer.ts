// 17.22 Word Transformer
//
// Given two words of equal length that are in the dictionary,
// return any one sequence of words starting with start and ending with end,
// changing only one letter at a time,
// and all intermediate words are in the dictionary.
// If no such sequence exists, return [].

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
