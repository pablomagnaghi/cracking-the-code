// 10.6: Sort Big File
//
// You have a file with 4 billion integers. Assume you have 1 GB of memory available.
// How would you sort the file?
//
// Approach:
// Since the data cannot fit into memory, use External Merge Sort:
// 1. Break the file into chunks that fit into memory.
// 2. Sort each chunk in memory and write it back to disk as a sorted sub-file.
// 3. Merge all sorted sub-files using a k-way merge to produce a fully sorted file.

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
