import { CrashCause, CrashAnalyzer } from '../../src/testing/02-random-crashes';

describe('CrashAnalyzer', () => {
  test('analyzePotentialCauses returns all five crash causes', () => {
    const analyzer = new CrashAnalyzer();
    const causes = analyzer.analyzePotentialCauses();
    expect(causes).toHaveLength(5);

    const causeTypes = causes.map((c) => c.cause);
    expect(causeTypes).toContain(CrashCause.UninitializedVariable);
    expect(causeTypes).toContain(CrashCause.MemoryLeak);
    expect(causeTypes).toContain(CrashCause.NullPointerAccess);
    expect(causeTypes).toContain(CrashCause.BufferOverflow);
    expect(causeTypes).toContain(CrashCause.DanglingPointer);
  });

  test('each diagnostic includes a description and test strategy', () => {
    const analyzer = new CrashAnalyzer();
    const causes = analyzer.analyzePotentialCauses();

    for (const diagnostic of causes) {
      expect(diagnostic.description.length).toBeGreaterThan(0);
      expect(diagnostic.testStrategy.length).toBeGreaterThan(0);
    }
  });

  test('checkForCause detects uninitialized variable from symptom', () => {
    const analyzer = new CrashAnalyzer();
    analyzer.addSymptom('random values');
    expect(analyzer.checkForCause(CrashCause.UninitializedVariable)).toBe(true);
    expect(analyzer.checkForCause(CrashCause.MemoryLeak)).toBe(false);
  });

  test('checkForCause detects null pointer access from segfault symptom', () => {
    const analyzer = new CrashAnalyzer();
    analyzer.addSymptom('segfault');
    expect(analyzer.checkForCause(CrashCause.NullPointerAccess)).toBe(true);
    expect(analyzer.checkForCause(CrashCause.BufferOverflow)).toBe(false);
  });

  test('checkForCause detects buffer overflow from stack smashing symptom', () => {
    const analyzer = new CrashAnalyzer();
    analyzer.addSymptom('stack smashing');
    expect(analyzer.checkForCause(CrashCause.BufferOverflow)).toBe(true);
  });

  test('checkForCause detects dangling pointer from use-after-free symptom', () => {
    const analyzer = new CrashAnalyzer();
    analyzer.addSymptom('use after free');
    expect(analyzer.checkForCause(CrashCause.DanglingPointer)).toBe(true);
  });

  test('getMatchingCauses returns only causes matching symptoms', () => {
    const analyzer = new CrashAnalyzer();
    analyzer.addSymptom('heap corruption');
    analyzer.addSymptom('segfault');

    const matches = analyzer.getMatchingCauses();
    expect(matches).toContain(CrashCause.MemoryLeak);
    expect(matches).toContain(CrashCause.NullPointerAccess);
    expect(matches).not.toContain(CrashCause.UninitializedVariable);
    expect(matches).not.toContain(CrashCause.BufferOverflow);
  });

  test('simulateRandomBehavior returns different values (non-deterministic)', () => {
    const analyzer = new CrashAnalyzer();
    const results = new Set<number>();
    for (let i = 0; i < 20; i++) {
      results.add(analyzer.simulateRandomBehavior());
    }
    // With 20 calls, we expect at least a few distinct values
    expect(results.size).toBeGreaterThan(1);
  });

  test('simulateRandomBehavior returns unsigned 32-bit integers', () => {
    const analyzer = new CrashAnalyzer();
    for (let i = 0; i < 10; i++) {
      const value = analyzer.simulateRandomBehavior();
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(0xffffffff);
      expect(Number.isInteger(value)).toBe(true);
    }
  });
});
