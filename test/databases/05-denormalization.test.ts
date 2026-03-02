import {
  NormalizedDB,
  DenormalizedDB,
} from '../../src/databases/05-denormalization';

describe('NormalizedDB', () => {
  let db: NormalizedDB;

  beforeEach(() => {
    db = new NormalizedDB();
    db.addTeacher({ id: 1, name: 'Dr. Smith' });
    db.addTeacher({ id: 2, name: 'Prof. Jones' });
    db.addCourse({ id: 101, name: 'Calculus', teacherId: 1 });
    db.addCourse({ id: 102, name: 'Physics', teacherId: 1 });
    db.addCourse({ id: 103, name: 'Literature', teacherId: 2 });
    db.addStudent({ id: 1, name: 'Alice' });
    db.addStudent({ id: 2, name: 'Bob' });
  });

  test('returns courses for an enrolled student', () => {
    db.enroll(1, 101);
    db.enroll(1, 103);
    const courses = db.getStudentCourses(1);
    expect(courses).toHaveLength(2);
    expect(courses[0]).toEqual({ courseName: 'Calculus', teacherName: 'Dr. Smith' });
    expect(courses[1]).toEqual({ courseName: 'Literature', teacherName: 'Prof. Jones' });
  });

  test('returns empty array for student with no enrollments', () => {
    const courses = db.getStudentCourses(2);
    expect(courses).toHaveLength(0);
  });

  test('updating teacher name is reflected in subsequent queries', () => {
    db.enroll(1, 101);
    db.updateTeacherName(1, 'Dr. Brown');
    const courses = db.getStudentCourses(1);
    expect(courses[0].teacherName).toBe('Dr. Brown');
  });

  test('returns all students', () => {
    const students = db.getAllStudents();
    expect(students).toHaveLength(2);
  });
});

describe('DenormalizedDB', () => {
  let db: DenormalizedDB;

  beforeEach(() => {
    db = new DenormalizedDB();
    db.addEnrollment({
      studentId: 1, studentName: 'Alice',
      courseId: 101, courseName: 'Calculus', teacherName: 'Dr. Smith',
    });
    db.addEnrollment({
      studentId: 1, studentName: 'Alice',
      courseId: 103, courseName: 'Literature', teacherName: 'Prof. Jones',
    });
    db.addEnrollment({
      studentId: 2, studentName: 'Bob',
      courseId: 101, courseName: 'Calculus', teacherName: 'Dr. Smith',
    });
  });

  test('returns courses for a student without joins', () => {
    const courses = db.getStudentCourses(1);
    expect(courses).toHaveLength(2);
    expect(courses[0]).toEqual({ courseName: 'Calculus', teacherName: 'Dr. Smith' });
    expect(courses[1]).toEqual({ courseName: 'Literature', teacherName: 'Prof. Jones' });
  });

  test('returns empty array for non-existent student', () => {
    const courses = db.getStudentCourses(99);
    expect(courses).toHaveLength(0);
  });

  test('updating teacher name requires updating multiple rows', () => {
    const count = db.updateTeacherName('Dr. Smith', 'Dr. Brown');
    expect(count).toBe(2);
    const aliceCourses = db.getStudentCourses(1);
    expect(aliceCourses[0].teacherName).toBe('Dr. Brown');
    const bobCourses = db.getStudentCourses(2);
    expect(bobCourses[0].teacherName).toBe('Dr. Brown');
  });
});

describe('NormalizedDB vs DenormalizedDB produce same results', () => {
  test('both return the same student courses', () => {
    const norm = new NormalizedDB();
    norm.addTeacher({ id: 1, name: 'Dr. Smith' });
    norm.addCourse({ id: 101, name: 'Math', teacherId: 1 });
    norm.addStudent({ id: 1, name: 'Alice' });
    norm.enroll(1, 101);

    const denorm = new DenormalizedDB();
    denorm.addEnrollment({
      studentId: 1, studentName: 'Alice',
      courseId: 101, courseName: 'Math', teacherName: 'Dr. Smith',
    });

    const normResult = norm.getStudentCourses(1);
    const denormResult = denorm.getStudentCourses(1);
    expect(normResult).toEqual(denormResult);
  });
});
