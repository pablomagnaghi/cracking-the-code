// 12.11. 2D Alloc
//
// Write a function in C to allocate a 2D array. Minimize the number of
// calls to malloc and make sure that the memory is accessible by the
// notation arr[i][j].
//
// In C, the key insight is to allocate a single contiguous block for both
// the row pointers and the data, so you only call malloc once (or twice
// at most). The row pointers are set to point into the correct offsets
// within the data block.
//
// Adapted: implement efficient 2D array allocation in TypeScript. While
// TypeScript does not expose raw memory, we simulate the single-allocation
// approach by backing the 2D array with a single flat Float64Array and
// providing row accessors that index into the correct region.
//
// Approach:
//   - alloc2D(rows, cols): allocate a single flat array of size rows * cols.
//     Create row views (number[][]) where each row[i] is a proxy or
//     sub-array referencing the flat storage at offset i * cols.
//   - For simplicity, also provide a straightforward version that returns
//     a standard number[][] initialized to zeros.
//
// Example:
//   const arr = alloc2D(3, 4);
//   arr[1][2] = 5;
//   arr[1][2]; // 5
//
// Constraints:
//   - rows and cols must be positive integers.
//   - The array is initialized to zeros.

/**
 * Allocates a 2D array backed by a single contiguous Float64Array.
 * This minimizes allocations (analogous to a single malloc in C).
 * Row access is via Proxy objects that index into the flat buffer.
 */
export function alloc2D(rows: number, cols: number): number[][] {
  if (rows <= 0 || cols <= 0) {
    throw new Error('Rows and cols must be positive');
  }

  const buffer = new Float64Array(rows * cols); // single allocation, initialized to 0

  const result: number[][] = new Array(rows);
  for (let i = 0; i < rows; i++) {
    const rowOffset = i * cols;
    // Create a proxy that reads/writes from the flat buffer
    result[i] = new Proxy([] as number[], {
      get(_target, prop) {
        if (prop === 'length') return cols;
        if (typeof prop === 'string') {
          const index = Number(prop);
          if (!isNaN(index) && index >= 0 && index < cols) {
            return buffer[rowOffset + index];
          }
        }
        if (prop === Symbol.iterator) {
          return function* () {
            for (let j = 0; j < cols; j++) {
              yield buffer[rowOffset + j];
            }
          };
        }
        return undefined;
      },
      set(_target, prop, value) {
        if (typeof prop === 'string') {
          const index = Number(prop);
          if (!isNaN(index) && index >= 0 && index < cols) {
            buffer[rowOffset + index] = value;
            return true;
          }
        }
        return false;
      },
    });
  }

  return result;
}

/**
 * Conceptual free. In C, this would call free() on the allocated block.
 * In TypeScript, the garbage collector handles deallocation, but we
 * provide this for API completeness. It clears the reference.
 */
export function free2D(arr: number[][] | null): null {
  // In TypeScript, setting references to null allows GC to reclaim.
  // In C, this would call free(arr) on the original malloc'd block.
  return null;
}

/**
 * Returns the underlying flat buffer for inspection/testing.
 * This demonstrates that a single contiguous allocation backs the 2D array.
 */
export function alloc2DWithBuffer(
  rows: number,
  cols: number,
): { array: number[][]; buffer: Float64Array } {
  if (rows <= 0 || cols <= 0) {
    throw new Error('Rows and cols must be positive');
  }

  const buffer = new Float64Array(rows * cols);

  const array: number[][] = new Array(rows);
  for (let i = 0; i < rows; i++) {
    const rowOffset = i * cols;
    array[i] = new Proxy([] as number[], {
      get(_target, prop) {
        if (prop === 'length') return cols;
        if (typeof prop === 'string') {
          const index = Number(prop);
          if (!isNaN(index) && index >= 0 && index < cols) {
            return buffer[rowOffset + index];
          }
        }
        if (prop === Symbol.iterator) {
          return function* () {
            for (let j = 0; j < cols; j++) {
              yield buffer[rowOffset + j];
            }
          };
        }
        return undefined;
      },
      set(_target, prop, value) {
        if (typeof prop === 'string') {
          const index = Number(prop);
          if (!isNaN(index) && index >= 0 && index < cols) {
            buffer[rowOffset + index] = value;
            return true;
          }
        }
        return false;
      },
    });
  }

  return { array, buffer };
}
