import { eggDrop } from '../../src/math/08-egg-drop-problem';

describe('Egg Drop Problem', () => {
  test('zero floors requires zero drops', () => {
    expect(eggDrop(1, 0)).toBe(0);
    expect(eggDrop(2, 0)).toBe(0);
  });

  test('one floor requires one drop', () => {
    expect(eggDrop(1, 1)).toBe(1);
    expect(eggDrop(2, 1)).toBe(1);
  });

  test('one egg requires linear drops equal to floors', () => {
    expect(eggDrop(1, 5)).toBe(5);
    expect(eggDrop(1, 10)).toBe(10);
  });

  test('two eggs and 6 floors requires minimum 3 drops', () => {
    expect(eggDrop(2, 6)).toBe(3);
  });

  test('three eggs and 14 floors requires minimum 4 drops', () => {
    expect(eggDrop(3, 14)).toBe(4);
  });

  test('two eggs and 100 floors requires minimum 14 drops', () => {
    expect(eggDrop(2, 100)).toBe(14);
  });
});
