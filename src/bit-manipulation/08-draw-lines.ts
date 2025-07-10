// 5.8 Draw Line
//
// Implement a function to draw a horizontal line on a monochrome screen represented by a byte array.
// The screen is represented by a single array of bytes, where each byte represents 8 pixels.
// The width of the screen is given in pixels (multiple of 8).
// Draw a horizontal line from (x1, y) to (x2, y).

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
