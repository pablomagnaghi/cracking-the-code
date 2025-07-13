import { tripleStep } from '../../src/recursion-and-dp/01-triple-step';

describe('tripleStep', () => {
  test('n = 0 (base case)', () => {
    expect(tripleStep(0)).toBe(0);
  });

  test('n = 1', () => {
    expect(tripleStep(1)).toBe(1);
  });

  test('n = 2', () => {
    expect(tripleStep(2)).toBe(2); // [1+1], [2]
  });

  test('n = 3', () => {
    expect(tripleStep(3)).toBe(4); // [1+1+1], [1+2], [2+1], [3]
  });

  test('n = 4', () => {
    expect(tripleStep(4)).toBe(7);
  });

  test('n = 5', () => {
    expect(tripleStep(5)).toBe(13);
  });

  test('n = 10', () => {
    expect(tripleStep(10)).toBe(274);
  });
});
