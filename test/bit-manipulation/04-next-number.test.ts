import { getNext, getPrev } from '../../src/bit-manipulation/04-next-number';

describe('Next Number (5.4)', () => {
  test('getNext and getPrev of 13948', () => {
    const input = 13948; // binary: 11011001111100
    const expectedNext = 13967; // binary: 11011010001111
    const expectedPrev = 13946; // binary: 11011001111010

    expect(getNext(input)).toBe(expectedNext);
    expect(getPrev(input)).toBe(expectedPrev);
  });

  test('getNext and getPrev of small number', () => {
    const input = 6; // binary: 110
    const expectedNext = 9; // binary: 1001
    const expectedPrev = 5; // binary: 101

    expect(getNext(input)).toBe(expectedNext);
    expect(getPrev(input)).toBe(expectedPrev);
  });

  test('getNext and getPrev of number with alternating bits', () => {
    const input = 0b101010; // 42
    const expectedNext = 0b101100; // 44
    const expectedPrev = 0b101001; // 41

    expect(getNext(input)).toBe(expectedNext);
    expect(getPrev(input)).toBe(expectedPrev);
  });

  test('getNext of number with all 1s at the end (no next)', () => {
    const input = 0b1111; // 15
    expect(getNext(input)).toBe(23); // binary: 10111
  });

  test('getPrev of smallest possible number (no prev)', () => {
    expect(getPrev(1)).toBeUndefined(); // binary: 1, no smaller number with same 1s
  });

  test('getNext and getPrev of powers of two', () => {
    const input = 8; // binary: 1000
    const expectedNext = 16; // binary: 10000
    const expectedPrev = 4; // binary: 100

    expect(getNext(input)).toBe(expectedNext);
    expect(getPrev(input)).toBe(expectedPrev);
  });
});
