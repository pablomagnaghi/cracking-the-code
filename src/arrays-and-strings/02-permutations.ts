// 2. *Check Permutation*:

// Given two strings, write a method to decide if one is a permutation of the other.

export function checkPermutations(s1: string, s2: string) {
  if (s1.length !== s2.length) return false;
  if (s1.length === 0) return true;

  const arr1 = s1.split('').sort();
  const arr2 = s2.split('').sort();

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }

  return true;
}

export function checkPermutationsWithHash(s1: string, s2: string) {
  if (s1.length !== s2.length) return false;
  if (s1.length === 0) return true;

  const charMap: Map<string, number> = new Map();
  const len = s1.length;

  for (let i = 0; i < len; i++) {
    const c = s1[i];
    charMap.set(c, (charMap.get(c) ?? 0) + 1);
  }

  for (let i = 0; i < len; i++) {
    const c = s2[i];
    const count = charMap.get(c);
    if (!count) return false;
    charMap.set(c, count - 1);
  }

  return true;
}
