// LCCI 08.07. Permutation I
//
// Given a string S of unique characters, compute all permutations of the string.
//
// Example 1:
//   Input: S = "qwe"
//   Output: ["qwe","qew","wqe","weq","ewq","eqw"]
//
// Example 2:
//   Input: S = "ab"
//   Output: ["ab", "ba"]
//
// Constraints:
//   All characters are English letters.
//   1 <= S.length <= 9

export function permutationsWithoutDups(input: string): string[] {
  const used = Array(input.length).fill(false);
  const result: string[] = [];
  generatePermutationsNoDups(input, '', used, result);
  return result;
}

function generatePermutationsNoDups(
  input: string,
  path: string,
  used: boolean[],
  result: string[]
): void {
  if (path.length === input.length) {
    result.push(path);
    return;
  }

  for (let i = 0; i < input.length; i++) {
    if (used[i]) continue;

    used[i] = true;
    generatePermutationsNoDups(input, path + input[i], used, result);
    used[i] = false;
  }
}
