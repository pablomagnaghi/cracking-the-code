// 11.02. Random Crashes
//
// You are given the source to an application which crashes when it is run.
// After running it ten times in a debugger, you find it never crashes in
// the same place. The application is single threaded, and uses only the C
// standard library. What programming errors could be causing this crash?
// How would you test each one?
//
// Approach:
//   Common causes of non-deterministic crashes in a single-threaded C program:
//   1. Uninitialized variables - reading garbage values from the stack.
//   2. Memory leaks / heap corruption - writing past allocated memory.
//   3. Null pointer dereference - accessing a pointer that was not checked.
//   4. Buffer overflow - writing beyond array bounds.
//   5. Dangling pointers - using memory after it has been freed.
//
//   We model a CrashAnalyzer class that can detect these issues in a
//   simulated environment and a simulateRandomBehavior function that
//   demonstrates how uninitialized state leads to different results.
//
// Example:
//   const analyzer = new CrashAnalyzer();
//   analyzer.analyzePotentialCauses() => [CrashCause.UninitializedVariable, ...]
//   analyzer.simulateRandomBehavior() => varying numbers on each call
//
// Constraints:
//   - The application is single-threaded (no race conditions).
//   - Only the C standard library is used (no third-party libraries).

export enum CrashCause {
  UninitializedVariable = 'UNINITIALIZED_VARIABLE',
  MemoryLeak = 'MEMORY_LEAK',
  NullPointerAccess = 'NULL_POINTER_ACCESS',
  BufferOverflow = 'BUFFER_OVERFLOW',
  DanglingPointer = 'DANGLING_POINTER',
}

export interface CrashDiagnostic {
  cause: CrashCause;
  description: string;
  testStrategy: string;
}

export class CrashAnalyzer {
  private symptoms: Set<string> = new Set();

  /**
   * Register an observed symptom from the crashing application.
   */
  addSymptom(symptom: string): void {
    this.symptoms.add(symptom.toLowerCase());
  }

  /**
   * Returns all potential crash causes with descriptions and testing strategies.
   */
  analyzePotentialCauses(): CrashDiagnostic[] {
    return [
      {
        cause: CrashCause.UninitializedVariable,
        description:
          'Local variables on the stack contain garbage values. Reading them ' +
          'produces different results depending on what was previously in that ' +
          'memory location, causing non-deterministic behavior.',
        testStrategy:
          'Compile with -Wall -Werror to catch uninitialized variable warnings. ' +
          'Use tools like Valgrind (--track-origins=yes) or compiler sanitizers ' +
          '(-fsanitize=memory) to detect reads of uninitialized memory at runtime.',
      },
      {
        cause: CrashCause.MemoryLeak,
        description:
          'Heap corruption from writing past allocated memory boundaries or ' +
          'double-freeing memory can corrupt malloc metadata, causing crashes ' +
          'at seemingly random allocation or deallocation points.',
        testStrategy:
          'Run under Valgrind or AddressSanitizer (-fsanitize=address) to ' +
          'detect heap buffer overflows, use-after-free, and double-free errors.',
      },
      {
        cause: CrashCause.NullPointerAccess,
        description:
          'Dereferencing a NULL pointer returned by a failed allocation or ' +
          'lookup. The crash location varies because NULL checks are missing ' +
          'at different call sites.',
        testStrategy:
          'Add NULL checks after every malloc/calloc/realloc call. Use static ' +
          'analysis tools to find unchecked pointer dereferences.',
      },
      {
        cause: CrashCause.BufferOverflow,
        description:
          'Writing beyond the bounds of a stack or heap buffer. Overwrites ' +
          'adjacent memory, which may include return addresses or other data ' +
          'structures, causing crashes at unpredictable locations.',
        testStrategy:
          'Use AddressSanitizer or Valgrind to detect out-of-bounds accesses. ' +
          'Replace unsafe functions (gets, sprintf, strcpy) with bounded ' +
          'alternatives (fgets, snprintf, strncpy).',
      },
      {
        cause: CrashCause.DanglingPointer,
        description:
          'Using a pointer after the memory it points to has been freed. The ' +
          'freed memory may be reallocated for a different purpose, so ' +
          'dereferencing the old pointer reads unpredictable data.',
        testStrategy:
          'Set pointers to NULL after freeing them. Use AddressSanitizer to ' +
          'detect use-after-free errors. Review code for pointer lifetimes.',
      },
    ];
  }

  /**
   * Checks if a specific crash cause matches the observed symptoms.
   */
  checkForCause(cause: CrashCause): boolean {
    switch (cause) {
      case CrashCause.UninitializedVariable:
        return (
          this.symptoms.has('random values') ||
          this.symptoms.has('different output each run')
        );
      case CrashCause.MemoryLeak:
        return (
          this.symptoms.has('increasing memory usage') ||
          this.symptoms.has('heap corruption')
        );
      case CrashCause.NullPointerAccess:
        return (
          this.symptoms.has('segfault') ||
          this.symptoms.has('null dereference')
        );
      case CrashCause.BufferOverflow:
        return (
          this.symptoms.has('stack smashing') ||
          this.symptoms.has('corrupted data')
        );
      case CrashCause.DanglingPointer:
        return (
          this.symptoms.has('use after free') ||
          this.symptoms.has('stale pointer')
        );
      default:
        return false;
    }
  }

  /**
   * Simulates the non-deterministic behavior caused by uninitialized variables.
   * Each call returns a different "random" value, modeling what happens when
   * reading stack garbage.
   */
  simulateRandomBehavior(): number {
    // Simulate reading an "uninitialized" variable by producing a
    // pseudo-random value based on current time and Math.random.
    const stackGarbage =
      Math.floor(Math.random() * 0xffffffff) ^
      (Date.now() & 0xffffffff);
    return stackGarbage >>> 0; // ensure unsigned 32-bit
  }

  /**
   * Returns a summary of matching causes based on registered symptoms.
   */
  getMatchingCauses(): CrashCause[] {
    const allCauses = Object.values(CrashCause);
    return allCauses.filter((cause) => this.checkForCause(cause));
  }
}
