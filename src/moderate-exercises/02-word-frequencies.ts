// 16.2. Word Frequencies
//
// Given a large document (string), count the frequency of each word in the document.
// Ignore punctuation and case differences.

export function wordFrequencies(document: string): Map<string, number> {
  const freqMap = new Map<string, number>();

  const words = document
    .toLowerCase()
    .replace(/[^\w\s]/g, '') // Remove punctuation (non-word, non-space chars)
    .split(/\s+/); // Split by whitespace

  for (const word of words) {
    if (word.length === 0) continue;
    freqMap.set(word, (freqMap.get(word) ?? 0) + 1);
  }

  return freqMap;
}
