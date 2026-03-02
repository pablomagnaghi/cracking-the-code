import { LoadTester, LoadTestConfig } from '../../src/testing/04-no-test-tools';

describe('LoadTester', () => {
  test('runs the correct total number of requests', async () => {
    const config: LoadTestConfig = {
      concurrentUsers: 3,
      requestsPerUser: 4,
      requestFn: async () => {},
    };
    const tester = new LoadTester(config);
    const result = await tester.run();

    expect(result.totalRequests).toBe(12);
    expect(result.responseTimes).toHaveLength(12);
  });

  test('counts all requests as successful when none fail', async () => {
    const config: LoadTestConfig = {
      concurrentUsers: 5,
      requestsPerUser: 2,
      requestFn: async () => {},
    };
    const tester = new LoadTester(config);
    const result = await tester.run();

    expect(result.successfulRequests).toBe(10);
    expect(result.failedRequests).toBe(0);
    expect(result.errorRate).toBe(0);
  });

  test('counts failed requests and computes error rate', async () => {
    let callCount = 0;
    const config: LoadTestConfig = {
      concurrentUsers: 1,
      requestsPerUser: 4,
      requestFn: async () => {
        callCount++;
        if (callCount % 2 === 0) throw new Error('simulated failure');
      },
    };
    const tester = new LoadTester(config);
    const result = await tester.run();

    expect(result.totalRequests).toBe(4);
    expect(result.failedRequests).toBe(2);
    expect(result.successfulRequests).toBe(2);
    expect(result.errorRate).toBe(0.5);
  });

  test('records all failures when every request fails', async () => {
    const config: LoadTestConfig = {
      concurrentUsers: 2,
      requestsPerUser: 3,
      requestFn: async () => {
        throw new Error('server down');
      },
    };
    const tester = new LoadTester(config);
    const result = await tester.run();

    expect(result.totalRequests).toBe(6);
    expect(result.failedRequests).toBe(6);
    expect(result.successfulRequests).toBe(0);
    expect(result.errorRate).toBe(1);
  });

  test('computes min, max, and avg response times', async () => {
    const delays = [10, 20, 30];
    let index = 0;
    const config: LoadTestConfig = {
      concurrentUsers: 1,
      requestsPerUser: 3,
      requestFn: async () => {
        const delay = delays[index++ % delays.length];
        await new Promise((resolve) => setTimeout(resolve, delay));
      },
    };
    const tester = new LoadTester(config);
    const result = await tester.run();

    expect(result.minResponseTime).toBeGreaterThanOrEqual(5);
    expect(result.maxResponseTime).toBeGreaterThanOrEqual(result.minResponseTime);
    expect(result.avgResponseTime).toBeGreaterThanOrEqual(result.minResponseTime);
    expect(result.avgResponseTime).toBeLessThanOrEqual(result.maxResponseTime);
  });

  test('p95 is greater than or equal to average', async () => {
    const config: LoadTestConfig = {
      concurrentUsers: 2,
      requestsPerUser: 10,
      requestFn: async () => {
        const delay = Math.random() * 10;
        await new Promise((resolve) => setTimeout(resolve, delay));
      },
    };
    const tester = new LoadTester(config);
    const result = await tester.run();

    expect(result.p95ResponseTime).toBeGreaterThanOrEqual(0);
    expect(result.totalRequests).toBe(20);
  });

  test('totalDuration is recorded', async () => {
    const config: LoadTestConfig = {
      concurrentUsers: 1,
      requestsPerUser: 1,
      requestFn: async () => {},
    };
    const tester = new LoadTester(config);
    const result = await tester.run();

    expect(result.totalDuration).toBeGreaterThanOrEqual(0);
  });

  test('throws error for invalid concurrentUsers', () => {
    expect(() => {
      new LoadTester({
        concurrentUsers: 0,
        requestsPerUser: 1,
        requestFn: async () => {},
      });
    }).toThrow('concurrentUsers must be positive');
  });

  test('throws error for invalid requestsPerUser', () => {
    expect(() => {
      new LoadTester({
        concurrentUsers: 1,
        requestsPerUser: -1,
        requestFn: async () => {},
      });
    }).toThrow('requestsPerUser must be positive');
  });

  test('response times array contains non-negative values', async () => {
    const config: LoadTestConfig = {
      concurrentUsers: 3,
      requestsPerUser: 3,
      requestFn: async () => {},
    };
    const tester = new LoadTester(config);
    const result = await tester.run();

    for (const time of result.responseTimes) {
      expect(time).toBeGreaterThanOrEqual(0);
    }
  });
});
