// 7.Permutations without Dups
//
// Write a method to compute all permutations of a string of unique characters.

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
