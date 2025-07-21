// 16.3. Intersection
//
// Given two arrays, compute their intersection. Return the values present in both arrays.

export function intersection(array1: number[], array2: number[]): number[] {
  const elementsInFirst = new Set(array1);
  const intersectionSet = new Set<number>();

  for (const element of array2) {
    if (elementsInFirst.has(element)) {
      intersectionSet.add(element);
    }
  }

  return Array.from(intersectionSet);
}
