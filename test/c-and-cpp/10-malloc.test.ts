import { AlignedAllocator } from '../../src/c-and-cpp/10-malloc';

describe('AlignedAllocator', () => {
  test('alloc returns an aligned offset', () => {
    const allocator = new AlignedAllocator(1024);
    const offset = allocator.alloc(64, 16);
    expect(offset % 16).toBe(0);
  });

  test('alloc with alignment 1 starts at 0', () => {
    const allocator = new AlignedAllocator(256);
    const offset = allocator.alloc(10, 1);
    expect(offset).toBe(0);
  });

  test('multiple allocations are all properly aligned', () => {
    const allocator = new AlignedAllocator(4096);
    const offsets: number[] = [];
    for (let i = 0; i < 10; i++) {
      const offset = allocator.alloc(32, 64);
      expect(offset).not.toBe(-1);
      expect(offset % 64).toBe(0);
      offsets.push(offset);
    }
    // All offsets should be unique
    expect(new Set(offsets).size).toBe(10);
  });

  test('alloc returns -1 when out of space', () => {
    const allocator = new AlignedAllocator(64);
    allocator.alloc(60, 1);
    const offset = allocator.alloc(10, 1);
    expect(offset).toBe(-1);
  });

  test('free removes an allocation', () => {
    const allocator = new AlignedAllocator(1024);
    const offset = allocator.alloc(32, 16);
    expect(allocator.allocationCount()).toBe(1);
    expect(allocator.free(offset)).toBe(true);
    expect(allocator.allocationCount()).toBe(0);
  });

  test('free returns false for unknown offset', () => {
    const allocator = new AlignedAllocator(256);
    expect(allocator.free(999)).toBe(false);
  });

  test('write and read through the allocator', () => {
    const allocator = new AlignedAllocator(256);
    const offset = allocator.alloc(8, 8);
    allocator.write(offset, 42);
    allocator.write(offset + 1, 99);
    expect(allocator.read(offset)).toBe(42);
    expect(allocator.read(offset + 1)).toBe(99);
  });

  test('throws on non-power-of-two alignment', () => {
    const allocator = new AlignedAllocator(256);
    expect(() => allocator.alloc(10, 3)).toThrow('Alignment must be a power of two');
    expect(() => allocator.alloc(10, 6)).toThrow('Alignment must be a power of two');
  });

  test('throws on non-positive size', () => {
    const allocator = new AlignedAllocator(256);
    expect(() => allocator.alloc(0, 4)).toThrow('Size must be positive');
    expect(() => allocator.alloc(-1, 4)).toThrow('Size must be positive');
  });

  test('large alignment works correctly', () => {
    const allocator = new AlignedAllocator(4096);
    const offset = allocator.alloc(128, 256);
    expect(offset % 256).toBe(0);
    expect(offset).not.toBe(-1);
  });
});
