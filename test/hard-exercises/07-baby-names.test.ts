import { trulyMostPopular } from '../../src/hard-exercises/07-baby-names';

describe('trulyMostPopular', () => {
  test('aggregates synonyms correctly', () => {
    const names = ['John(15)', 'Jon(12)', 'Chris(13)', 'Kris(4)', 'Christopher(19)', 'Johnny(5)'];

    const synonyms = [
      ['Jon', 'John'],
      ['John', 'Johnny'],
      ['Chris', 'Kris'],
      ['Chris', 'Christopher'],
    ];

    const result = trulyMostPopular(names, synonyms);

    expect(result['John']).toBe(32); // 15 + 12 + 5
    expect(result['Chris']).toBe(36); // 13 + 4 + 19
  });

  test('handles no synonyms', () => {
    const names = ['Alice(10)', 'Bob(5)'];
    const result = trulyMostPopular(names, []);
    expect(result).toEqual({ Alice: 10, Bob: 5 });
  });

  test('handles circular synonyms', () => {
    const names = ['Ann(3)', 'Anne(4)', 'Annie(5)'];
    const synonyms = [
      ['Ann', 'Anne'],
      ['Anne', 'Annie'],
    ];
    const result = trulyMostPopular(names, synonyms);
    expect(Object.values(result)).toEqual([12]);
  });
});
