import { wordRectangle } from '../../src/hard-exercises/25-word-rectangle';

describe('wordRectangle', () => {
  test('finds largest word rectangle', () => {
    const words = ['area', 'lead', 'wall', 'lady', 'ball', 'ally', 'bade', 'bead', 'dear', 'read'];
    const result = wordRectangle(words);
    // One valid largest rectangle is:
    // [
    //   "wall",
    //   "area",
    //   "lead",
    //   "lady"
    // ]
    // all rows and columns are valid words
    expect(result.length).toBe(4);
    expect(result[0].length).toBe(4);
    // verify rows are words
    for (const row of result) {
      expect(words.includes(row)).toBe(true);
    }
    // verify columns are words
    for (let c = 0; c < result[0].length; c++) {
      let colWord = '';
      for (let r = 0; r < result.length; r++) {
        colWord += result[r][c];
      }
      expect(words.includes(colWord)).toBe(true);
    }
  });
});
