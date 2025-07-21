import { yearWithMostPeopleAlive, Person } from '../../src/moderate-exercises/10-living-people';

describe('yearWithMostPeopleAlive', () => {
  test('returns correct year with one person', () => {
    const people: Person[] = [{ birth: 1950, death: 1980 }];
    expect(yearWithMostPeopleAlive(people)).toBe(1950);
  });

  test('returns year with most people alive', () => {
    const people: Person[] = [
      { birth: 1900, death: 1950 },
      { birth: 1920, death: 1980 },
      { birth: 1930, death: 1940 },
      { birth: 1950, death: 1990 },
    ];
    expect(yearWithMostPeopleAlive(people)).toBe(1930);
  });

  test('handles people born and dying in same year', () => {
    const people: Person[] = [
      { birth: 1950, death: 1950 },
      { birth: 1950, death: 1950 },
      { birth: 1951, death: 1951 },
    ];
    expect(yearWithMostPeopleAlive(people)).toBe(1950);
  });

  test('returns earliest year in tie', () => {
    const people: Person[] = [
      { birth: 1940, death: 1950 },
      { birth: 1941, death: 1951 },
      { birth: 1942, death: 1952 },
    ];
    expect(yearWithMostPeopleAlive(people)).toBe(1942); // 3 people alive
  });

  test('returns correct year with many overlapping people', () => {
    const people: Person[] = [];
    for (let i = 1920; i <= 1960; i++) {
      people.push({ birth: i, death: i + 10 });
    }
    expect(yearWithMostPeopleAlive(people)).toBe(1930); // first year when max 11 people are alive
  });

  test('handles no people (edge case)', () => {
    expect(yearWithMostPeopleAlive([])).toBe(1900); // default range start
  });
});
