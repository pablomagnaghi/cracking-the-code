import { drawLine } from '../../src/bit-manipulation/08-draw-lines';

describe('drawLine', () => {
  test('draws a horizontal line within a single byte', () => {
    const width = 8;
    const screen = new Uint8Array(8);
    drawLine(screen, width, 2, 5, 3);

    const expected = new Uint8Array(8);
    // bit 2 to 5: 00111100
    expected[3] = 0x3c;

    expect(screen).toEqual(expected);
  });

  test('draws a single pixel at bit 4 in row 7', () => {
    const width = 8;
    const screen = new Uint8Array(8);
    drawLine(screen, width, 4, 4, 7);

    const expected = new Uint8Array(8);
    expected[7] = 0x08; // bit 4 (MSB-first) => 00001000

    expect(screen).toEqual(expected);
  });

  test('draws a horizontal line spanning multiple bytes', () => {
    const width = 32;
    const screen = new Uint8Array(32);

    drawLine(screen, width, 10, 25, 2);

    const bytesPerRow = width / 8;
    const row = 2;

    const expected = new Uint8Array(32);
    expected[row * bytesPerRow + 1] = 0x3f; // bits 2-7
    expected[row * bytesPerRow + 2] = 0xff; // full byte
    expected[row * bytesPerRow + 3] = 0xc0; // bits 0-1

    expect(screen).toEqual(expected);
  });

  test('draws full row line', () => {
    const width = 16;
    const screen = new Uint8Array(16);

    drawLine(screen, width, 0, 15, 0);

    const expected = new Uint8Array(16);
    expected[0] = 0xff;
    expected[1] = 0xff;

    expect(screen).toEqual(expected);
  });

  test('handles when x2 ends exactly at byte boundary', () => {
    const width = 16;
    const screen = new Uint8Array(2);
    drawLine(screen, width, 0, 7, 0);

    const expected = new Uint8Array([0xff, 0x00]);

    expect(screen).toEqual(expected);
  });

  test('draws full screen row on large screen', () => {
    const width = 64;
    const screen = new Uint8Array(64); // 64 bits wide, 8 rows
    drawLine(screen, width, 0, 63, 4);

    const expected = new Uint8Array(64);
    const start = (width / 8) * 4;
    for (let i = 0; i < width / 8; i++) {
      expected[start + i] = 0xff;
    }

    expect(screen).toEqual(expected);
  });
});
