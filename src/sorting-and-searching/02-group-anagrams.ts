// LCCI 10.02. Group Anagrams
//
// Write a method to sort an array of strings so that all the anagrams are grouped together.
//
// Example:
//   Input: ["eat", "tea", "tan", "ate", "nat", "bat"]
//   Output: [["ate","eat","tea"], ["nat","tan"], ["bat"]]
//
// Note: All inputs will be in lowercase. The order of the output does not matter.

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
