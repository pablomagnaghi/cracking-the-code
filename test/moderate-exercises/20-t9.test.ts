import { t9Words } from '../../src/moderate-exercises/20-t9';

describe('t9Words', () => {
  const dictionary = ['tree', 'used', 'vase', 'time', 'tone', 'home'];

  test('matches 8733 -> tree, used', () => {
    expect(t9Words('8733', dictionary)).toEqual(expect.arrayContaining(['tree', 'used']));
  });

  test('matches 8463 -> time', () => {
    expect(t9Words('8463', dictionary)).toEqual(['time']);
  });

  test('matches 4663 -> home', () => {
    expect(t9Words('4663', dictionary)).toEqual(['home']);
  });

  test('matches 8273 -> vase', () => {
    expect(t9Words('8273', dictionary)).toEqual(['vase']);
  });

  test('returns empty for empty digits', () => {
    expect(t9Words('', dictionary)).toEqual([]);
  });

  test('returns empty for empty dictionary', () => {
    expect(t9Words('8733', [])).toEqual([]);
  });
});
