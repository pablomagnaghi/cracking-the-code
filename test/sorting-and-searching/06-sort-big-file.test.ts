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

  test('sorts file with duplicate values', async () => {
    const dupeInput = './test_input_dupes.txt';
    const dupeOutput = './test_output_dupes.txt';
    const data = [5, 3, 5, 1, 3, 1];
    await fs.writeFile(dupeInput, data.join('\n'));

    await sortBigFile(dupeInput, dupeOutput, 4 * 2);

    const content = await fs.readFile(dupeOutput, 'utf-8');
    const sorted = content.split('\n').filter(Boolean).map(Number);
    expect(sorted).toEqual([1, 1, 3, 3, 5, 5]);

    await Promise.all([fs.unlink(dupeInput), fs.unlink(dupeOutput)].map((p) => p.catch(() => {})));
  });
});
