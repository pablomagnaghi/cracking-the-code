import { generateParens } from '../../src/recursion-and-dp/09-parens';

describe('generateParens', () => {
  it('returns correct parens for n = 0', () => {
    expect(generateParens(0)).toEqual(['']);
  });

  it('returns correct parens for n = 1', () => {
    expect(generateParens(1).sort()).toEqual(['()']);
  });

  it('returns correct parens for n = 2', () => {
    expect(generateParens(2).sort()).toEqual(['(())', '()()']);
  });

  it('returns correct parens for n = 3', () => {
    expect(generateParens(3).sort()).toEqual(
      ['((()))', '(()())', '(())()', '()(())', '()()()'].sort()
    );
  });

  it('does not include invalid sequences', () => {
    const result = generateParens(3);
    for (const seq of result) {
      let balance = 0;
      for (const ch of seq) {
        if (ch === '(') balance++;
        else if (ch === ')') balance--;
        if (balance < 0) throw new Error(`Invalid sequence: ${seq}`);
      }
      expect(balance).toBe(0); // final balance should be zero
    }
  });
});
