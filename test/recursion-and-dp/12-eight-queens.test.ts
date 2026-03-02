import { eightQueens } from '../../src/recursion-and-dp/12-eight-queens';

describe('eightQueens', () => {
  test('returns all valid solutions for the 8 queens problem', () => {
    const solutions = eightQueens();

    // There are known to be 92 distinct solutions to the classic 8 queens problem
    expect(solutions.length).toBe(92);

    // Each solution should have length 8 (one queen per row)
    solutions.forEach((solution) => {
      expect(solution.length).toBe(8);
    });
  });

  test('each solution has no conflicting queens', () => {
    const solutions = eightQueens();

    function noConflicts(solution: number[]): boolean {
      for (let i = 0; i < solution.length; i++) {
        for (let j = i + 1; j < solution.length; j++) {
          if (solution[i] === solution[j]) return false; // same column
          if (Math.abs(i - j) === Math.abs(solution[i] - solution[j])) return false; // diagonal
        }
      }
      return true;
    }

    solutions.forEach((solution) => {
      expect(noConflicts(solution)).toBe(true);
    });
  });

  test('all solutions are unique', () => {
    const solutions = eightQueens();
    const serialized = solutions.map((s) => s.join(','));
    const unique = new Set(serialized);
    expect(unique.size).toBe(solutions.length);
  });

  test('each solution uses columns 0-7 exactly once (no two queens in same column)', () => {
    const solutions = eightQueens();
    solutions.forEach((solution) => {
      const cols = new Set(solution);
      expect(cols.size).toBe(8);
    });
  });
});
