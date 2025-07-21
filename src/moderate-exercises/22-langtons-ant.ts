// 16.22 – Langton's Ant
//
// Problem:
// Langton's Ant is a Turing machine with a very simple set of rules but complex emergent behavior.
// It is a grid of black and white squares, an ant is placed on the grid and can face in one of four directions.
// It moves based on the color of the square it is on:
//   - On a white square: turn right 90°, flip the color of the square to black, move forward one unit
//   - On a black square: turn left 90°, flip the color of the square to white, move forward one unit
//
// Implement Langton's Ant with a way to print the grid after `k` moves.

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
