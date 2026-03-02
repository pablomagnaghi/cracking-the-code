import { ReflectionHelper } from '../../src/java/06-object-reflection';

describe('ReflectionHelper', () => {
  describe('getProperties', () => {
    test('returns own enumerable property names', () => {
      const obj = { x: 1, y: 'hello', z: true };
      expect(ReflectionHelper.getProperties(obj)).toEqual(['x', 'y', 'z']);
    });

    test('returns empty array for empty object', () => {
      expect(ReflectionHelper.getProperties({})).toEqual([]);
    });
  });

  describe('getAllProperties', () => {
    test('includes inherited properties from custom prototypes', () => {
      class Base {
        baseMethod(): void {}
      }
      class Child extends Base {
        childProp = 42;
      }
      const obj = new Child();
      const props = ReflectionHelper.getAllProperties(obj);
      expect(props).toContain('childProp');
      expect(props).toContain('constructor');
      expect(props).toContain('baseMethod');
    });
  });

  describe('getType', () => {
    test('returns correct types for primitives', () => {
      expect(ReflectionHelper.getType(42)).toBe('number');
      expect(ReflectionHelper.getType('hello')).toBe('string');
      expect(ReflectionHelper.getType(true)).toBe('boolean');
      expect(ReflectionHelper.getType(undefined)).toBe('undefined');
    });

    test('returns null for null', () => {
      expect(ReflectionHelper.getType(null)).toBe('null');
    });

    test('returns specific types for built-in objects', () => {
      expect(ReflectionHelper.getType([])).toBe('array');
      expect(ReflectionHelper.getType([1, 2])).toBe('array');
      expect(ReflectionHelper.getType(new Date())).toBe('date');
      expect(ReflectionHelper.getType(/regex/)).toBe('regexp');
      expect(ReflectionHelper.getType(new Map())).toBe('map');
      expect(ReflectionHelper.getType(new Set())).toBe('set');
    });

    test('returns object for plain objects', () => {
      expect(ReflectionHelper.getType({})).toBe('object');
      expect(ReflectionHelper.getType({ a: 1 })).toBe('object');
    });

    test('returns function for functions', () => {
      expect(ReflectionHelper.getType(() => {})).toBe('function');
    });
  });

  describe('isInstanceOf', () => {
    test('returns true for matching constructors', () => {
      expect(ReflectionHelper.isInstanceOf(new Date(), Date)).toBe(true);
      expect(ReflectionHelper.isInstanceOf([], Array)).toBe(true);
    });

    test('returns false for non-matching constructors', () => {
      expect(ReflectionHelper.isInstanceOf('hello', Array)).toBe(false);
      expect(ReflectionHelper.isInstanceOf(42, Date)).toBe(false);
    });

    test('returns false for null and undefined', () => {
      expect(ReflectionHelper.isInstanceOf(null, Object)).toBe(false);
      expect(ReflectionHelper.isInstanceOf(undefined, Object)).toBe(false);
    });

    test('works with custom classes', () => {
      class Foo {}
      class Bar extends Foo {}
      const bar = new Bar();
      expect(ReflectionHelper.isInstanceOf(bar, Bar)).toBe(true);
      expect(ReflectionHelper.isInstanceOf(bar, Foo)).toBe(true);
    });
  });

  describe('describe', () => {
    test('returns a map of property names to types', () => {
      const obj = { name: 'Alice', age: 30, active: true, scores: [1, 2] };
      const desc = ReflectionHelper.describe(obj);
      expect(desc).toEqual({
        name: 'string',
        age: 'number',
        active: 'boolean',
        scores: 'array',
      });
    });
  });

  describe('getMethods', () => {
    test('returns method names from the prototype', () => {
      class MyClass {
        greet(): string {
          return 'hi';
        }
        farewell(): string {
          return 'bye';
        }
      }
      const obj = new MyClass();
      const methods = ReflectionHelper.getMethods(obj);
      expect(methods).toContain('greet');
      expect(methods).toContain('farewell');
      expect(methods).not.toContain('constructor');
    });
  });

  describe('getClassName', () => {
    test('returns the constructor name', () => {
      expect(ReflectionHelper.getClassName(new Date())).toBe('Date');
      expect(ReflectionHelper.getClassName([])).toBe('Array');
      expect(ReflectionHelper.getClassName({})).toBe('Object');
    });
  });

  describe('hasProperty', () => {
    test('checks own and inherited properties', () => {
      const obj = { x: 1 };
      expect(ReflectionHelper.hasProperty(obj, 'x')).toBe(true);
      expect(ReflectionHelper.hasProperty(obj, 'toString')).toBe(true);
      expect(ReflectionHelper.hasProperty(obj, 'nonexistent')).toBe(false);
    });
  });
});
