// 09.04. Duplicate URLs
//
// You have 10 billion URLs. How do you detect the duplicate documents?
// In this case, assume "duplicate" means that the URLs are identical.
//
// Approach:
//   With 10 billion URLs, storing them all in a hash set would require
//   enormous memory. A Bloom filter provides a space-efficient probabilistic
//   data structure that can test set membership with no false negatives
//   (if an item was added, it will always be detected) and a controllable
//   false positive rate.
//
//   The BloomFilter uses multiple independent hash functions mapping each URL
//   to bit positions in a bit array. The URLDeduplicator wraps the Bloom
//   filter and provides a simple interface: add a URL, check if it is a
//   duplicate, and process a batch of URLs returning only the unique ones.
//
// Example:
//   dedup.add('https://example.com')
//   dedup.isDuplicate('https://example.com') => true
//   dedup.isDuplicate('https://other.com') => false

export class BloomFilter {
  private bitArray: Uint8Array;
  private size: number;
  private hashCount: number;

  constructor(size: number = 1_000_000, hashCount: number = 7) {
    this.size = size;
    this.bitArray = new Uint8Array(Math.ceil(size / 8));
    this.hashCount = hashCount;
  }

  add(item: string): void {
    for (let i = 0; i < this.hashCount; i++) {
      const position = this.hash(item, i);
      this.setBit(position);
    }
  }

  mightContain(item: string): boolean {
    for (let i = 0; i < this.hashCount; i++) {
      const position = this.hash(item, i);
      if (!this.getBit(position)) {
        return false;
      }
    }
    return true;
  }

  getSize(): number {
    return this.size;
  }

  private setBit(position: number): void {
    const byteIndex = Math.floor(position / 8);
    const bitIndex = position % 8;
    this.bitArray[byteIndex] |= 1 << bitIndex;
  }

  private getBit(position: number): boolean {
    const byteIndex = Math.floor(position / 8);
    const bitIndex = position % 8;
    return (this.bitArray[byteIndex] & (1 << bitIndex)) !== 0;
  }

  // Simple hash function using FNV-1a variant with seed
  private hash(item: string, seed: number): number {
    let hash = 2166136261 ^ seed;
    for (let i = 0; i < item.length; i++) {
      hash ^= item.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return Math.abs(hash) % this.size;
  }
}

export class URLDeduplicator {
  private filter: BloomFilter;
  private count: number = 0;

  constructor(expectedUrls: number = 1_000_000, falsePositiveRate: number = 0.01) {
    // Calculate optimal bloom filter size: m = -n * ln(p) / (ln(2))^2
    const m = Math.ceil(
      (-expectedUrls * Math.log(falsePositiveRate)) / (Math.log(2) ** 2)
    );
    // Optimal number of hash functions: k = (m / n) * ln(2)
    const k = Math.round((m / expectedUrls) * Math.log(2));
    this.filter = new BloomFilter(m, k);
  }

  add(url: string): void {
    this.filter.add(url);
    this.count++;
  }

  isDuplicate(url: string): boolean {
    return this.filter.mightContain(url);
  }

  processUrls(urls: string[]): string[] {
    const unique: string[] = [];
    for (const url of urls) {
      if (!this.filter.mightContain(url)) {
        this.filter.add(url);
        unique.push(url);
        this.count++;
      }
    }
    return unique;
  }

  getCount(): number {
    return this.count;
  }
}
