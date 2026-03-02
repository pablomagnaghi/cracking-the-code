import { SmartPointer } from '../../src/c-and-cpp/09-smart-pointer';

describe('SmartPointer', () => {
  test('get returns the stored value', () => {
    const sp = new SmartPointer({ data: 42 });
    expect(sp.get()).toEqual({ data: 42 });
  });

  test('initial useCount is 1', () => {
    const sp = new SmartPointer('hello');
    expect(sp.useCount()).toBe(1);
  });

  test('clone increments useCount', () => {
    const sp1 = new SmartPointer(100);
    const sp2 = sp1.clone();
    expect(sp1.useCount()).toBe(2);
    expect(sp2.useCount()).toBe(2);
    expect(sp2.get()).toBe(100);
  });

  test('release decrements useCount', () => {
    const sp1 = new SmartPointer('value');
    const sp2 = sp1.clone();
    sp1.release();
    expect(sp1.useCount()).toBe(0);
    expect(sp1.isReleased()).toBe(true);
    expect(sp2.useCount()).toBe(1);
    expect(sp2.get()).toBe('value');
  });

  test('destructor fires when last reference is released', () => {
    let destroyed = false;
    const sp = new SmartPointer({ x: 1 }, () => {
      destroyed = true;
    });
    sp.release();
    expect(destroyed).toBe(true);
  });

  test('destructor does not fire when references remain', () => {
    let destroyed = false;
    const sp1 = new SmartPointer('data', () => {
      destroyed = true;
    });
    const sp2 = sp1.clone();
    sp1.release();
    expect(destroyed).toBe(false);
    sp2.release();
    expect(destroyed).toBe(true);
  });

  test('get returns undefined after all references released', () => {
    const sp1 = new SmartPointer(42);
    const sp2 = sp1.clone();
    sp1.release();
    sp2.release();
    expect(sp1.get()).toBeUndefined();
    expect(sp2.get()).toBeUndefined();
  });

  test('release is idempotent', () => {
    const sp = new SmartPointer('test');
    sp.release();
    sp.release(); // should not throw
    expect(sp.isReleased()).toBe(true);
    expect(sp.useCount()).toBe(0);
  });

  test('cannot clone a released pointer', () => {
    const sp = new SmartPointer(1);
    sp.release();
    expect(() => sp.clone()).toThrow('Cannot clone a released SmartPointer');
  });

  test('multiple clones track useCount correctly', () => {
    const sp1 = new SmartPointer('shared');
    const sp2 = sp1.clone();
    const sp3 = sp1.clone();
    expect(sp1.useCount()).toBe(3);
    sp2.release();
    expect(sp1.useCount()).toBe(2);
    sp3.release();
    expect(sp1.useCount()).toBe(1);
    sp1.release();
    expect(sp1.useCount()).toBe(0);
  });
});
