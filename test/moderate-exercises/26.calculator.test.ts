import { calculate } from '../../src/moderate-exercises/26-calculator';

describe('calculate', () => {
  test('handles simple addition', () => {
    expect(calculate('3+2')).toBe(5);
  });

  test('handles addition and subtraction', () => {
    expect(calculate('3+2-1')).toBe(4);
  });

  test('handles multiplication and division', () => {
    expect(calculate('3+2*2')).toBe(7);
    expect(calculate(' 3/2 ')).toBeCloseTo(1.5);
    expect(calculate(' 3+5 / 2 ')).toBe(5.5);
  });

  test('handles multiple operators and spaces', () => {
    expect(calculate(' 14-3/2 ')).toBe(12.5);
    expect(calculate(' 2*3 + 4 / 2 ')).toBe(8);
  });

  test('handles large numbers', () => {
    expect(calculate('1000*2+300')).toBe(2300);
  });

  test('handles complex expression with decimals', () => {
    expect(calculate('2*3+5/6*3+15')).toBeCloseTo(23.5);
  });

  test('handles division truncation towards zero', () => {
    expect(calculate('7/3')).toBeCloseTo(2.33);
    expect(calculate('7/-3')).toBeCloseTo(-2.33);
    expect(calculate('-7/3')).toBeCloseTo(-2.33);
    expect(calculate('-7/-3')).toBeCloseTo(2.33);
  });

  test('handles single number', () => {
    expect(calculate('42')).toBe(42);
  });

  test('handles empty string', () => {
    expect(calculate('')).toBe(0);
  });
});
