// 13.02. Return from Finally
//
// In Java, does the finally block execute if we insert a return statement
// inside the try block of a try-catch-finally? Yes, the finally block always
// executes regardless of whether the try block returns, throws, or completes
// normally. TypeScript/JavaScript follows the same behavior.
//
// Approach:
//   Demonstrate that the finally block executes in every scenario: normal
//   return from try, exception thrown in try, and return from catch. Also
//   show a practical use case for resource cleanup using try-finally.
//
// Example:
//   finallyBehavior('normal');
//   // returns { result: 'try-return', finallyExecuted: true }
//
//   const resource = resourceCleanup();
//   resource.isClosed; // true — finally closed it
//
// Constraints:
//   - finally always executes regardless of control flow
//   - If both try and finally have return statements, the finally return wins

export interface FinallyResult {
  result: string;
  finallyExecuted: boolean;
  log: string[];
}

export function finallyBehavior(mode: 'normal' | 'error' | 'catch-return'): FinallyResult {
  const log: string[] = [];
  let finallyExecuted = false;

  const execute = (): string => {
    try {
      log.push('try-entered');

      if (mode === 'error') {
        throw new Error('intentional error');
      }

      if (mode === 'normal') {
        log.push('try-returning');
        return 'try-return';
      }

      // mode === 'catch-return' — force an error so we enter catch
      throw new Error('catch-test');
    } catch (e) {
      log.push('catch-entered');
      if (mode === 'catch-return') {
        log.push('catch-returning');
        return 'catch-return';
      }
      return 'catch-error';
    } finally {
      log.push('finally-executed');
      finallyExecuted = true;
    }
  };

  const result = execute();
  return { result, finallyExecuted, log };
}

export interface ManagedResource {
  data: string;
  isClosed: boolean;
  operations: string[];
}

export function resourceCleanup(shouldError: boolean = false): ManagedResource {
  const resource: ManagedResource = {
    data: '',
    isClosed: false,
    operations: [],
  };

  try {
    resource.operations.push('open');
    resource.data = 'processed-data';
    resource.operations.push('process');

    if (shouldError) {
      throw new Error('processing failed');
    }

    resource.operations.push('complete');
  } catch {
    resource.operations.push('error-handled');
    resource.data = 'error-recovery';
  } finally {
    resource.isClosed = true;
    resource.operations.push('closed');
  }

  return resource;
}

export function finallyOverridesReturn(): string {
  const run = (): string => {
    try {
      return 'from-try';
    } finally {
      // In JavaScript/TypeScript, a return in finally overrides the try return
      // eslint-disable-next-line no-unsafe-finally
      return 'from-finally';
    }
  };

  return run();
}
