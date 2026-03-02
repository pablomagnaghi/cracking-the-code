// LCCI 17.07. Baby Names
//
// Each year, the government releases a list of the 10000 most common baby names
// and their frequencies. The only problem with this is that some names have
// multiple spellings. Given names and their frequencies, and a list of equivalent
// name pairs (synonyms), write an algorithm to print a new list of the true
// frequency of each name. Synonym relationships are transitive and symmetric.
// In the final list, use the lexicographically smallest name as the
// representative.
//
// Example:
//   Input:
//     names = ["John(15)","Jon(12)","Chris(13)","Kris(4)","Christopher(19)"]
//     synonyms = ["(Jon,John)","(John,Johnny)","(Chris,Kris)","(Chris,Christopher)"]
//   Output: ["John(27)","Chris(36)"]
//
// Constraints:
//   - names.length <= 100000

export function trulyMostPopular(names: string[], synonyms: string[][]): Record<string, number> {
  const parent: Record<string, string> = {};
  const freq: Record<string, number> = {};

  for (const name of names) {
    const [base, count] = parseName(name);
    freq[base] = (freq[base] || 0) + count;
    parent[base] = base;
  }

  for (const [a, b] of synonyms) {
    union(parent, a, b);
  }

  const result: Record<string, number> = {};
  for (const name in freq) {
    const root = find(parent, name);
    result[root] = (result[root] || 0) + freq[name];
  }

  return result;
}

// Parse a string like "John(15)" to ['John', 15]
function parseName(nameStr: string): [string, number] {
  const match = nameStr.match(/^(.+)\((\d+)\)$/);
  if (!match) throw new Error(`Invalid format: ${nameStr}`);
  return [match[1], parseInt(match[2], 10)];
}

// Union-find: find root of a name with path compression
function find(parent: Record<string, string>, name: string): string {
  if (!(name in parent)) parent[name] = name;
  if (parent[name] !== name) {
    parent[name] = find(parent, parent[name]);
  }
  return parent[name];
}

// Union two name roots lexicographically
function union(parent: Record<string, string>, a: string, b: string): void {
  const rootA = find(parent, a);
  const rootB = find(parent, b);

  if (rootA === rootB) return;

  if (rootA < rootB) {
    parent[rootB] = rootA;
  } else {
    parent[rootA] = rootB;
  }
}
