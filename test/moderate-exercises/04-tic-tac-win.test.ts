import { ticTacWin } from '../../src/moderate-exercises/04-tic-tac-win';

describe('ticTacWin', () => {
  test('detects win in a row', () => {
    const board = [
      ['X', 'X', 'X'],
      ['O', null, 'O'],
      [null, 'O', null],
    ];
    expect(ticTacWin(board, 'X')).toBe(true);
  });

  test('detects win in a column', () => {
    const board = [
      ['O', 'X', null],
      ['O', 'X', null],
      ['O', null, 'X'],
    ];
    expect(ticTacWin(board, 'O')).toBe(true);
  });

  test('detects win in main diagonal', () => {
    const board = [
      ['X', 'O', null],
      ['O', 'X', null],
      [null, 'O', 'X'],
    ];
    expect(ticTacWin(board, 'X')).toBe(true);
  });

  test('detects win in anti-diagonal', () => {
    const board = [
      ['X', 'O', 'O'],
      ['X', 'O', null],
      ['O', null, 'X'],
    ];
    expect(ticTacWin(board, 'O')).toBe(true);
  });

  test('returns false if no win', () => {
    const board = [
      ['X', 'O', 'X'],
      ['O', 'X', 'O'],
      ['O', 'X', 'O'],
    ];
    expect(ticTacWin(board, 'X')).toBe(false);
  });

  test('returns false on empty board', () => {
    const board = [
      [null, null, null],
      [null, null, null],
      [null, null, null],
    ];
    expect(ticTacWin(board, 'X')).toBe(false);
  });
});
