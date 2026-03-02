// 13.04. Generics vs Templates
//
// Explain the difference between C++ templates and Java generics.
//   - C++ templates generate separate code for each type (monomorphization)
//   - Java generics use type erasure; types exist only at compile time
//   - TypeScript generics are similar to Java: erased at compile time,
//     but offer advanced features like conditional types, mapped types,
//     and generic constraints
//
// Approach:
//   Demonstrate TypeScript generics with:
//   - TypedContainer<T>: a generic wrapper with type-safe operations
//   - Pair<A, B>: a generic pair holding two different types
//   - filterByType<T>: a generic function filtering arrays by a predicate
//   - merge: merging two objects with generics preserving types
//
// Example:
//   const c = new TypedContainer<number>(42);
//   c.getValue(); // 42
//   c.map(x => x * 2).getValue(); // 84
//
//   const p = new Pair('hello', 42);
//   p.getFirst(); // 'hello'
//
// Constraints:
//   - Type safety should be enforced at compile time
//   - Container operations should be chainable via map

export class TypedContainer<T> {
  private readonly value: T;

  constructor(value: T) {
    this.value = value;
  }

  getValue(): T {
    return this.value;
  }

  map<U>(fn: (value: T) => U): TypedContainer<U> {
    return new TypedContainer(fn(this.value));
  }

  flatMap<U>(fn: (value: T) => TypedContainer<U>): TypedContainer<U> {
    return fn(this.value);
  }

  apply<U>(fn: TypedContainer<(value: T) => U>): TypedContainer<U> {
    return new TypedContainer(fn.getValue()(this.value));
  }

  equals(other: TypedContainer<T>): boolean {
    return this.value === other.getValue();
  }

  toString(): string {
    return `Container(${this.value})`;
  }
}

export class Pair<A, B> {
  private readonly first: A;
  private readonly second: B;

  constructor(first: A, second: B) {
    this.first = first;
    this.second = second;
  }

  getFirst(): A {
    return this.first;
  }

  getSecond(): B {
    return this.second;
  }

  swap(): Pair<B, A> {
    return new Pair(this.second, this.first);
  }

  mapFirst<C>(fn: (a: A) => C): Pair<C, B> {
    return new Pair(fn(this.first), this.second);
  }

  mapSecond<C>(fn: (b: B) => C): Pair<A, C> {
    return new Pair(this.first, fn(this.second));
  }

  toArray(): [A, B] {
    return [this.first, this.second];
  }

  toString(): string {
    return `(${this.first}, ${this.second})`;
  }
}

export function filterByType<T>(
  items: T[],
  predicate: (item: T) => boolean,
): T[] {
  return items.filter(predicate);
}

export function merge<A extends object, B extends object>(a: A, b: B): A & B {
  return { ...a, ...b };
}

export function mapArray<T, U>(items: T[], fn: (item: T) => U): U[] {
  return items.map(fn);
}

export function findFirst<T>(items: T[], predicate: (item: T) => boolean): T | undefined {
  return items.find(predicate);
}
