// 17.17 Multisearch
//
// Problem:
// Given a large string and an array of smaller strings,
// find all the starting indices in the big string where each small string appears.
//
// For example:
// big = "mississippi"
// smalls = ["is", "ppi", "hi", "sis", "i", "ssippi"]
// Output:
// {
//   is: [1, 4],
//   ppi: [8],
//   hi: [],
//   sis: [3],
//   i: [1, 4, 7, 10],
//   ssippi: [5]
// }

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
