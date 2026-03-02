// LCCI 08.10. Color Fill
//
// Implement the "paint fill" function that one might see on many image editing
// programs. That is, given a screen (represented by a two-dimensional array of
// colors), a point, and a new color, fill in the surrounding area until the color
// changes from the original color.
//
// Example:
//   Input: image = [[1,1,1],[1,1,0],[1,0,1]], sr = 1, sc = 1, newColor = 2
//   Output: [[2,2,2],[2,2,0],[2,0,1]]
//
// Constraints:
//   The height and width of the image are in range [1, 50].
//   The given starting pixel will satisfy 0 <= sr < image.length and 0 <= sc < image[0].length.
//   The value of each color in image[i][j] and newColor will be an integer in [0, 65535].

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
