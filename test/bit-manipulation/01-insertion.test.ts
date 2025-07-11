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
});
