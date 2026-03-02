import {
  Country,
  getPopulation,
  filterCountries,
  sortCountries,
  mapCountries,
  groupByContinent,
} from '../../src/java/07-lambda-expressions';

const COUNTRIES = [
  new Country('Brazil', 'South America', 214_000_000),
  new Country('Argentina', 'South America', 46_000_000),
  new Country('France', 'Europe', 67_000_000),
  new Country('Germany', 'Europe', 83_000_000),
  new Country('Japan', 'Asia', 125_000_000),
  new Country('India', 'Asia', 1_400_000_000),
];

describe('Country', () => {
  test('stores name, continent, and population', () => {
    const c = new Country('USA', 'North America', 331_000_000);
    expect(c.getName()).toBe('USA');
    expect(c.getContinent()).toBe('North America');
    expect(c.getPopulation()).toBe(331_000_000);
  });

  test('toString includes all fields', () => {
    const c = new Country('France', 'Europe', 67_000_000);
    const str = c.toString();
    expect(str).toContain('France');
    expect(str).toContain('Europe');
  });
});

describe('getPopulation', () => {
  test('computes total population for Europe', () => {
    expect(getPopulation(COUNTRIES, 'Europe')).toBe(150_000_000);
  });

  test('computes total population for South America', () => {
    expect(getPopulation(COUNTRIES, 'South America')).toBe(260_000_000);
  });

  test('computes total population for Asia', () => {
    expect(getPopulation(COUNTRIES, 'Asia')).toBe(1_525_000_000);
  });

  test('returns 0 for a continent with no countries', () => {
    expect(getPopulation(COUNTRIES, 'Antarctica')).toBe(0);
  });

  test('returns 0 for an empty list', () => {
    expect(getPopulation([], 'Europe')).toBe(0);
  });
});

describe('filterCountries', () => {
  test('filters countries by population threshold', () => {
    const large = filterCountries(COUNTRIES, c => c.getPopulation() > 100_000_000);
    expect(large).toHaveLength(3);
    const names = large.map(c => c.getName());
    expect(names).toContain('Brazil');
    expect(names).toContain('Japan');
    expect(names).toContain('India');
  });

  test('filters countries by continent', () => {
    const european = filterCountries(COUNTRIES, c => c.getContinent() === 'Europe');
    expect(european).toHaveLength(2);
  });
});

describe('sortCountries', () => {
  test('sorts by population ascending', () => {
    const sorted = sortCountries(COUNTRIES, (a, b) => a.getPopulation() - b.getPopulation());
    expect(sorted[0].getName()).toBe('Argentina');
    expect(sorted[sorted.length - 1].getName()).toBe('India');
  });

  test('sorts by name alphabetically', () => {
    const sorted = sortCountries(COUNTRIES, (a, b) => a.getName().localeCompare(b.getName()));
    expect(sorted[0].getName()).toBe('Argentina');
    expect(sorted[1].getName()).toBe('Brazil');
  });

  test('does not modify the original array', () => {
    const original = [...COUNTRIES];
    sortCountries(COUNTRIES, (a, b) => a.getPopulation() - b.getPopulation());
    expect(COUNTRIES.map(c => c.getName())).toEqual(original.map(c => c.getName()));
  });
});

describe('mapCountries', () => {
  test('maps countries to their names', () => {
    const names = mapCountries(COUNTRIES, c => c.getName());
    expect(names).toEqual(['Brazil', 'Argentina', 'France', 'Germany', 'Japan', 'India']);
  });
});

describe('groupByContinent', () => {
  test('groups countries by continent', () => {
    const groups = groupByContinent(COUNTRIES);
    expect(groups.get('Europe')!).toHaveLength(2);
    expect(groups.get('South America')!).toHaveLength(2);
    expect(groups.get('Asia')!).toHaveLength(2);
    expect(groups.has('Antarctica')).toBe(false);
  });
});
