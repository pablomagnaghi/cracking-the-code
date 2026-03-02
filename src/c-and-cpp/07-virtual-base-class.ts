// 12.07. Virtual Base Class
//
// Why does a destructor in a base class need to be declared virtual?
//
// In C++, if a base class destructor is not virtual and you delete a
// derived-class object through a base-class pointer, only the base
// destructor runs, leaking resources owned by the derived class. Declaring
// the destructor virtual ensures the most-derived destructor is called
// first, followed by base destructors in reverse construction order.
//
// Adapted: demonstrate proper cleanup patterns in TypeScript using the
// Disposable pattern. A Disposable interface declares a dispose() method.
// Resource and DerivedResource classes implement dispose() to release their
// resources, and DerivedResource.dispose() calls super.dispose() to ensure
// the entire chain is cleaned up (analogous to virtual destructor behavior).
//
// Approach:
//   - Define a Disposable interface with dispose() and isDisposed.
//   - Resource class tracks whether it has been disposed and records
//     cleanup actions.
//   - DerivedResource extends Resource, adds its own resources, and
//     chains dispose() to the parent via super.dispose().
//
// Example:
//   const r = new DerivedResource("db-conn", "cache");
//   r.dispose(); // cleans up "cache" then "db-conn"
//   r.isDisposed; // true
//
// Constraints:
//   - dispose() must be idempotent (safe to call multiple times).
//   - After disposal, the resource should be marked as disposed.

export interface Disposable {
  dispose(): void;
  readonly isDisposed: boolean;
}

export class Resource implements Disposable {
  private _isDisposed: boolean = false;
  private _resourceName: string;
  private _disposalLog: string[] = [];

  constructor(resourceName: string) {
    this._resourceName = resourceName;
  }

  get isDisposed(): boolean {
    return this._isDisposed;
  }

  get resourceName(): string {
    return this._resourceName;
  }

  get disposalLog(): string[] {
    return [...this._disposalLog];
  }

  dispose(): void {
    if (this._isDisposed) return; // idempotent
    this._disposalLog.push(`Disposed: ${this._resourceName}`);
    this._isDisposed = true;
  }
}

export class DerivedResource extends Resource {
  private _extraResourceName: string;
  private _derivedDisposalLog: string[] = [];

  constructor(baseResourceName: string, extraResourceName: string) {
    super(baseResourceName);
    this._extraResourceName = extraResourceName;
  }

  get extraResourceName(): string {
    return this._extraResourceName;
  }

  get fullDisposalLog(): string[] {
    return [...this._derivedDisposalLog, ...this.disposalLog];
  }

  dispose(): void {
    if (this.isDisposed) return; // idempotent
    // Clean up derived resources first (like a virtual destructor)
    this._derivedDisposalLog.push(`Disposed: ${this._extraResourceName}`);
    // Then clean up base resources
    super.dispose();
  }
}
