// LCCI 08.06. Hanota
//
// In the classic problem of the Towers of Hanoi, you have 3 towers and N disks of
// different sizes which can slide onto any tower. The puzzle starts with disks sorted
// in ascending order of size from top to bottom (each disk sits on top of an even
// larger one). You have the following constraints:
//   (1) Only one disk can be moved at a time.
//   (2) A disk is slid off the top of one tower onto another tower.
//   (3) A disk cannot be placed on top of a smaller disk.
// Write a program to move the disks from the first tower to the last using stacks.
//
// Example 1:
//   Input: A = [2, 1, 0], B = [], C = []
//   Output: C = [2, 1, 0]
//
// Example 2:
//   Input: A = [1, 0], B = [], C = []
//   Output: C = [1, 0]
//
// Constraints:
//   A.length <= 14

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
