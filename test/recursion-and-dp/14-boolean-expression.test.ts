import { countEval } from '../../src/recursion-and-dp/14-boolean-expression';

describe('countEval', () => {
  test('returns correct ways for "1^0|0|1" to be true', () => {
    expect(countEval('1^0|0|1', true)).toBe(3);
  });

  test('returns correct ways for "1^0|0|1" to be false', () => {
    expect(countEval('1^0|0|1', false)).toBe(2);
  });

  test('returns 1 when expression is single digit equal to result', () => {
    expect(countEval('1', true)).toBe(1);
    expect(countEval('0', false)).toBe(1);
  });

  test('returns 0 when expression is single digit not equal to result', () => {
    expect(countEval('1', false)).toBe(0);
    expect(countEval('0', true)).toBe(0);
  });

  test('returns 0 when empty expression', () => {
    expect(countEval('', true)).toBe(0);
  });
});
