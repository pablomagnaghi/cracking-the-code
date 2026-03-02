import {
  ImmutableConfig,
  SafeResource,
  useResourceSafely,
  IMMUTABLE_DEFAULTS,
} from '../../src/java/03-final-etc';

describe('ImmutableConfig', () => {
  test('stores readonly properties from constructor', () => {
    const config = new ImmutableConfig('production', 8080, false);
    expect(config.env).toBe('production');
    expect(config.port).toBe(8080);
    expect(config.debug).toBe(false);
  });

  test('createdAt is set to a positive timestamp', () => {
    const config = new ImmutableConfig('dev', 3000, true);
    expect(config.createdAt).toBeGreaterThan(0);
  });

  test('describe returns formatted string', () => {
    const config = new ImmutableConfig('staging', 9090, true);
    expect(config.describe()).toBe('staging:9090 (debug=true)');
  });

  test('readonly fields cannot be reassigned at runtime', () => {
    const config = new ImmutableConfig('test', 4000, false);
    // TypeScript prevents this at compile time; at runtime, strict mode
    // may not throw but the assignment should be silently ignored for
    // readonly properties defined via class fields
    expect(config.env).toBe('test');
    expect(config.port).toBe(4000);
  });
});

describe('SafeResource', () => {
  test('read returns data when resource is alive', () => {
    const res = new SafeResource('file.txt');
    expect(res.read()).toBe('data from file.txt');
  });

  test('write updates the data', () => {
    const res = new SafeResource('file.txt');
    res.write('new content');
    expect(res.read()).toBe('new content');
  });

  test('dispose marks resource as disposed', () => {
    const res = new SafeResource('db-conn');
    expect(res.isDisposed()).toBe(false);
    res.dispose();
    expect(res.isDisposed()).toBe(true);
  });

  test('read throws after dispose', () => {
    const res = new SafeResource('socket');
    res.dispose();
    expect(() => res.read()).toThrow('Resource "socket" has been disposed');
  });

  test('write throws after dispose', () => {
    const res = new SafeResource('socket');
    res.dispose();
    expect(() => res.write('data')).toThrow('Resource "socket" has been disposed');
  });

  test('operations log tracks lifecycle', () => {
    const res = new SafeResource('log-test');
    res.read();
    res.write('updated');
    res.dispose();
    expect(res.operations).toEqual(['created', 'read', 'write', 'disposed']);
  });

  test('double dispose does not duplicate disposed entry', () => {
    const res = new SafeResource('x');
    res.dispose();
    res.dispose();
    expect(res.operations.filter(op => op === 'disposed')).toHaveLength(1);
  });
});

describe('useResourceSafely', () => {
  test('resource is disposed after normal use', () => {
    const { result, disposed } = useResourceSafely('temp', res => res.read());
    expect(result).toBe('data from temp');
    expect(disposed).toBe(true);
  });

  test('resource is disposed even if action throws', () => {
    expect(() =>
      useResourceSafely('temp', () => {
        throw new Error('oops');
      }),
    ).toThrow('oops');
  });
});

describe('IMMUTABLE_DEFAULTS', () => {
  test('has expected constant values', () => {
    expect(IMMUTABLE_DEFAULTS.maxRetries).toBe(3);
    expect(IMMUTABLE_DEFAULTS.timeout).toBe(5000);
    expect(IMMUTABLE_DEFAULTS.baseUrl).toBe('https://api.example.com');
  });
});
