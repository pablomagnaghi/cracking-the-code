import { groupAnagrams } from '../../src/sorting-and-searching/02-group-anagrams';

describe('groupAnagrams', () => {
  it('should group basic anagrams together', () => {
    const input = ['bat', 'tab', 'tap', 'pat', 'cat'];
    const output = groupAnagrams(input);

    // Convert result into sets to compare ignoring order
    const normalize = (arr: string[]) => arr.map((w) => w.split('').sort().join('')).sort();

    expect(normalize(output)).toEqual(normalize(input));
  });

  it('should handle words with no anagrams', () => {
    const input = ['apple', 'banana', 'cherry'];
    const output = groupAnagrams(input);
    expect(output.sort()).toEqual(['apple', 'banana', 'cherry']);
  });

  it('should handle mixed case and duplicates', () => {
    const input = ['listen', 'silent', 'enlist', 'Listen'];
    const output = groupAnagrams(input);

    const groups = output.reduce((acc: Record<string, string[]>, word) => {
      const key = word.toLowerCase().split('').sort().join('');
      if (!acc[key]) acc[key] = [];
      acc[key].push(word);
      return acc;
    }, {});

    expect(Object.values(groups).some((group) => group.length >= 3)).toBe(true);
  });

  it('should return an empty array for empty input', () => {
    expect(groupAnagrams([])).toEqual([]);
  });

  it('should handle single word input', () => {
    expect(groupAnagrams(['solo'])).toEqual(['solo']);
  });

  it('should group LCCI example: eat/tea/tan/ate/nat/bat', () => {
    const input = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat'];
    const output = groupAnagrams(input);

    // Verify anagrams are adjacent by checking sorted character keys form contiguous groups
    const keys = output.map((w) => w.split('').sort().join(''));
    const groups = new Set<string>();
    let lastKey = '';
    for (const key of keys) {
      if (key !== lastKey) {
        expect(groups.has(key)).toBe(false); // Should not revisit a group
        groups.add(key);
        lastKey = key;
      }
    }
    expect(groups.size).toBe(3); // "aet", "ant", "abt"
  });

  it('should keep all words with identical letters together', () => {
    const input = ['abc', 'cba', 'bca', 'xyz', 'zyx'];
    const output = groupAnagrams(input);
    const abcIdx = output.map((w) => w.split('').sort().join('')).indexOf('abc');
    // All 3 abc-anagrams should be contiguous
    expect(output.slice(abcIdx, abcIdx + 3).every((w) => w.split('').sort().join('') === 'abc')).toBe(true);
  });
});
