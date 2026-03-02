// 12.05. Shallow vs Deep Copy
//
// What is the difference between deep copy and shallow copy? Explain how
// you would use each.
//
// A shallow copy duplicates the top-level structure but shares references
// to nested objects. Modifying a nested object in the copy also affects the
// original. A deep copy recursively duplicates every level, producing a
// fully independent clone.
//
// Adapted: implement shallowCopy and deepCopy utility functions in TypeScript.
//
// Approach:
//   - shallowCopy: use Object.assign or spread to copy own enumerable
//     properties at the first level. Arrays are spread into a new array.
//   - deepCopy: recursively clone objects and arrays. Handle primitives,
//     null, Date, RegExp, Map, Set, and plain objects/arrays. Circular
//     references are detected using a WeakMap.
//
// Example:
//   const a = { x: 1, nested: { y: 2 } };
//   const b = shallowCopy(a);
//   b.nested.y = 99; // a.nested.y is also 99
//   const c = deepCopy(a);
//   c.nested.y = 42; // a.nested.y is unaffected
//
// Constraints:
//   - Functions and symbols inside objects are not cloned (copied by reference).
//   - Circular references are supported in deepCopy.

export function shallowCopy<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    return [...obj] as unknown as T;
  }

  return Object.assign({}, obj);
}

export function deepCopy<T>(obj: T, seen: WeakMap<object, unknown> = new WeakMap()): T {
  // Primitives and null
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // Circular reference check
  if (seen.has(obj as object)) {
    return seen.get(obj as object) as T;
  }

  // Date
  if (obj instanceof Date) {
    return new Date(obj.getTime()) as unknown as T;
  }

  // RegExp
  if (obj instanceof RegExp) {
    return new RegExp(obj.source, obj.flags) as unknown as T;
  }

  // Map
  if (obj instanceof Map) {
    const mapCopy = new Map();
    seen.set(obj as object, mapCopy);
    obj.forEach((value, key) => {
      mapCopy.set(deepCopy(key, seen), deepCopy(value, seen));
    });
    return mapCopy as unknown as T;
  }

  // Set
  if (obj instanceof Set) {
    const setCopy = new Set();
    seen.set(obj as object, setCopy);
    obj.forEach((value) => {
      setCopy.add(deepCopy(value, seen));
    });
    return setCopy as unknown as T;
  }

  // Array
  if (Array.isArray(obj)) {
    const arrCopy: unknown[] = [];
    seen.set(obj as object, arrCopy);
    for (const item of obj) {
      arrCopy.push(deepCopy(item, seen));
    }
    return arrCopy as unknown as T;
  }

  // Plain object
  const objCopy: Record<string, unknown> = {};
  seen.set(obj as object, objCopy);
  for (const key of Object.keys(obj)) {
    objCopy[key] = deepCopy((obj as Record<string, unknown>)[key], seen);
  }

  return objCopy as unknown as T;
}
