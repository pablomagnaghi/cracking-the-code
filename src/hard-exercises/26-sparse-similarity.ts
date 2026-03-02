// LCCI 17.26. Sparse Similarity
//
// The similarity of two documents (each with distinct words) is defined to be
// the size of the intersection divided by the size of the union. For example,
// if two documents consist of words {1, 5, 3} and {1, 7, 2, 3}, the
// intersection has 2 elements and the union has 5 elements, so similarity is
// 2/5 = 0.4. Compute similarities for all pairs of documents. Return only
// those with non-zero similarity. Output in format "{id1},{id2}: {similarity}"
// with similarity rounded to 4 decimal places and id1 < id2.
//
// Example:
//   Input: [[14,15,100,9,3],[32,1,9,3,5],[15,29,2,6,8,7],[7,10]]
//   Output: ["0,1: 0.2500","0,2: 0.1000","2,3: 0.1429"]
//
// Constraints:
//   - docs.length <= 500
//   - docs[i].length <= 500

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
