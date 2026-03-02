import { alloc2D, free2D, alloc2DWithBuffer } from '../../src/c-and-cpp/11-2d-alloc';

describe('alloc2D', () => {
  test('allocates a 3x4 array initialized to zeros', () => {
    const arr = alloc2D(3, 4);
    expect(arr.length).toBe(3);
    for (let i = 0; i < 3; i++) {
      expect(arr[i].length).toBe(4);
      for (let j = 0; j < 4; j++) {
        expect(arr[i][j]).toBe(0);
      }
    }
  });

  test('read and write values using arr[i][j]', () => {
    const arr = alloc2D(2, 3);
    arr[0][0] = 1;
    arr[0][2] = 3;
    arr[1][1] = 5;
    expect(arr[0][0]).toBe(1);
    expect(arr[0][2]).toBe(3);
    expect(arr[1][1]).toBe(5);
    expect(arr[0][1]).toBe(0); // untouched cell
  });

  test('1x1 array works', () => {
    const arr = alloc2D(1, 1);
    arr[0][0] = 42;
    expect(arr[0][0]).toBe(42);
  });

  test('large array works', () => {
    const arr = alloc2D(100, 200);
    arr[99][199] = 7.5;
    expect(arr[99][199]).toBe(7.5);
    expect(arr[0][0]).toBe(0);
  });

  test('throws for non-positive dimensions', () => {
    expect(() => alloc2D(0, 5)).toThrow('Rows and cols must be positive');
    expect(() => alloc2D(3, 0)).toThrow('Rows and cols must be positive');
    expect(() => alloc2D(-1, 5)).toThrow('Rows and cols must be positive');
  });

  test('rows are independent (modifying one does not affect another)', () => {
    const arr = alloc2D(3, 3);
    arr[0][0] = 10;
    arr[1][0] = 20;
    arr[2][0] = 30;
    expect(arr[0][0]).toBe(10);
    expect(arr[1][0]).toBe(20);
    expect(arr[2][0]).toBe(30);
  });
});

describe('alloc2DWithBuffer', () => {
  test('backed by a single contiguous buffer', () => {
    const { array, buffer } = alloc2DWithBuffer(2, 3);
    expect(buffer.length).toBe(6); // 2 * 3

    array[0][0] = 1;
    array[0][1] = 2;
    array[0][2] = 3;
    array[1][0] = 4;
    array[1][1] = 5;
    array[1][2] = 6;

    // Buffer should have [1, 2, 3, 4, 5, 6]
    expect(Array.from(buffer)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('modifying buffer reflects in the 2D array', () => {
    const { array, buffer } = alloc2DWithBuffer(2, 2);
    buffer[0] = 10; // arr[0][0]
    buffer[3] = 40; // arr[1][1]
    expect(array[0][0]).toBe(10);
    expect(array[1][1]).toBe(40);
  });
});

describe('free2D', () => {
  test('returns null', () => {
    const arr = alloc2D(2, 2);
    expect(free2D(arr)).toBeNull();
  });

  test('accepts null input', () => {
    expect(free2D(null)).toBeNull();
  });
});
