// 10.2: Group Anagrams
//
// Write a method to sort an array of strings so that all the anagrams are next to each other.
// An anagram is a word formed by rearranging the letters of another word.
//
// Example:
// Input: ["bat", "tab", "tap", "pat", "cat"]
// Output: ["bat", "tab", "tap", "pat", "cat"] (anagrams grouped together, order within group doesn't matter)

export function groupAnagrams(words: string[]): string[] {
  const map = new Map<string, string[]>();

  for (const word of words) {
    const key = word.split('').sort().join('');

    if (!map.has(key)) {
      map.set(key, []);
    }
    map.get(key)!.push(word);
  }

  return Array.from(map.values()).flat();
}
