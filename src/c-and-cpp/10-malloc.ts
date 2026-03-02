// 12.10. Malloc
//
// Write an aligned malloc and free function in C. The aligned_malloc
// function takes a required size and alignment, allocates a block of
// memory, and returns a pointer that is a multiple of the alignment.
// The aligned_free function frees the memory.
//
// Adapted: implement an aligned memory allocator simulation using
// ArrayBuffer. We simulate raw memory allocation where the returned
// offset within the buffer is guaranteed to be a multiple of the
// requested alignment.
//
// Approach:
//   - Maintain an internal ArrayBuffer as the memory pool.
//   - alloc(size, alignment): find the next offset that is a multiple
//     of the alignment. Record the allocation's actual start and aligned
//     start so that free() can reclaim the right region.
//   - free(alignedOffset): remove the allocation record.
//   - The alignment must be a power of two.
//
// Example:
//   const allocator = new AlignedAllocator(1024);
//   const offset = allocator.alloc(64, 16); // offset is a multiple of 16
//   allocator.free(offset);
//
// Constraints:
//   - Alignment must be a power of two.
//   - The allocator has a fixed-size memory pool.
//   - alloc returns -1 if there is not enough space.

interface Allocation {
  alignedOffset: number;
  rawOffset: number;
  size: number;
}

export class AlignedAllocator {
  private buffer: ArrayBuffer;
  private view: Uint8Array;
  private nextFreeOffset: number = 0;
  private allocations: Map<number, Allocation> = new Map();
  private totalSize: number;

  constructor(totalSize: number) {
    this.totalSize = totalSize;
    this.buffer = new ArrayBuffer(totalSize);
    this.view = new Uint8Array(this.buffer);
  }

  /**
   * Allocate `size` bytes with the given alignment.
   * Returns the aligned offset, or -1 if not enough space.
   */
  alloc(size: number, alignment: number): number {
    if (!this.isPowerOfTwo(alignment)) {
      throw new Error('Alignment must be a power of two');
    }

    if (size <= 0) {
      throw new Error('Size must be positive');
    }

    const rawOffset = this.nextFreeOffset;

    // Compute aligned offset: round up to the nearest multiple of alignment
    const alignedOffset = (rawOffset + alignment - 1) & ~(alignment - 1);

    const totalNeeded = alignedOffset + size;
    if (totalNeeded > this.totalSize) {
      return -1; // not enough space
    }

    this.allocations.set(alignedOffset, {
      alignedOffset,
      rawOffset,
      size,
    });

    this.nextFreeOffset = alignedOffset + size;

    return alignedOffset;
  }

  /**
   * Free a previously allocated block by its aligned offset.
   */
  free(alignedOffset: number): boolean {
    if (!this.allocations.has(alignedOffset)) {
      return false;
    }

    this.allocations.delete(alignedOffset);
    return true;
  }

  /**
   * Read a byte at the given offset (for testing purposes).
   */
  read(offset: number): number {
    return this.view[offset];
  }

  /**
   * Write a byte at the given offset (for testing purposes).
   */
  write(offset: number, value: number): void {
    this.view[offset] = value;
  }

  /**
   * Returns the number of active allocations.
   */
  allocationCount(): number {
    return this.allocations.size;
  }

  private isPowerOfTwo(n: number): boolean {
    return n > 0 && (n & (n - 1)) === 0;
  }
}
