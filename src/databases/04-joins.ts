// 14.04. Joins
//
// What are the different types of joins? Explain how they differ and why
// certain types are better in certain situations. Adapted: implement inner
// join, left join, right join, and full outer join as generic TypeScript
// functions operating on arrays.
//
// Approach:
//   Each join function takes two arrays (left and right), key extractors for
//   each side, and a merge function to combine matched rows.
//   - innerJoin: returns only rows where keys match in both sides.
//   - leftJoin: returns all left rows; matched right rows are merged,
//     unmatched left rows get null for the right side.
//   - rightJoin: returns all right rows; matched left rows are merged,
//     unmatched right rows get null for the left side.
//   - fullOuterJoin: returns all rows from both sides; unmatched rows from
//     either side appear with null for the missing side.
//
// Example:
//   innerJoin([{id:1,name:'A'}], [{id:1,val:10}], l=>l.id, r=>r.id, merge)
//   => [{id:1, name:'A', val:10}]
//
// Constraints:
//   - Keys are compared using strict equality on their string representation.
//   - Multiple matches produce multiple output rows (cross product per key).
//   - Order: left rows appear in original order, then unmatched right rows.

export function innerJoin<L, R, K extends string | number>(
  left: L[],
  right: R[],
  leftKey: (item: L) => K,
  rightKey: (item: R) => K,
  merge: (left: L, right: R) => Record<string, unknown>
): Record<string, unknown>[] {
  // Index right side by key
  const rightIndex = new Map<K, R[]>();
  for (const r of right) {
    const key = rightKey(r);
    if (!rightIndex.has(key)) {
      rightIndex.set(key, []);
    }
    rightIndex.get(key)!.push(r);
  }

  const result: Record<string, unknown>[] = [];
  for (const l of left) {
    const key = leftKey(l);
    const matches = rightIndex.get(key);
    if (matches) {
      for (const r of matches) {
        result.push(merge(l, r));
      }
    }
  }

  return result;
}

export function leftJoin<L, R, K extends string | number>(
  left: L[],
  right: R[],
  leftKey: (item: L) => K,
  rightKey: (item: R) => K,
  merge: (left: L, right: R | null) => Record<string, unknown>
): Record<string, unknown>[] {
  const rightIndex = new Map<K, R[]>();
  for (const r of right) {
    const key = rightKey(r);
    if (!rightIndex.has(key)) {
      rightIndex.set(key, []);
    }
    rightIndex.get(key)!.push(r);
  }

  const result: Record<string, unknown>[] = [];
  for (const l of left) {
    const key = leftKey(l);
    const matches = rightIndex.get(key);
    if (matches && matches.length > 0) {
      for (const r of matches) {
        result.push(merge(l, r));
      }
    } else {
      result.push(merge(l, null));
    }
  }

  return result;
}

export function rightJoin<L, R, K extends string | number>(
  left: L[],
  right: R[],
  leftKey: (item: L) => K,
  rightKey: (item: R) => K,
  merge: (left: L | null, right: R) => Record<string, unknown>
): Record<string, unknown>[] {
  const leftIndex = new Map<K, L[]>();
  for (const l of left) {
    const key = leftKey(l);
    if (!leftIndex.has(key)) {
      leftIndex.set(key, []);
    }
    leftIndex.get(key)!.push(l);
  }

  const result: Record<string, unknown>[] = [];
  for (const r of right) {
    const key = rightKey(r);
    const matches = leftIndex.get(key);
    if (matches && matches.length > 0) {
      for (const l of matches) {
        result.push(merge(l, r));
      }
    } else {
      result.push(merge(null, r));
    }
  }

  return result;
}

export function fullOuterJoin<L, R, K extends string | number>(
  left: L[],
  right: R[],
  leftKey: (item: L) => K,
  rightKey: (item: R) => K,
  merge: (left: L | null, right: R | null) => Record<string, unknown>
): Record<string, unknown>[] {
  const rightIndex = new Map<K, R[]>();
  for (const r of right) {
    const key = rightKey(r);
    if (!rightIndex.has(key)) {
      rightIndex.set(key, []);
    }
    rightIndex.get(key)!.push(r);
  }

  const matchedRightKeys = new Set<K>();
  const result: Record<string, unknown>[] = [];

  // Process all left rows
  for (const l of left) {
    const key = leftKey(l);
    const matches = rightIndex.get(key);
    if (matches && matches.length > 0) {
      matchedRightKeys.add(key);
      for (const r of matches) {
        result.push(merge(l, r));
      }
    } else {
      result.push(merge(l, null));
    }
  }

  // Process unmatched right rows
  for (const r of right) {
    const key = rightKey(r);
    if (!matchedRightKeys.has(key)) {
      result.push(merge(null, r));
    }
  }

  return result;
}
