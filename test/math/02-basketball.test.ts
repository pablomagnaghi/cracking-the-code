import { chooseBetterGame } from './../../src/math/02-basketball';

describe('chooseBetterGame', () => {
  test('prefers Game 2 for prob = 0.6', () => {
    expect(chooseBetterGame(0.6)).toBe('Game 2');
  });

  test('prefers Game 1 for low prob = 0.2', () => {
    expect(chooseBetterGame(0.2)).toBe('Game 1');
  });

  test('prefers Game 2 for prob = 0.5', () => {
    expect(chooseBetterGame(0.5)).toBe('Game 2');
  });

  test('equal win chance for prob = 0.0', () => {
    expect(chooseBetterGame(0)).toBe('Game 2'); // both 0, default to Game 2
  });

  test('equal win chance for prob = 1.0', () => {
    expect(chooseBetterGame(1)).toBe('Game 2'); // both 1, default to Game 2
  });

  test('handles edge case around threshold (prob = 0.7)', () => {
    expect(chooseBetterGame(0.7)).toBe('Game 2');
  });

  test('returns a valid game name for any probability between 0 and 1', () => {
    for (let i = 0; i <= 100; i++) {
      const prob = i / 100;
      const result = chooseBetterGame(prob);
      expect(['Game 1', 'Game 2']).toContain(result);
    }
  });
});
