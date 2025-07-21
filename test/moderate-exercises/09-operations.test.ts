import { operations } from '../../src/moderate-exercises/09-operations';

const { add, subtract, multiply, divide } = operations;

describe('operations.add', () => {
  test('adds positive numbers', () => {
    expect(add(3, 5)).toBe(8);
    expect(add(0, 0)).toBe(0);
  });

  test('adds with negative numbers', () => {
    expect(add(-3, 3)).toBe(0);
    expect(add(-4, -6)).toBe(-10);
  });

  test('adds large numbers', () => {
    expect(add(100000, 234567)).toBe(334567);
  });
});

describe('operations.subtract', () => {
  test('subtracts positive numbers', () => {
    expect(subtract(10, 4)).toBe(6);
    expect(subtract(4, 10)).toBe(-6);
  });

  test('subtracts negative numbers', () => {
    expect(subtract(-4, -6)).toBe(2);
    expect(subtract(-4, 6)).toBe(-10);
  });
});

describe('operations.multiply', () => {
  test('multiplies positive numbers', () => {
    expect(multiply(3, 4)).toBe(12);
  });

  test('multiplies with negative numbers', () => {
    expect(multiply(-3, 4)).toBe(-12);
    expect(multiply(3, -4)).toBe(-12);
    expect(multiply(-3, -4)).toBe(12);
  });

  test('multiplies with zero', () => {
    expect(multiply(0, 1000)).toBe(0);
  });
});

describe('operations.divide', () => {
  test('divides positive numbers', () => {
    expect(divide(12, 3)).toBe(4);
    expect(divide(10, 3)).toBe(3); // Integer division
  });

  test('divides negative numbers', () => {
    expect(divide(-12, 3)).toBe(-4);
    expect(divide(12, -3)).toBe(-4);
    expect(divide(-12, -3)).toBe(4);
  });

  test('divides with remainder ignored', () => {
    expect(divide(7, 2)).toBe(3); // Integer division
  });

  test('throws on division by zero', () => {
    expect(() => divide(5, 0)).toThrow('Division by zero');
  });
});
