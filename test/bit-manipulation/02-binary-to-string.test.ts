import binaryToString from '../../src/bit-manipulation/02-binary-to-string';

describe('binaryToString', () => {
  test('converts simple binary fractions correctly', () => {
    expect(binaryToString(0.5)).toBe('0.1'); // 0.5 = 0.1 binary
    expect(binaryToString(0.25)).toBe('0.01'); // 0.25 = 0.01 binary
    expect(binaryToString(0.75)).toBe('0.11'); // 0.75 = 0.11 binary
    expect(binaryToString(0.125)).toBe('0.001'); // 0.125 = 0.001 binary
  });

  test('returns ERROR for numbers out of range', () => {
    expect(binaryToString(1)).toBe('ERROR'); // 1 is not between 0 and 1
    expect(binaryToString(0)).toBe('ERROR'); // 0 is not > 0
    expect(binaryToString(-0.5)).toBe('ERROR'); // negative number
    expect(binaryToString(1.5)).toBe('ERROR'); // > 1
  });

  test('returns ERROR for numbers that cannot be represented in 32 bits', () => {
    // Example: 0.1 decimal has an infinite binary representation
    expect(binaryToString(0.1)).toBe('ERROR');
    expect(binaryToString(0.3)).toBe('ERROR');
  });

  test('correctly converts a number with exact binary representation within limit', () => {
    // 0.0625 = 1/16 = 0.0001 binary
    expect(binaryToString(0.0625)).toBe('0.0001');
  });
});
