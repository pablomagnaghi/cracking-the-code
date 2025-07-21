// 16.18 Pattern Matching
//
// Problem: Given a pattern string and a text string, check if the text
// matches the pattern, where pattern characters map to non-empty substrings
// in the text. Different pattern characters must map to different substrings.
//
// Approach:
// Use backtracking to try all possible mappings:
// - For each character in pattern, try all possible substrings in text.
// - Keep track of assigned mappings and ensure consistency.
// - If full pattern and text are matched, return true, else false.

export function patternMatching(pattern: string, text: string): boolean {
  return backtrack(pattern, 0, text, 0, new Map(), new Set());
}

function backtrack(
  pattern: string,
  pIndex: number,
  text: string,
  tIndex: number,
  mapping: Map<string, string>,
  used: Set<string>
): boolean {
  // If both pattern and text are fully matched
  if (pIndex === pattern.length && tIndex === text.length) return true;
  // If one is finished but not the other
  if (pIndex === pattern.length || tIndex === text.length) return false;

  const patternChar = pattern[pIndex];

  // If patternChar already has mapping, check consistency
  if (mapping.has(patternChar)) {
    const mappedStr = mapping.get(patternChar)!;
    if (text.startsWith(mappedStr, tIndex)) {
      return backtrack(pattern, pIndex + 1, text, tIndex + mappedStr.length, mapping, used);
    } else {
      return false;
    }
  }

  // Try all possible substrings for current pattern char
  for (let len = 1; tIndex + len <= text.length; len++) {
    const candidate = text.substring(tIndex, tIndex + len);

    if (used.has(candidate)) continue; // substring already used by another pattern char

    // Assign mapping and mark candidate as used
    mapping.set(patternChar, candidate);
    used.add(candidate);

    if (backtrack(pattern, pIndex + 1, text, tIndex + len, mapping, used)) {
      return true;
    }

    // Backtrack
    mapping.delete(patternChar);
    used.delete(candidate);
  }

  return false;
}
