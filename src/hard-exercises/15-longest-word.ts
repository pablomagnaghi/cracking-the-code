// 17.15 Longest Word
//
// Problem:
// Given a list of words, write a method to find the longest word made of other words in the list.
//
// Example:
// Input: ['cat', 'banana', 'dog', 'nana', 'walk', 'walker', 'dogwalker']
// Output: 'dogwalker' (because it is made of 'dog' + 'walker')

export function longestWord(words: string[]): string {
  const wordSet = new Set(words);
  let result = '';

  for (const word of words) {
    if (canBeFormedFromOtherWords(word, wordSet)) {
      if (word.length > result.length || (word.length === result.length && word < result)) {
        result = word;
      }
    }
  }

  return result;
}

// Determines if a word can be formed by other words in the set
function canBeFormedFromOtherWords(word: string, wordSet: Set<string>): boolean {
  return canForm(word, wordSet, true);
}

// Recursively checks if a word can be split into components in the set
function canForm(word: string, wordSet: Set<string>, isOriginal: boolean): boolean {
  if (!isOriginal && wordSet.has(word)) return true;

  for (let i = 1; i < word.length; i++) {
    const prefix = word.substring(0, i);
    const suffix = word.substring(i);

    if (wordSet.has(prefix) && canForm(suffix, wordSet, false)) {
      return true;
    }
  }

  return false;
}
