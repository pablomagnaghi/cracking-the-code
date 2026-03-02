// LCCI 16.15. Master Mind
//
// The Game of Master Mind is played as follows:
// The computer has four slots, and each slot will contain a ball that is red (R),
// yellow (Y), green (G) or blue (B). The player guesses the solution and is told
// the number of hits and pseudo-hits.
//   - "Hit": correct color in the correct slot.
//   - "Pseudo-hit": correct color but in the wrong slot.
// (A color can only be counted as a pseudo-hit if it is not already a hit.)
//
// Example:
//   Input: solution = "RGBY", guess = "GGRR"
//   Output: [1, 1] (1 hit, 1 pseudo-hit)
//
// Constraints:
//   - len(googled) == len(solution) == 4
//   - Only characters "R", "G", "B", "Y" are used.

export interface MasterMindResult {
  hits: number;
  pseudoHits: number;
}

export function masterMind(secret: string, guess: string): MasterMindResult {
  if (secret.length !== guess.length) {
    throw new Error('Secret and guess must be the same length');
  }

  let hits = 0;
  let pseudoHits = 0;

  const secretCounts: Record<string, number> = {};
  const guessCounts: Record<string, number> = {};

  // First pass: count hits and track unmatched chars
  for (let i = 0; i < secret.length; i++) {
    if (secret[i] === guess[i]) {
      hits++;
    } else {
      secretCounts[secret[i]] = (secretCounts[secret[i]] || 0) + 1;
      guessCounts[guess[i]] = (guessCounts[guess[i]] || 0) + 1;
    }
  }

  // Calculate pseudo-hits
  for (const char in guessCounts) {
    if (secretCounts[char]) {
      pseudoHits += Math.min(secretCounts[char], guessCounts[char]);
    }
  }

  return { hits, pseudoHits };
}
