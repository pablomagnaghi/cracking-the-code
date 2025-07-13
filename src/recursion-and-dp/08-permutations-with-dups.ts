// 8. Permutations with Dups*
//
// Write a method to compute all permutations of a string whose characters are not necessarily unique.
// The list of permutations should not have duplicates.

export function permutationsWithDups(input: string): string[] {
  const chars = input.split('').sort(); // Sort to easily skip duplicates
  const used = Array(chars.length).fill(false);
  const result: string[] = [];
  generatePermutationsWithDups(chars, '', used, result);
  return result;
}

function generatePermutationsWithDups(
  chars: string[],
  path: string,
  used: boolean[],
  result: string[]
): void {
  if (path.length === chars.length) {
    result.push(path);
    return;
  }

  for (let i = 0; i < chars.length; i++) {
    if (used[i]) continue;

    // Skip duplicate characters
    if (i > 0 && chars[i] === chars[i - 1] && !used[i - 1]) continue;

    used[i] = true;
    generatePermutationsWithDups(chars, path + chars[i], used, result);
    used[i] = false;
  }
}
