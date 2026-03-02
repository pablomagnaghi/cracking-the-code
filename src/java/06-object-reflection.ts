// 13.06. Object Reflection
//
// Explain what object reflection is in Java and why it is useful.
// Reflection allows inspecting and manipulating classes, methods, and fields
// at runtime. It is used for frameworks, serialization, dependency injection,
// and testing. TypeScript has limited reflection but supports runtime
// introspection via typeof, instanceof, Object methods, and property
// descriptors.
//
// Approach:
//   Create a ReflectionHelper class with static methods that inspect objects
//   at runtime: listing properties, checking types, verifying prototype
//   chains, and producing human-readable descriptions of object shape.
//
// Example:
//   ReflectionHelper.getProperties({ x: 1, y: 'hi' });
//   // ['x', 'y']
//
//   ReflectionHelper.getType(42);       // 'number'
//   ReflectionHelper.getType([1, 2]);   // 'array'
//
//   ReflectionHelper.isInstanceOf(new Date(), Date); // true
//
// Constraints:
//   - Works with any JavaScript value (primitives, objects, arrays, classes)
//   - getType returns more specific types than typeof (e.g. 'array', 'null')
//   - describe returns a map of property names to their types

export class ReflectionHelper {
  static getProperties(obj: object): string[] {
    return Object.keys(obj);
  }

  static getAllProperties(obj: object): string[] {
    const props: string[] = [];
    let current: object | null = obj;
    while (current && current !== Object.prototype) {
      props.push(...Object.getOwnPropertyNames(current).filter(p => !props.includes(p)));
      current = Object.getPrototypeOf(current);
    }
    return props;
  }

  static getType(value: unknown): string {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (Array.isArray(value)) return 'array';
    if (value instanceof Date) return 'date';
    if (value instanceof RegExp) return 'regexp';
    if (value instanceof Map) return 'map';
    if (value instanceof Set) return 'set';
    return typeof value;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  static isInstanceOf(value: unknown, constructor: Function): boolean {
    if (value === null || value === undefined) return false;
    return value instanceof constructor;
  }

  static describe(obj: object): Record<string, string> {
    const description: Record<string, string> = {};
    for (const key of Object.keys(obj)) {
      description[key] = ReflectionHelper.getType((obj as Record<string, unknown>)[key]);
    }
    return description;
  }

  static getMethods(obj: object): string[] {
    const methods: string[] = [];
    let current: object | null = Object.getPrototypeOf(obj);
    while (current && current !== Object.prototype) {
      for (const name of Object.getOwnPropertyNames(current)) {
        if (
          name !== 'constructor' &&
          typeof (current as Record<string, unknown>)[name] === 'function' &&
          !methods.includes(name)
        ) {
          methods.push(name);
        }
      }
      current = Object.getPrototypeOf(current);
    }
    return methods;
  }

  static getClassName(obj: object): string {
    return obj.constructor.name;
  }

  static hasProperty(obj: object, property: string): boolean {
    return property in obj;
  }

  static isWritable(obj: object, property: string): boolean {
    const descriptor = Object.getOwnPropertyDescriptor(obj, property);
    return descriptor ? descriptor.writable !== false : false;
  }
}
