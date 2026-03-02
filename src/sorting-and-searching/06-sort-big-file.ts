// 10.06. Sort Big File
//
// Imagine you have a 20 GB file with one string per line. Explain how you
// would sort the file.
//
// Since the file is too large to fit entirely into memory, we use an External
// Merge Sort:
//   1. Divide the file into chunks small enough to fit in available memory
//      (e.g., if you have X MB of memory, each chunk is X MB).
//   2. Sort each chunk in memory using a standard O(n log n) algorithm
//      (e.g., quicksort or mergesort) and write each sorted chunk to disk.
//   3. Merge all sorted chunks together using a k-way merge (min-heap) to
//      produce the final fully sorted file.
//
// Example:
//   Input:  A 900 MB file, 100 MB of available RAM
//   Step 1: Read 100 MB chunks, sort each, write 9 sorted chunk files
//   Step 2: Merge the 9 sorted chunks into the final sorted output
//   Output: A single sorted file with all data in order
//
// Constraints:
//   - File size exceeds available memory
//   - Must use disk-based (external) sorting
//   - k-way merge uses O(k) memory for the heap plus one buffer per chunk
//   - Overall time complexity: O(n log n), where n is total number of elements

import * as fs from 'fs';
import * as readline from 'readline';

type Chunk = number[];

// Main function to orchestrate the sort
export async function sortBigFile(inputFile: string, outputFile: string, memoryLimitBytes: number) {
  // Approximate how many integers fit in memoryLimitBytes (4 bytes per int)
  const chunkSize = Math.floor(memoryLimitBytes / 4);

  // Step 1: Create sorted chunks
  const chunkFiles = await createSortedChunks(inputFile, chunkSize);

  // Step 2: Merge sorted chunks
  await mergeSortedChunks(chunkFiles, outputFile);
  await cleanupChunkFiles(chunkFiles);
}

// Step 1: Read the big file in chunks, sort each chunk, and write sorted chunks to disk.
async function createSortedChunks(inputFile: string, chunkSize: number): Promise<string[]> {
  const chunkFiles: string[] = [];
  let chunk: number[] = [];
  let chunkIndex = 0;

  const rl = readline.createInterface({
    input: fs.createReadStream(inputFile),
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    const num = parseInt(line, 10);
    if (!isNaN(num)) {
      chunk.push(num);
    }
    if (chunk.length >= chunkSize) {
      chunk.sort((a, b) => a - b);
      const chunkFile = `chunk_${chunkIndex}.txt`;
      fs.writeFileSync(chunkFile, chunk.join('\n'));
      chunkFiles.push(chunkFile);
      chunkIndex++;
      chunk = [];
    }
  }

  // Handle last chunk
  if (chunk.length > 0) {
    chunk.sort((a, b) => a - b);
    const chunkFile = `chunk_${chunkIndex}.txt`;
    fs.writeFileSync(chunkFile, chunk.join('\n'));
    chunkFiles.push(chunkFile);
  }

  return chunkFiles;
}

// Step 2: Merge sorted chunk files using k-way merge
async function mergeSortedChunks(chunkFiles: string[], outputFile: string) {
  // Open read streams for each chunk file
  const streams = chunkFiles.map((file) =>
    readline.createInterface({
      input: fs.createReadStream(file),
      crlfDelay: Infinity,
    })
  );

  // Track current line (number) from each stream
  const currentValues: (number | null)[] = new Array(chunkFiles.length).fill(null);
  const done: boolean[] = new Array(chunkFiles.length).fill(false);

  // Helper to read the next value from a stream
  async function readNextValue(streamIndex: number): Promise<void> {
    const stream = streams[streamIndex];
    if (done[streamIndex]) return;

    const iterator = stream[Symbol.asyncIterator]();

    const result = await iterator.next();
    if (result.done) {
      done[streamIndex] = true;
      currentValues[streamIndex] = null;
      return;
    }

    const val = parseInt(result.value, 10);
    currentValues[streamIndex] = isNaN(val) ? null : val;
  }

  // Initialize by reading first value from each stream
  await Promise.all(chunkFiles.map((_, i) => readNextValue(i)));

  // Open write stream for the output file
  const writeStream = fs.createWriteStream(outputFile);

  // Min-heap to keep track of minimum value among current values
  type HeapNode = { value: number; index: number };

  class MinHeap {
    heap: HeapNode[] = [];

    insert(node: HeapNode) {
      this.heap.push(node);
      this.bubbleUp(this.heap.length - 1);
    }

    extractMin(): HeapNode | undefined {
      if (this.heap.length === 0) return undefined;
      const min = this.heap[0];
      const end = this.heap.pop()!;
      if (this.heap.length > 0) {
        this.heap[0] = end;
        this.bubbleDown(0);
      }
      return min;
    }

    bubbleUp(i: number) {
      while (i > 0) {
        const parent = Math.floor((i - 1) / 2);
        if (this.heap[i].value < this.heap[parent].value) {
          [this.heap[i], this.heap[parent]] = [this.heap[parent], this.heap[i]];
          i = parent;
        } else break;
      }
    }

    bubbleDown(i: number) {
      const length = this.heap.length;
      while (true) {
        let left = 2 * i + 1;
        let right = 2 * i + 2;
        let smallest = i;

        if (left < length && this.heap[left].value < this.heap[smallest].value) {
          smallest = left;
        }
        if (right < length && this.heap[right].value < this.heap[smallest].value) {
          smallest = right;
        }
        if (smallest === i) break;
        [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
        i = smallest;
      }
    }

    isEmpty(): boolean {
      return this.heap.length === 0;
    }
  }

  // Initialize heap with first values
  const heap = new MinHeap();
  for (let i = 0; i < currentValues.length; i++) {
    if (currentValues[i] !== null) {
      heap.insert({ value: currentValues[i]!, index: i });
    }
  }

  // Merge loop
  while (!heap.isEmpty()) {
    const minNode = heap.extractMin()!;
    writeStream.write(minNode.value + '\n');

    // Read next value from the stream that provided the minNode
    await readNextValue(minNode.index);

    if (currentValues[minNode.index] !== null) {
      heap.insert({ value: currentValues[minNode.index]!, index: minNode.index });
    }
  }

  writeStream.end();

  // Close all streams
  streams.forEach((s) => s.close());
}

function unlinkPromise(path: string): Promise<void> {
  return new Promise((resolve, reject) => {
    fs.unlink(path, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

async function cleanupChunkFiles(chunkFiles: string[]) {
  for (const file of chunkFiles) {
    try {
      await unlinkPromise(file);
    } catch (err) {
      console.error(`Error deleting file ${file}:`, err);
    }
  }
}
