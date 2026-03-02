import { fizzBuzzMultithreaded } from '../../src/threads-and-locks/07-fizzbuzz-multithreaded';

describe('fizzBuzzMultithreaded', () => {
  test('returns correct FizzBuzz for n=15', async () => {
    const result = await fizzBuzzMultithreaded(15);
    expect(result).toEqual([
      '1', '2', 'Fizz', '4', 'Buzz',
      'Fizz', '7', '8', 'Fizz', 'Buzz',
      '11', 'Fizz', '13', '14', 'FizzBuzz',
    ]);
  });

  test('returns correct FizzBuzz for n=1', async () => {
    const result = await fizzBuzzMultithreaded(1);
    expect(result).toEqual(['1']);
  });

  test('returns empty array for n=0', async () => {
    const result = await fizzBuzzMultithreaded(0);
    expect(result).toEqual([]);
  });

  test('returns correct FizzBuzz for n=3', async () => {
    const result = await fizzBuzzMultithreaded(3);
    expect(result).toEqual(['1', '2', 'Fizz']);
  });

  test('returns correct FizzBuzz for n=5', async () => {
    const result = await fizzBuzzMultithreaded(5);
    expect(result).toEqual(['1', '2', 'Fizz', '4', 'Buzz']);
  });

  test('handles n=30 with multiple FizzBuzz entries', async () => {
    const result = await fizzBuzzMultithreaded(30);

    expect(result).toHaveLength(30);
    expect(result[14]).toBe('FizzBuzz'); // 15
    expect(result[29]).toBe('FizzBuzz'); // 30
    expect(result[2]).toBe('Fizz');      // 3
    expect(result[4]).toBe('Buzz');      // 5
    expect(result[0]).toBe('1');
    expect(result[6]).toBe('7');
  });

  test('matches standard sequential FizzBuzz output', async () => {
    const n = 20;
    const result = await fizzBuzzMultithreaded(n);

    const expected: string[] = [];
    for (let i = 1; i <= n; i++) {
      if (i % 15 === 0) expected.push('FizzBuzz');
      else if (i % 3 === 0) expected.push('Fizz');
      else if (i % 5 === 0) expected.push('Buzz');
      else expected.push(String(i));
    }

    expect(result).toEqual(expected);
  });

  test('returns empty array for negative n', async () => {
    const result = await fizzBuzzMultithreaded(-5);
    expect(result).toEqual([]);
  });
});
