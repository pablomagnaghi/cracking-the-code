import { insertBits } from '../../src/bit-manipulation/01-insertion';

describe('insertBits', () => {
  test('inserts M into N between bits i and j correctly', () => {
    const N = 0b10000000000; // 1024 decimal
    const M = 0b10011; // 19 decimal
    const i = 2;
    const j = 6;

    const result = insertBits(N, M, i, j);

    // Expected binary: 10001001100 (decimal 1100)
    expect(result).toBe(0b10001001100);
  });

  test('inserts M at different bit positions', () => {
    const N = 0b11111111111; // 2047 decimal
    const M = 0b0; // 0 decimal
    const i = 3;
    const j = 5;

    const result = insertBits(N, M, i, j);

    // Clearing bits 3 to 5 in N, expected binary: 11110001111 (decimal 1935)
    expect(result).toBe(0b11111000111);
  });

  test('handles insertion when M fills the entire segment', () => {
    const N = 0b0; // 0 decimal
    const M = 0b111; // 7 decimal
    const i = 0;
    const j = 2;

    const result = insertBits(N, M, i, j);

    // M inserted from bit 0 to 2: expected binary 111 (decimal 7)
    expect(result).toBe(0b111);
  });

  test('inserts M = 11111 into N = 0 from bit 0 to 4', () => {
    expect(insertBits(0, 0b11111, 0, 4)).toBe(0b11111);
  });

  test('inserts M into higher bit positions', () => {
    // N = 0xFF00 (1111111100000000), M = 0b1010, i = 4, j = 7
    const result = insertBits(0xff00, 0b1010, 4, 7);
    // Clear bits 4-7 of 0xFF00: 0xFF00 & ~0xF0 = 0xFF00 & 0xFFFFFF0F = 0xFF00
    // (bits 4-7 are already 0 in 0xFF00), then OR with 0b1010 << 4 = 0xA0
    expect(result).toBe(0xff00 | 0xa0);
  });
});
