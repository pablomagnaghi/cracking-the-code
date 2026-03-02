import {
  finallyBehavior,
  resourceCleanup,
  finallyOverridesReturn,
} from '../../src/java/02-return-from-finally';

describe('finallyBehavior', () => {
  test('finally executes when try returns normally', () => {
    const result = finallyBehavior('normal');
    expect(result.finallyExecuted).toBe(true);
    expect(result.result).toBe('try-return');
    expect(result.log).toContain('finally-executed');
  });

  test('finally executes when try throws an error', () => {
    const result = finallyBehavior('error');
    expect(result.finallyExecuted).toBe(true);
    expect(result.result).toBe('catch-error');
    expect(result.log).toContain('catch-entered');
    expect(result.log).toContain('finally-executed');
  });

  test('finally executes when catch returns', () => {
    const result = finallyBehavior('catch-return');
    expect(result.finallyExecuted).toBe(true);
    expect(result.result).toBe('catch-return');
    expect(result.log).toContain('catch-returning');
    expect(result.log).toContain('finally-executed');
  });

  test('log records correct order for normal mode', () => {
    const result = finallyBehavior('normal');
    expect(result.log).toEqual(['try-entered', 'try-returning', 'finally-executed']);
  });

  test('log records correct order for error mode', () => {
    const result = finallyBehavior('error');
    expect(result.log).toEqual(['try-entered', 'catch-entered', 'finally-executed']);
  });
});

describe('resourceCleanup', () => {
  test('resource is closed after successful processing', () => {
    const resource = resourceCleanup(false);
    expect(resource.isClosed).toBe(true);
    expect(resource.data).toBe('processed-data');
    expect(resource.operations).toEqual(['open', 'process', 'complete', 'closed']);
  });

  test('resource is closed even when processing fails', () => {
    const resource = resourceCleanup(true);
    expect(resource.isClosed).toBe(true);
    expect(resource.data).toBe('error-recovery');
    expect(resource.operations).toContain('error-handled');
    expect(resource.operations).toContain('closed');
  });

  test('error path includes open but not complete', () => {
    const resource = resourceCleanup(true);
    expect(resource.operations).toContain('open');
    expect(resource.operations).not.toContain('complete');
  });
});

describe('finallyOverridesReturn', () => {
  test('finally return overrides try return', () => {
    expect(finallyOverridesReturn()).toBe('from-finally');
  });
});
