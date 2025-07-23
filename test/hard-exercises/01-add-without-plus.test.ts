import { add } from '../../src/hard-exercises/01-add-without-plus';

describe('add (without using + or -)', () => {
  test('adds two positive numbers', () => {
    expect(add(3, 5)).toBe(8);
    expect(add(10, 20)).toBe(30);
  });

  test('adds a positive and a negative number', () => {
    expect(add(-3, 7)).toBe(4);
    expect(add(5, -2)).toBe(3);
  });

  test('adds two negative numbers', () => {
    expect(add(-4, -6)).toBe(-10);
  });

  test('adds zero to a number', () => {
    expect(add(0, 10)).toBe(10);
    expect(add(5, 0)).toBe(5);
  });

  test('adds large numbers', () => {
    expect(add(1_000_000, 2_000_000)).toBe(3_000_000);
  });

  test('adds number to itself', () => {
    expect(add(7, 7)).toBe(14);
  });
});
