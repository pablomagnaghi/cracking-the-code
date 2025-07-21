// 16.15 Master Mind
//
// Problem: Given a secret code and a guess (both strings), return the count of
// "hits" (correct character in correct position) and "pseudo-hits"
// (correct character in wrong position).
//
// Approach:
// 1. Iterate through secret and guess to count hits.
// 2. Track counts of characters in secret and guess for non-hit positions.
// 3. Calculate pseudo-hits based on minimum counts of matched characters.

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
