// 12.04. Virtual Functions
//
// How do virtual functions work in C++?
//
// In C++, virtual functions enable runtime polymorphism through a vtable
// (virtual function table). Each class with virtual functions has a vtable
// containing pointers to the most-derived implementations. When a virtual
// function is called on a base-class pointer, the vtable is consulted at
// runtime to dispatch the correct overridden version.
//
// Adapted: demonstrate polymorphism in TypeScript using abstract classes and
// method overriding. TypeScript achieves the same polymorphic dispatch
// natively through its prototype chain.
//
// Approach:
//   - Define an abstract Shape class with abstract area() and perimeter() methods.
//   - Implement Circle and Rectangle as concrete subclasses.
//   - A polymorphic describeShape() function accepts any Shape and calls
//     the overridden methods, mirroring virtual function dispatch.
//
// Example:
//   const shapes: Shape[] = [new Circle(5), new Rectangle(3, 4)];
//   shapes.map(s => s.area()); // [78.54, 12]
//
// Constraints:
//   - Circle requires a positive radius.
//   - Rectangle requires positive width and height.

export abstract class Shape {
  abstract area(): number;
  abstract perimeter(): number;
  abstract describe(): string;
}

export class Circle extends Shape {
  constructor(public readonly radius: number) {
    super();
  }

  area(): number {
    return Math.PI * this.radius * this.radius;
  }

  perimeter(): number {
    return 2 * Math.PI * this.radius;
  }

  describe(): string {
    return `Circle(radius=${this.radius})`;
  }
}

export class Rectangle extends Shape {
  constructor(
    public readonly width: number,
    public readonly height: number,
  ) {
    super();
  }

  area(): number {
    return this.width * this.height;
  }

  perimeter(): number {
    return 2 * (this.width + this.height);
  }

  describe(): string {
    return `Rectangle(width=${this.width}, height=${this.height})`;
  }
}

/** Demonstrates polymorphic dispatch (like calling through a base-class pointer in C++). */
export function describeShape(shape: Shape): string {
  return `${shape.describe()}: area=${shape.area().toFixed(2)}, perimeter=${shape.perimeter().toFixed(2)}`;
}
