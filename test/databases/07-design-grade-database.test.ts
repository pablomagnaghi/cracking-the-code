import { GradeDatabase } from '../../src/databases/07-design-grade-database';

describe('GradeDatabase', () => {
  let db: GradeDatabase;

  beforeEach(() => {
    db = new GradeDatabase();
    db.addStudent({ id: 1, name: 'Alice', email: 'alice@u.edu' });
    db.addStudent({ id: 2, name: 'Bob', email: 'bob@u.edu' });
    db.addStudent({ id: 3, name: 'Charlie', email: 'charlie@u.edu' });
    db.addStudent({ id: 4, name: 'Diana', email: 'diana@u.edu' });
    db.addCourse({ id: 101, name: 'Calculus', credits: 4 });
    db.addCourse({ id: 102, name: 'Physics', credits: 3 });
    db.addCourse({ id: 103, name: 'English', credits: 3 });
  });

  test('calculates GPA correctly for a single course', () => {
    db.enrollStudent(1, 101, 'A');
    expect(db.getGPA(1)).toBe(4.0);
  });

  test('calculates weighted GPA across multiple courses', () => {
    db.enrollStudent(1, 101, 'A');   // 4.0 * 4 = 16
    db.enrollStudent(1, 102, 'B');   // 3.0 * 3 = 9
    db.enrollStudent(1, 103, 'A-');  // 3.7 * 3 = 11.1
    // Total: 36.1 / 10 = 3.61
    expect(db.getGPA(1)).toBe(3.61);
  });

  test('returns 0.0 GPA for student with no enrollments', () => {
    expect(db.getGPA(2)).toBe(0.0);
  });

  test('enrollStudent rejects invalid grades', () => {
    const result = db.enrollStudent(1, 101, 'Z');
    expect(result).toBe(false);
    expect(db.getStudentEnrollments(1)).toHaveLength(0);
  });

  test('enrollStudent rejects non-existent student or course', () => {
    expect(db.enrollStudent(99, 101, 'A')).toBe(false);
    expect(db.enrollStudent(1, 999, 'A')).toBe(false);
  });

  test('getHonorRoll returns students with GPA >= 3.5', () => {
    db.enrollStudent(1, 101, 'A');   // GPA 4.0
    db.enrollStudent(2, 101, 'C');   // GPA 2.0
    db.enrollStudent(3, 101, 'A-');  // GPA 3.7
    db.enrollStudent(4, 101, 'B+');  // GPA 3.3
    const honorRoll = db.getHonorRoll();
    expect(honorRoll).toHaveLength(2);
    expect(honorRoll[0].studentName).toBe('Alice');
    expect(honorRoll[0].gpa).toBe(4.0);
    expect(honorRoll[1].studentName).toBe('Charlie');
    expect(honorRoll[1].gpa).toBe(3.7);
  });

  test('getHonorRoll is sorted by GPA descending then by id', () => {
    db.enrollStudent(1, 101, 'A-');  // GPA 3.7
    db.enrollStudent(2, 101, 'A');   // GPA 4.0
    db.enrollStudent(3, 101, 'A-');  // GPA 3.7
    const honorRoll = db.getHonorRoll();
    expect(honorRoll).toHaveLength(3);
    expect(honorRoll[0].studentName).toBe('Bob');
    expect(honorRoll[1].studentName).toBe('Alice');
    expect(honorRoll[2].studentName).toBe('Charlie');
  });

  test('getHonorRoll with custom threshold', () => {
    db.enrollStudent(1, 101, 'B');   // GPA 3.0
    db.enrollStudent(2, 101, 'B-');  // GPA 2.7
    const honorRoll = db.getHonorRoll(2.8);
    expect(honorRoll).toHaveLength(1);
    expect(honorRoll[0].studentName).toBe('Alice');
  });

  test('handles F grade correctly', () => {
    db.enrollStudent(1, 101, 'F');
    expect(db.getGPA(1)).toBe(0.0);
    expect(db.getHonorRoll()).toHaveLength(0);
  });
});
