// LCCI 17.17. Multi Search
//
// Given a string band an array of smaller strings T, design a method to search
// b for each small string in T. Output positions of each small string in b.
//
// Example:
//   Input: big = "mississippi", smalls = ["is","ppi","hi","sis","i","ssippi"]
//   Output: [[1,4],[8],[],[3],[1,4,7,10],[5]]
//
// Constraints:
//   - 0 <= len(googlebig) <= 1000
//   - 0 <= len(smalls[i]) <= 1000
//   - Total characters across all smalls <= 100000
//   - No duplicate strings in smalls.
//   - All characters are lowercase letters.

export function multiSearch(big: string, smalls: string[]): Record<string, number[]> {
  const result: Record<string, number[]> = {};
  for (const small of smalls) {
    result[small] = [];
    let startIndex = 0;
    while (true) {
      const index = big.indexOf(small, startIndex);
      if (index === -1) break;
      result[small].push(index);
      startIndex = index + 1;
    }
  }
  return result;
}
