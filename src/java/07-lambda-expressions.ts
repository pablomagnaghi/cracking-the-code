// 13.07. Lambda Expressions
//
// Implement a Country class with getContinent() and getPopulation(). Write a
// function getPopulation(countries, continent) that computes the total
// population of a continent, using higher-order functions (lambdas).
//
// Approach:
//   Create a Country class storing name, continent, and population. Use
//   filter and reduce (functional/lambda style) to compute aggregate
//   statistics. Also provide filterCountries and sortCountries that accept
//   callback predicates/comparators, demonstrating first-class functions.
//
// Example:
//   const countries = [
//     new Country('Brazil', 'South America', 214_000_000),
//     new Country('France', 'Europe', 67_000_000),
//     new Country('Germany', 'Europe', 83_000_000),
//   ];
//   getPopulation(countries, 'Europe'); // 150_000_000
//
// Constraints:
//   - Population values are non-negative integers
//   - getPopulation returns 0 for a continent with no countries
//   - filterCountries and sortCountries use callback-based APIs

export class Country {
  private readonly name: string;
  private readonly continent: string;
  private readonly population: number;

  constructor(name: string, continent: string, population: number) {
    this.name = name;
    this.continent = continent;
    this.population = population;
  }

  getName(): string {
    return this.name;
  }

  getContinent(): string {
    return this.continent;
  }

  getPopulation(): number {
    return this.population;
  }

  toString(): string {
    return `${this.name} (${this.continent}): ${this.population.toLocaleString()}`;
  }
}

export function getPopulation(countries: Country[], continent: string): number {
  return countries
    .filter(c => c.getContinent() === continent)
    .reduce((sum, c) => sum + c.getPopulation(), 0);
}

export function filterCountries(
  countries: Country[],
  predicate: (country: Country) => boolean,
): Country[] {
  return countries.filter(predicate);
}

export function sortCountries(
  countries: Country[],
  comparator: (a: Country, b: Country) => number,
): Country[] {
  return [...countries].sort(comparator);
}

export function mapCountries<T>(
  countries: Country[],
  mapper: (country: Country) => T,
): T[] {
  return countries.map(mapper);
}

export function groupByContinent(countries: Country[]): Map<string, Country[]> {
  const groups = new Map<string, Country[]>();
  for (const country of countries) {
    const continent = country.getContinent();
    const list = groups.get(continent) ?? [];
    list.push(country);
    groups.set(continent, list);
  }
  return groups;
}
