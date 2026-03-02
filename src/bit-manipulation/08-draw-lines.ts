// LCCI 05.08. Draw Line
//
// A monochrome screen is stored as a single array of bytes, allowing eight consecutive
// pixels to be stored in one byte. The screen has width w, where w is divisible by 8.
// Implement a function that draws a horizontal line from (x1, y) to (x2, y).
//
// Example 1:
// Input: length = 1, w = 32, x1 = 30, x2 = 31, y = 0
// Output: [3]
//
// Example 2:
// Input: length = 3, w = 96, x1 = 0, x2 = 95, y = 0
// Output: [-1, -1, -1]

// Draws a horizontal line from (x1, y) to (x2, y) on a monochrome screen represented by a byte array.
export function drawLine(
  screen: Uint8Array,
  width: number,
  x1: number,
  x2: number,
  y: number
): void {
  const bytesPerRow = width / 8;
  const startByte = Math.floor(x1 / 8);
  const endByte = Math.floor(x2 / 8);

  const startOffset = x1 % 8;
  const endOffset = x2 % 8;

  // Case: start and end are within the same byte
  if (startByte === endByte) {
    let mask = 0;
    for (let bit = startOffset; bit <= endOffset; bit++) {
      mask |= 1 << (7 - bit);
    }
    screen[y * bytesPerRow + startByte] |= mask;
  } else {
    // Fill start byte
    let startMask = 0;
    for (let bit = startOffset; bit < 8; bit++) {
      startMask |= 1 << (7 - bit);
    }
    screen[y * bytesPerRow + startByte] |= startMask;

    // Fill end byte
    let endMask = 0;
    for (let bit = 0; bit <= endOffset; bit++) {
      endMask |= 1 << (7 - bit);
    }
    screen[y * bytesPerRow + endByte] |= endMask;

    // Fill full bytes in between
    for (let b = startByte + 1; b < endByte; b++) {
      screen[y * bytesPerRow + b] = 0xff;
    }
  }
}
