// 12.06. Volatile
//
// What is the significance of the keyword "volatile" in C?
//
// In C/C++, the volatile keyword tells the compiler that a variable's value
// may change at any time (e.g., by hardware, an interrupt handler, or another
// thread). The compiler must not cache the value in a register or optimize
// away reads/writes to that variable.
//
// Adapted: demonstrate the concept using a SharedState class that simulates
// volatile-like behavior. Every read goes through a getter that always fetches
// from the underlying store, and every write goes through a setter that
// notifies registered listeners (simulating how volatile variables are
// observed in multi-threaded or hardware contexts).
//
// Approach:
//   - Store values in a private Map, keyed by property name.
//   - get() always reads from the Map (never cached).
//   - set() writes to the Map and fires onChange callbacks.
//   - onChange() registers listeners for a given key.
//
// Example:
//   const state = new SharedState();
//   state.set("flag", false);
//   state.onChange("flag", (val) => console.log("flag changed:", val));
//   state.set("flag", true); // triggers listener
//
// Constraints:
//   - Listeners are called synchronously on set().
//   - Multiple listeners per key are supported.

type Listener<T = unknown> = (newValue: T, oldValue: T | undefined) => void;

export class SharedState {
  private store: Map<string, unknown> = new Map();
  private listeners: Map<string, Array<Listener>> = new Map();

  get<T = unknown>(key: string): T | undefined {
    // Always read from the store, never from a cached value.
    // This mirrors the volatile guarantee: every read accesses the actual memory.
    return this.store.get(key) as T | undefined;
  }

  set<T = unknown>(key: string, value: T): void {
    const oldValue = this.store.get(key);
    // Always write to the store, never optimized away.
    this.store.set(key, value);

    // Notify listeners (simulating interrupt / signal on volatile write)
    const keyListeners = this.listeners.get(key);
    if (keyListeners) {
      for (const listener of keyListeners) {
        listener(value, oldValue);
      }
    }
  }

  onChange<T = unknown>(key: string, listener: Listener<T>): () => void {
    if (!this.listeners.has(key)) {
      this.listeners.set(key, []);
    }
    this.listeners.get(key)!.push(listener as Listener);

    // Return an unsubscribe function
    return () => {
      const keyListeners = this.listeners.get(key);
      if (keyListeners) {
        const index = keyListeners.indexOf(listener as Listener);
        if (index !== -1) {
          keyListeners.splice(index, 1);
        }
      }
    };
  }

  has(key: string): boolean {
    return this.store.has(key);
  }

  keys(): string[] {
    return Array.from(this.store.keys());
  }
}
