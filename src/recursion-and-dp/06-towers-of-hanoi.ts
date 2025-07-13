// 6. *Towers of Hanoi*:

// In the classic problem of the Towers of Hanoi, you have 3 towers and
// N disks of different sizes which can slide onto any tower.
// The puzzle starts with disks sorted in ascending order of size from top to bottom
// (i.e., each disk sits on top of an even larger one).
//
// You have the following constraints:
// Only one disk can be moved at a time.
// A disk is slid off the top of one tower onto another tower.
// A disk cannot be placed on top of a smaller disk.
// Write a program to move the disks from the first tower to the last using stacks.

type Tower = number[];

export function towersOfHanoi(n: number): [Tower, Tower, Tower] {
  const towers = initTowers(n);
  moveDisks(n, towers[0], towers[2], towers[1]);
  return towers;
}

function initTowers(n: number): [Tower, Tower, Tower] {
  return [
    Array.from({ length: n }, (_, i) => n - i), // [n, n-1, ..., 1]
    [],
    [],
  ];
}

function moveDisks(count: number, from: Tower, to: Tower, via: Tower): void {
  if (count === 0) return;

  moveDisks(count - 1, from, via, to);

  const disk = from.pop();
  if (disk === undefined) throw new Error('No disk to move');
  to.push(disk);

  moveDisks(count - 1, via, to, from);
}
