import { numberToWords } from '../../src/moderate-exercises/08-english-int'; // Update to match actual path

describe('numberToWords', () => {
  test('converts single digits', () => {
    expect(numberToWords(0)).toBe('Zero');
    expect(numberToWords(7)).toBe('Seven');
  });

  test('converts numbers below 20', () => {
    expect(numberToWords(13)).toBe('Thirteen');
    expect(numberToWords(19)).toBe('Nineteen');
  });

  test('converts tens', () => {
    expect(numberToWords(20)).toBe('Twenty');
    expect(numberToWords(42)).toBe('Forty Two');
    expect(numberToWords(99)).toBe('Ninety Nine');
  });

  test('converts hundreds', () => {
    expect(numberToWords(100)).toBe('One Hundred');
    expect(numberToWords(219)).toBe('Two Hundred Nineteen');
  });

  test('converts thousands', () => {
    expect(numberToWords(1000)).toBe('One Thousand');
    expect(numberToWords(1234)).toBe('One Thousand Two Hundred Thirty Four');
  });

  test('converts millions', () => {
    expect(numberToWords(1000000)).toBe('One Million');
    expect(numberToWords(1002345)).toBe('One Million Two Thousand Three Hundred Forty Five');
  });

  test('converts billions', () => {
    expect(numberToWords(1000000000)).toBe('One Billion');
    expect(numberToWords(2147483647)).toBe(
      'Two Billion One Hundred Forty Seven Million Four Hundred Eighty Three Thousand Six Hundred Forty Seven'
    );
  });
});
