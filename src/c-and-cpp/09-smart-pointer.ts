// 12.09. Smart Pointer
//
// Write a smart pointer class in C++.
//
// In C++, a smart pointer (like std::shared_ptr) wraps a raw pointer and
// automatically manages memory through reference counting. When the last
// smart pointer referencing an object is destroyed, the object is
// deallocated.
//
// Adapted: implement a reference-counted wrapper class in TypeScript.
// Although TypeScript has garbage collection, we simulate the pattern
// of shared ownership and explicit release. A shared control block
// tracks the reference count, and when it reaches zero, an optional
// destructor callback is invoked.
//
// Approach:
//   - A ControlBlock holds the reference count and the stored value.
//   - SmartPointer wraps a ControlBlock. Creating a new SmartPointer
//     or cloning an existing one increments the count.
//   - release() decrements the count. When it hits zero, the destructor
//     callback fires and the value is cleared.
//   - get() returns the value (or undefined if released).
//
// Example:
//   const sp1 = new SmartPointer({ data: 42 });
//   const sp2 = sp1.clone();
//   sp1.useCount(); // 2
//   sp1.release();
//   sp2.useCount(); // 1
//   sp2.release();  // destructor fires
//
// Constraints:
//   - release() is idempotent (safe to call after already released).
//   - get() returns undefined after the last reference is released.

class ControlBlock<T> {
  value: T | undefined;
  refCount: number;
  onDestroy?: (value: T) => void;

  constructor(value: T, onDestroy?: (value: T) => void) {
    this.value = value;
    this.refCount = 1;
    this.onDestroy = onDestroy;
  }
}

export class SmartPointer<T> {
  private control: ControlBlock<T> | null;
  private released: boolean = false;

  constructor(value: T, onDestroy?: (value: T) => void);
  constructor(control: ControlBlock<T>);
  constructor(valueOrControl: T | ControlBlock<T>, onDestroy?: (value: T) => void) {
    if (valueOrControl instanceof ControlBlock) {
      this.control = valueOrControl;
      this.control.refCount++;
    } else {
      this.control = new ControlBlock(valueOrControl, onDestroy);
    }
  }

  get(): T | undefined {
    if (this.released || !this.control) return undefined;
    return this.control.value;
  }

  useCount(): number {
    if (this.released || !this.control) return 0;
    return this.control.refCount;
  }

  clone(): SmartPointer<T> {
    if (this.released || !this.control) {
      throw new Error('Cannot clone a released SmartPointer');
    }
    return new SmartPointer<T>(this.control);
  }

  release(): void {
    if (this.released || !this.control) return;

    this.released = true;
    this.control.refCount--;

    if (this.control.refCount === 0) {
      if (this.control.onDestroy && this.control.value !== undefined) {
        this.control.onDestroy(this.control.value);
      }
      this.control.value = undefined;
    }

    this.control = null;
  }

  isReleased(): boolean {
    return this.released;
  }
}
