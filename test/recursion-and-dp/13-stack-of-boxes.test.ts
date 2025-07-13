import { stackOfBoxes, Box } from '../../src/recursion-and-dp/13-stack-of-boxes';

describe('stackOfBoxes', () => {
  test('stackOfBoxes returns tallest possible stack height', () => {
    const boxes: Box[] = [
      { width: 6, height: 4, depth: 5 },
      { width: 8, height: 6, depth: 7 },
      { width: 5, height: 3, depth: 4 },
      { width: 7, height: 8, depth: 6 },
      { width: 4, height: 2, depth: 3 },
    ];
    expect(stackOfBoxes(boxes)).toBe(17);
  });

  test('returns 0 when input is empty', () => {
    expect(stackOfBoxes([])).toBe(0);
  });

  test('returns height of single box', () => {
    expect(stackOfBoxes([{ width: 1, height: 1, depth: 1 }])).toBe(1);
  });
});
