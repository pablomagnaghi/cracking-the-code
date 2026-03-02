import {
  innerJoin,
  leftJoin,
  rightJoin,
  fullOuterJoin,
} from '../../src/databases/04-joins';

interface Employee {
  id: number;
  name: string;
  deptId: number;
}

interface Department {
  id: number;
  deptName: string;
}

const employees: Employee[] = [
  { id: 1, name: 'Alice', deptId: 10 },
  { id: 2, name: 'Bob', deptId: 20 },
  { id: 3, name: 'Charlie', deptId: 10 },
  { id: 4, name: 'Diana', deptId: 30 },
];

const departments: Department[] = [
  { id: 10, deptName: 'Engineering' },
  { id: 20, deptName: 'Marketing' },
  { id: 40, deptName: 'HR' },
];

const mergeInner = (e: Employee, d: Department) => ({
  empName: e.name,
  deptName: d.deptName,
});

const mergeLeft = (e: Employee, d: Department | null) => ({
  empName: e.name,
  deptName: d?.deptName ?? null,
});

const mergeRight = (e: Employee | null, d: Department) => ({
  empName: e?.name ?? null,
  deptName: d.deptName,
});

const mergeFull = (e: Employee | null, d: Department | null) => ({
  empName: e?.name ?? null,
  deptName: d?.deptName ?? null,
});

describe('innerJoin', () => {
  test('returns only matching rows', () => {
    const result = innerJoin(employees, departments, (e) => e.deptId, (d) => d.id, mergeInner);
    expect(result).toHaveLength(3);
    expect(result).toContainEqual({ empName: 'Alice', deptName: 'Engineering' });
    expect(result).toContainEqual({ empName: 'Charlie', deptName: 'Engineering' });
    expect(result).toContainEqual({ empName: 'Bob', deptName: 'Marketing' });
  });

  test('returns empty when no keys match', () => {
    const noMatchDepts: Department[] = [{ id: 99, deptName: 'Unknown' }];
    const result = innerJoin(employees, noMatchDepts, (e) => e.deptId, (d) => d.id, mergeInner);
    expect(result).toHaveLength(0);
  });
});

describe('leftJoin', () => {
  test('returns all left rows with matched or null right side', () => {
    const result = leftJoin(employees, departments, (e) => e.deptId, (d) => d.id, mergeLeft);
    expect(result).toHaveLength(4);
    expect(result).toContainEqual({ empName: 'Alice', deptName: 'Engineering' });
    expect(result).toContainEqual({ empName: 'Diana', deptName: null });
  });

  test('returns all left rows with null when right is empty', () => {
    const result = leftJoin(employees, [], (e) => e.deptId, (d: Department) => d.id, mergeLeft);
    expect(result).toHaveLength(4);
    expect(result.every((r) => r.deptName === null)).toBe(true);
  });
});

describe('rightJoin', () => {
  test('returns all right rows with matched or null left side', () => {
    const result = rightJoin(employees, departments, (e) => e.deptId, (d) => d.id, mergeRight);
    expect(result).toHaveLength(4);
    expect(result).toContainEqual({ empName: 'Alice', deptName: 'Engineering' });
    expect(result).toContainEqual({ empName: null, deptName: 'HR' });
  });

  test('returns all right rows with null when left is empty', () => {
    const result = rightJoin([], departments, (e: Employee) => e.deptId, (d) => d.id, mergeRight);
    expect(result).toHaveLength(3);
    expect(result.every((r) => r.empName === null)).toBe(true);
  });
});

describe('fullOuterJoin', () => {
  test('returns all rows from both sides', () => {
    const result = fullOuterJoin(employees, departments, (e) => e.deptId, (d) => d.id, mergeFull);
    // Alice+Eng, Charlie+Eng, Bob+Mkt, Diana+null, null+HR = 5 rows
    expect(result).toHaveLength(5);
    expect(result).toContainEqual({ empName: 'Diana', deptName: null });
    expect(result).toContainEqual({ empName: null, deptName: 'HR' });
    expect(result).toContainEqual({ empName: 'Alice', deptName: 'Engineering' });
  });

  test('handles both sides empty', () => {
    const result = fullOuterJoin(
      [] as Employee[],
      [] as Department[],
      (e: Employee) => e.deptId,
      (d: Department) => d.id,
      mergeFull
    );
    expect(result).toHaveLength(0);
  });
});
