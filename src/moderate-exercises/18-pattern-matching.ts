// LCCI 16.18. Pattern Matching
//
// You are given two strings, pattern and value. The pattern string consists of
// just the letters a and b, describing a pattern within a string. Determine if
// the value string follows this pattern. For example, "catcatgocatgo" matches
// pattern "aabab" (with a="cat" and b="go"). A pattern of "a" or "b" can
// represent an empty string.
//
// Example 1:
//   Input: pattern = "abba", value = "dogcatcatdog"
//   Output: true
//
// Example 2:
//   Input: pattern = "abba", value = "dogcatcatfish"
//   Output: false
//
// Example 3:
//   Input: pattern = "abba", value = "dogdogdogdog"
//   Output: true (a="dogdog", b="" or vice versa)
//
// Constraints:
//   - 0 <= len(pattern) <= 1000
//   - 0 <= len(value) <= 1000
//   - pattern only contains "a" and "b", value only lowercase letters.

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
