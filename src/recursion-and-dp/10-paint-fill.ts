// 8.10. Paint Fill
//
// Imagine you have a screen represented by a 2D array of colors,
// each color is represented by a number (like 0, 1, 2...).
// Implement the "paint fill" function, like the bucket fill tool in a paint program.
// Given a screen (2D array), a point (row, col), and a new color,
// fill in the surrounding area of the original color with the new color.

type Screen = number[][];

export function paintFill(screen: Screen, row: number, col: number, newColor: number): boolean {
  if (!isValid(screen, row, col)) return false;

  const originalColor = screen[row][col];
  if (originalColor === newColor) return false;

  fill(screen, row, col, originalColor, newColor);
  return true;
}

function fill(
  screen: Screen,
  row: number,
  col: number,
  originalColor: number,
  newColor: number
): void {
  if (!isValid(screen, row, col)) return;
  if (screen[row][col] !== originalColor) return;

  screen[row][col] = newColor;

  fill(screen, row - 1, col, originalColor, newColor); // up
  fill(screen, row + 1, col, originalColor, newColor); // down
  fill(screen, row, col - 1, originalColor, newColor); // left
  fill(screen, row, col + 1, originalColor, newColor); // right
}

function isValid(screen: Screen, row: number, col: number): boolean {
  return row >= 0 && col >= 0 && row < screen.length && col < screen[0].length;
}
