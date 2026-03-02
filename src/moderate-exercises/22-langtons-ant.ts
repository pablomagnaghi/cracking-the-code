// LCCI 16.22. Langton's Ant
//
// An ant is sitting on an infinite grid of white and black squares. Initially,
// the grid is all white and the ant faces right. At each step, it does the following:
//   - On a white square: flip the color to black, turn 90 degrees right (clockwise),
//     move forward one unit.
//   - On a black square: flip the color to white, turn 90 degrees left (counter-clockwise),
//     move forward one unit.
//
// Given K moves, output the final board as a minimal grid.
//   - 'X' represents black squares, '_' represents white squares.
//   - 'L', 'U', 'R', 'D' represent the ant's position and facing direction.
//
// Example (K = 0):
//   Output: ["R"]
//
// Example (K = 2):
//   Output: ["_X", "LX"]
//
// Constraints:
//   - 0 <= K <= 100000

enum Direction {
  UP,
  RIGHT,
  DOWN,
  LEFT,
}

const DIRECTIONS = [
  [0, -1], // UP
  [1, 0], // RIGHT
  [0, 1], // DOWN
  [-1, 0], // LEFT
];

class Ant {
  x: number = 0;
  y: number = 0;
  direction: Direction = Direction.RIGHT;

  turnRight() {
    this.direction = (this.direction + 1) % 4;
  }

  turnLeft() {
    this.direction = (this.direction + 3) % 4;
  }

  moveForward() {
    const [dx, dy] = DIRECTIONS[this.direction];
    this.x += dx;
    this.y += dy;
  }

  getPositionKey(): string {
    return `${this.x},${this.y}`;
  }
}

export function langtonsAnt(k: number): string[][] {
  const ant = new Ant();
  const grid = new Map<string, boolean>(); // true: black, false: white

  for (let step = 0; step < k; step++) {
    const key = ant.getPositionKey();
    const isBlack = grid.get(key) ?? false;

    if (isBlack) {
      ant.turnLeft();
    } else {
      ant.turnRight();
    }

    grid.set(key, !isBlack);
    ant.moveForward();
  }

  // Determine bounds
  const visitedKeys = Array.from(grid.keys()).map((key) => key.split(',').map(Number));
  visitedKeys.push([ant.x, ant.y]);

  const xs = visitedKeys.map(([x]) => x);
  const ys = visitedKeys.map(([, y]) => y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);

  // Build output grid
  const output: string[][] = [];
  for (let y = minY; y <= maxY; y++) {
    const row: string[] = [];
    for (let x = minX; x <= maxX; x++) {
      const key = `${x},${y}`;
      if (x === ant.x && y === ant.y) {
        row.push(getAntChar(ant.direction));
      } else {
        row.push(grid.get(key) ? '#' : '_');
      }
    }
    output.push(row);
  }

  return output;
}

function getAntChar(direction: Direction): string {
  switch (direction) {
    case Direction.UP:
      return '^';
    case Direction.RIGHT:
      return '>';
    case Direction.DOWN:
      return 'v';
    case Direction.LEFT:
      return '<';
  }
}
