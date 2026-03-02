import { towersOfHanoi } from '../../src/recursion-and-dp/06-towers-of-hanoi';

describe('towersOfHanoi', () => {
  test('solves Towers of Hanoi for n=3', () => {
    const [tower1, tower2, tower3] = towersOfHanoi(3);

    // After solving:
    // All disks moved to the last tower in order [3, 2, 1]
    expect(tower1).toEqual([]);
    expect(tower2).toEqual([]);
    expect(tower3).toEqual([3, 2, 1]);
  });

  test('solves Towers of Hanoi for n=1', () => {
    const [tower1, tower2, tower3] = towersOfHanoi(1);

    expect(tower1).toEqual([]);
    expect(tower2).toEqual([]);
    expect(tower3).toEqual([1]);
  });

  test('solves Towers of Hanoi for n=0 (no disks)', () => {
    const [tower1, tower2, tower3] = towersOfHanoi(0);

    expect(tower1).toEqual([]);
    expect(tower2).toEqual([]);
    expect(tower3).toEqual([]);
  });

  test('solves Towers of Hanoi for n=2 (LCCI example)', () => {
    const [tower1, tower2, tower3] = towersOfHanoi(2);

    expect(tower1).toEqual([]);
    expect(tower2).toEqual([]);
    expect(tower3).toEqual([2, 1]);
  });

  test('solves Towers of Hanoi for n=5', () => {
    const [tower1, tower2, tower3] = towersOfHanoi(5);

    expect(tower1).toEqual([]);
    expect(tower2).toEqual([]);
    expect(tower3).toEqual([5, 4, 3, 2, 1]);
  });
});
