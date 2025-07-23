// 17.7 Baby Names
//
// Problem:
// Each baby name is associated with a frequency count (how often it was used).
// Some names are synonyms (i.e., they refer to the same person).
// Given a list of names and a list of synonym pairs,
// return the true frequency of each name, consolidating synonyms.
//
// Example:
// Input:
// Names: [
//   "John(15)",
//   "Jon(12)",
//   "Chris(13)",
//   "Kris(4)",
//   "Christopher(19)"
// ]
// Synonyms: [
//   ["Jon", "John"],
//   ["John", "Johnny"],
//   ["Chris", "Kris"],
//   ["Chris", "Christopher"]
// ]
//
// Output:
// {
//   "John": 27,          // John + Jon + Johnny
//   "Chris": 36          // Chris + Kris + Christopher
// }

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
