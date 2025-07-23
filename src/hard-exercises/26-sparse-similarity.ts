// 17.26. Sparse Similarity
//
// Problem:
// The similarity of two documents is defined as the size of the intersection divided by the size of the union.
// Each document has a unique ID (by index in input) and consists of a set of distinct words (represented as numbers).
// Because similarities are sparse, we only return pairs of document IDs with non-zero similarity.
//
// Input: docs: number[][]
// Output: string[] formatted as "{id1},{id2}: {similarity}" (rounded to 4 decimal places)

export function sparseSimilarity(docs: number[][]): string[] {
  const invertedIndex = new Map<number, number[]>(); // word -> list of document IDs
  const result: string[] = [];
  const pairIntersections = new Map<string, number>(); // "i,j" -> count

  // Build inverted index
  for (let docId = 0; docId < docs.length; docId++) {
    for (const word of docs[docId]) {
      if (!invertedIndex.has(word)) invertedIndex.set(word, []);
      invertedIndex.get(word)!.push(docId);
    }
  }

  // Count intersections for each document pair
  for (const docIds of invertedIndex.values()) {
    for (let i = 0; i < docIds.length; i++) {
      for (let j = i + 1; j < docIds.length; j++) {
        const [a, b] = [docIds[i], docIds[j]];
        const key = `${a},${b}`;
        pairIntersections.set(key, (pairIntersections.get(key) || 0) + 1);
      }
    }
  }

  // Compute similarities
  for (const [key, intersectionSize] of pairIntersections) {
    const [id1, id2] = key.split(',').map(Number);
    const unionSize = new Set([...docs[id1], ...docs[id2]]).size;
    const similarity = intersectionSize / unionSize;
    if (similarity > 0) {
      result.push(`${id1},${id2}: ${similarity.toFixed(4)}`);
    }
  }

  return result;
}
