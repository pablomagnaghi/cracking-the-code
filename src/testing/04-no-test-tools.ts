// 11.04. No Test Tools
//
// How would you load test a webpage without using any test tools?
//
// Approach:
//   Build a simple load tester that simulates concurrent requests using
//   Promises. For each simulated request, we invoke a user-provided
//   request function and measure the response time. After all requests
//   complete, we compute statistics: min, max, average, p95 response
//   times, and error rate.
//
//   In a real scenario the request function would make HTTP calls (e.g.
//   using fetch or XMLHttpRequest). Here we abstract it behind a
//   callback so the LoadTester is testable without a live server.
//
// Example:
//   const tester = new LoadTester({
//     concurrentUsers: 10,
//     requestsPerUser: 5,
//     requestFn: async () => fetch('https://example.com'),
//   });
//   const result = await tester.run();
//   result.avgResponseTime // e.g. 120 (ms)
//   result.p95ResponseTime // e.g. 250 (ms)
//
// Constraints:
//   - No external testing frameworks or load testing tools.
//   - Concurrency is simulated via Promises (not true parallelism).
//   - The requestFn should resolve on success and throw on failure.

export interface LoadTestConfig {
  concurrentUsers: number;
  requestsPerUser: number;
  requestFn: () => Promise<void>;
}

export interface LoadTestResult {
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  errorRate: number;
  minResponseTime: number;
  maxResponseTime: number;
  avgResponseTime: number;
  p95ResponseTime: number;
  totalDuration: number;
  responseTimes: number[];
}

interface RequestOutcome {
  success: boolean;
  duration: number;
}

export class LoadTester {
  private config: LoadTestConfig;

  constructor(config: LoadTestConfig) {
    if (config.concurrentUsers <= 0) {
      throw new Error('concurrentUsers must be positive');
    }
    if (config.requestsPerUser <= 0) {
      throw new Error('requestsPerUser must be positive');
    }
    this.config = config;
  }

  /**
   * Executes a single request and measures its duration.
   */
  private async executeRequest(): Promise<RequestOutcome> {
    const start = performance.now();
    try {
      await this.config.requestFn();
      const duration = performance.now() - start;
      return { success: true, duration };
    } catch {
      const duration = performance.now() - start;
      return { success: false, duration };
    }
  }

  /**
   * Simulates a single user making sequential requests.
   */
  private async simulateUser(): Promise<RequestOutcome[]> {
    const outcomes: RequestOutcome[] = [];
    for (let i = 0; i < this.config.requestsPerUser; i++) {
      const outcome = await this.executeRequest();
      outcomes.push(outcome);
    }
    return outcomes;
  }

  /**
   * Computes the p95 (95th percentile) value from a sorted array of numbers.
   */
  private computePercentile(sortedValues: number[], percentile: number): number {
    if (sortedValues.length === 0) return 0;
    const index = Math.ceil((percentile / 100) * sortedValues.length) - 1;
    return sortedValues[Math.max(0, index)];
  }

  /**
   * Runs the full load test: launches concurrent users, collects results,
   * and computes statistics.
   */
  async run(): Promise<LoadTestResult> {
    const overallStart = performance.now();

    // Launch all simulated users concurrently
    const userPromises: Promise<RequestOutcome[]>[] = [];
    for (let i = 0; i < this.config.concurrentUsers; i++) {
      userPromises.push(this.simulateUser());
    }

    const allUserOutcomes = await Promise.all(userPromises);
    const totalDuration = performance.now() - overallStart;

    // Flatten outcomes from all users
    const allOutcomes: RequestOutcome[] = allUserOutcomes.flat();

    const totalRequests = allOutcomes.length;
    const successfulRequests = allOutcomes.filter((o) => o.success).length;
    const failedRequests = totalRequests - successfulRequests;
    const errorRate = totalRequests > 0 ? failedRequests / totalRequests : 0;

    const responseTimes = allOutcomes.map((o) => o.duration);
    const sortedTimes = [...responseTimes].sort((a, b) => a - b);

    const minResponseTime = sortedTimes.length > 0 ? sortedTimes[0] : 0;
    const maxResponseTime =
      sortedTimes.length > 0 ? sortedTimes[sortedTimes.length - 1] : 0;
    const avgResponseTime =
      sortedTimes.length > 0
        ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
        : 0;
    const p95ResponseTime = this.computePercentile(sortedTimes, 95);

    return {
      totalRequests,
      successfulRequests,
      failedRequests,
      errorRate,
      minResponseTime,
      maxResponseTime,
      avgResponseTime,
      p95ResponseTime,
      totalDuration,
      responseTimes,
    };
  }
}
