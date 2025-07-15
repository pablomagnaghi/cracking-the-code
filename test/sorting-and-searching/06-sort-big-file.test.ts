import * as fs from 'fs/promises';
import { sortBigFile } from '../../src/sorting-and-searching/06-sort-big-file';

const inputFile = './test_input.txt';
const outputFile = './test_output.txt';

describe('sortBigFile', () => {
  beforeAll(async () => {
    // Write unsorted numbers to input file locally
    const unsortedNumbers = [50, 3, 7, 10, 2, 40, 0, 9];
    await fs.writeFile(inputFile, unsortedNumbers.join('\n'));
  });

  afterAll(async () => {
    // Clean up files after tests
    await Promise.all(
      [inputFile, outputFile].map(async (file) => {
        try {
          await fs.unlink(file);
        } catch {
          // Ignore errors if files don't exist
        }
      })
    );
  });

  test('sorts large file correctly', async () => {
    // Run external sort with small memory limit to force chunking
    await sortBigFile(inputFile, outputFile, 4 * 2); // 2 integers per chunk

    // Read output file content
    const sortedContent = await fs.readFile(outputFile, 'utf-8');
    const sortedNumbers = sortedContent.split('\n').filter(Boolean).map(Number);

    // Expected sorted array
    const expected = [0, 2, 3, 7, 9, 10, 40, 50];

    expect(sortedNumbers).toEqual(expected);

    // Check that output is sorted ascending
    for (let i = 1; i < sortedNumbers.length; i++) {
      expect(sortedNumbers[i]).toBeGreaterThanOrEqual(sortedNumbers[i - 1]);
    }
  });
});
