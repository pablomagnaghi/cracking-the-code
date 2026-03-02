import {
  Shape,
  Circle,
  Rectangle,
  describeShape,
} from '../../src/c-and-cpp/04-virtual-functions';

describe('Virtual Functions (Polymorphism)', () => {
  test('Circle computes correct area', () => {
    const c = new Circle(5);
    expect(c.area()).toBeCloseTo(Math.PI * 25, 10);
  });

  test('Circle computes correct perimeter', () => {
    const c = new Circle(3);
    expect(c.perimeter()).toBeCloseTo(2 * Math.PI * 3, 10);
  });

  test('Rectangle computes correct area', () => {
    const r = new Rectangle(4, 6);
    expect(r.area()).toBe(24);
  });

  test('Rectangle computes correct perimeter', () => {
    const r = new Rectangle(4, 6);
    expect(r.perimeter()).toBe(20);
  });

  test('Circle describe returns correct string', () => {
    const c = new Circle(7);
    expect(c.describe()).toBe('Circle(radius=7)');
  });

  test('Rectangle describe returns correct string', () => {
    const r = new Rectangle(3, 5);
    expect(r.describe()).toBe('Rectangle(width=3, height=5)');
  });

  test('polymorphic dispatch works through base type', () => {
    const shapes: Shape[] = [new Circle(1), new Rectangle(2, 3)];
    const areas = shapes.map((s) => s.area());
    expect(areas[0]).toBeCloseTo(Math.PI, 10);
    expect(areas[1]).toBe(6);
  });

  test('describeShape produces formatted output for Circle', () => {
    const c = new Circle(10);
    const desc = describeShape(c);
    expect(desc).toContain('Circle(radius=10)');
    expect(desc).toContain('area=314.16');
    expect(desc).toContain('perimeter=62.83');
  });

  test('describeShape produces formatted output for Rectangle', () => {
    const r = new Rectangle(5, 10);
    const desc = describeShape(r);
    expect(desc).toContain('Rectangle(width=5, height=10)');
    expect(desc).toContain('area=50.00');
    expect(desc).toContain('perimeter=30.00');
  });

  test('Circle and Rectangle are instances of Shape', () => {
    const c = new Circle(1);
    const r = new Rectangle(1, 1);
    expect(c instanceof Shape).toBe(true);
    expect(r instanceof Shape).toBe(true);
  });
});
