import {
  Disposable,
  Resource,
  DerivedResource,
} from '../../src/c-and-cpp/07-virtual-base-class';

describe('Disposable pattern (virtual base class)', () => {
  test('Resource starts as not disposed', () => {
    const r = new Resource('file-handle');
    expect(r.isDisposed).toBe(false);
  });

  test('Resource.dispose() marks it as disposed', () => {
    const r = new Resource('socket');
    r.dispose();
    expect(r.isDisposed).toBe(true);
  });

  test('Resource.dispose() is idempotent', () => {
    const r = new Resource('connection');
    r.dispose();
    r.dispose(); // should not throw
    expect(r.isDisposed).toBe(true);
    expect(r.disposalLog).toEqual(['Disposed: connection']);
  });

  test('Resource logs disposal', () => {
    const r = new Resource('db-conn');
    r.dispose();
    expect(r.disposalLog).toEqual(['Disposed: db-conn']);
  });

  test('DerivedResource disposes derived then base', () => {
    const dr = new DerivedResource('base-handle', 'cache');
    dr.dispose();
    expect(dr.isDisposed).toBe(true);
    const log = dr.fullDisposalLog;
    expect(log).toEqual(['Disposed: cache', 'Disposed: base-handle']);
  });

  test('DerivedResource.dispose() is idempotent', () => {
    const dr = new DerivedResource('base', 'extra');
    dr.dispose();
    dr.dispose();
    expect(dr.fullDisposalLog).toEqual(['Disposed: extra', 'Disposed: base']);
  });

  test('DerivedResource is an instance of Resource', () => {
    const dr = new DerivedResource('a', 'b');
    expect(dr instanceof Resource).toBe(true);
  });

  test('polymorphic disposal through base type', () => {
    const resources: Disposable[] = [
      new Resource('r1'),
      new DerivedResource('r2-base', 'r2-extra'),
    ];
    for (const r of resources) {
      r.dispose();
    }
    expect(resources[0].isDisposed).toBe(true);
    expect(resources[1].isDisposed).toBe(true);
  });

  test('DerivedResource exposes resource names', () => {
    const dr = new DerivedResource('primary', 'secondary');
    expect(dr.resourceName).toBe('primary');
    expect(dr.extraResourceName).toBe('secondary');
  });
});
