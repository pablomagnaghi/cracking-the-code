// 13.03. Final, etc.
//
// What is the difference between final, finally, and finalize in Java?
//   - final: prevents variable reassignment, method overriding, or class inheritance
//   - finally: a block that always executes after try/catch
//   - finalize: a method called by the garbage collector before reclaiming memory
//
// Adapt to TypeScript:
//   - final -> readonly properties and as const assertions
//   - finally -> try-finally (identical behavior)
//   - finalize -> explicit dispose pattern (Symbol.dispose or manual cleanup)
//
// Approach:
//   Demonstrate ImmutableConfig with readonly fields that cannot be changed
//   after construction. Show SafeResource with an explicit dispose() method
//   for deterministic cleanup. Provide utility functions illustrating each
//   concept.
//
// Example:
//   const config = new ImmutableConfig('prod', 8080, true);
//   config.env; // 'prod'  (readonly, cannot be reassigned)
//
//   const res = new SafeResource('file.txt');
//   res.read(); // 'data from file.txt'
//   res.dispose();
//   res.read(); // throws Error
//
// Constraints:
//   - ImmutableConfig fields cannot be modified after construction
//   - SafeResource throws after disposal
//   - SafeResource tracks whether it has been disposed

export class ImmutableConfig {
  readonly env: string;
  readonly port: number;
  readonly debug: boolean;
  readonly createdAt: number;

  constructor(env: string, port: number, debug: boolean) {
    this.env = env;
    this.port = port;
    this.debug = debug;
    this.createdAt = Date.now();
  }

  describe(): string {
    return `${this.env}:${this.port} (debug=${this.debug})`;
  }
}

export class SafeResource {
  private readonly name: string;
  private disposed: boolean = false;
  private data: string;
  readonly operations: string[] = [];

  constructor(name: string) {
    this.name = name;
    this.data = `data from ${name}`;
    this.operations.push('created');
  }

  private ensureNotDisposed(): void {
    if (this.disposed) {
      throw new Error(`Resource "${this.name}" has been disposed`);
    }
  }

  read(): string {
    this.ensureNotDisposed();
    this.operations.push('read');
    return this.data;
  }

  write(value: string): void {
    this.ensureNotDisposed();
    this.data = value;
    this.operations.push('write');
  }

  isDisposed(): boolean {
    return this.disposed;
  }

  dispose(): void {
    if (!this.disposed) {
      this.disposed = true;
      this.data = '';
      this.operations.push('disposed');
    }
  }
}

export function useResourceSafely(name: string, action: (res: SafeResource) => string): {
  result: string;
  disposed: boolean;
} {
  const resource = new SafeResource(name);
  let result: string;
  try {
    result = action(resource);
  } finally {
    resource.dispose();
  }
  return { result: result!, disposed: resource.isDisposed() };
}

export const IMMUTABLE_DEFAULTS = {
  maxRetries: 3,
  timeout: 5000,
  baseUrl: 'https://api.example.com',
} as const;

export type ImmutableDefaults = typeof IMMUTABLE_DEFAULTS;
