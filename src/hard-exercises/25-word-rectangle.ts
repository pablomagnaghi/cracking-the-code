// LCCI 17.25. Word Rectangle
//
// Given a list of words, find the largest rectangle of letters such that every
// row forms a word (reading left to right) and every column forms a word
// (reading top to bottom). Words can be reused. All rows must have the same
// length and all columns must have the same height.
//
// Example 1:
//   Input: ["this","real","hard","trh","hea","iar","sld"]
//   Output: ["this","real","hard"]
//
// Example 2:
//   Input: ["aa"]
//   Output: ["aa","aa"]
//
// Constraints:
//   - words.length <= 1000
//   - words[i].length <= 100

class TrieNode {
  children: Map<string, TrieNode>;
  isWord: boolean;

  constructor() {
    this.children = new Map();
    this.isWord = false;
  }
}

class Trie {
  root: TrieNode = new TrieNode();

  insert(word: string): void {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) {
        node.children.set(ch, new TrieNode());
      }
      node = node.children.get(ch)!;
    }
    node.isWord = true;
  }

  startsWith(prefix: string): boolean {
    let node = this.root;
    for (const ch of prefix) {
      if (!node.children.has(ch)) return false;
      node = node.children.get(ch)!;
    }
    return true;
  }
}

function isValidPrefix(rectangle: string[], trie: Trie, width: number): boolean {
  for (let c = 0; c < width; c++) {
    let prefix = '';
    for (let r = 0; r < rectangle.length; r++) {
      prefix += rectangle[r][c];
    }
    if (!trie.startsWith(prefix)) return false;
  }
  return true;
}

function backtrack(
  wordList: string[],
  trie: Trie,
  rectangle: string[],
  height: number,
  width: number
): boolean {
  if (rectangle.length === height) return true;

  for (const candidate of wordList) {
    rectangle.push(candidate);

    if (isValidPrefix(rectangle, trie, width)) {
      if (backtrack(wordList, trie, rectangle, height, width)) return true;
    }

    rectangle.pop();
  }
  return false;
}

export function wordRectangle(words: string[]): string[] {
  const lengthGroups = new Map<number, string[]>();
  for (const w of words) {
    lengthGroups.set(w.length, (lengthGroups.get(w.length) || []).concat(w));
  }

  let maxArea = 0;
  let result: string[] = [];

  const lengths = Array.from(lengthGroups.keys()).sort((a, b) => b - a);

  for (const len of lengths) {
    const wordList = lengthGroups.get(len)!;
    const trie = new Trie();
    for (const w of wordList) trie.insert(w);

    for (let height = wordList.length; height > 0; height--) {
      if (height * len <= maxArea) break;

      const rectangle: string[] = [];

      if (backtrack(wordList, trie, rectangle, height, len)) {
        maxArea = height * len;
        result = [...rectangle];
        break;
      }
    }
  }

  return result;
}
