// 14.07. Design Grade Database
//
// Imagine a simple database storing information for students' grades. Design
// what this database might look like and provide a SQL query to return a list
// of honor roll students (GPA >= 3.5). Adapted: implement with TypeScript
// classes and in-memory data.
//
// Approach:
//   - Student holds id, name, and email.
//   - Course holds id, name, and credits.
//   - Enrollment links a student to a course with a letter grade.
//   - GradeDatabase manages all entities and computes GPAs.
//   - GPA is calculated as a weighted average: sum(gradePoints * credits)
//     / sum(credits). Grade points follow standard scale: A=4, B=3, C=2,
//     D=1, F=0. +/- variants adjust by 0.3.
//   - getHonorRoll returns students with GPA >= 3.5.
//
// Example:
//   db.addStudent({ id: 1, name: 'Alice', email: 'alice@u.edu' })
//   db.addCourse({ id: 101, name: 'Math', credits: 3 })
//   db.enrollStudent(1, 101, 'A')
//   db.getGPA(1) => 4.0
//   db.getHonorRoll() => [{ id: 1, name: 'Alice', ... }]
//
// Constraints:
//   - Valid grades: A+, A, A-, B+, B, B-, C+, C, C-, D+, D, D-, F.
//   - GPA is 0.0 if a student has no enrollments.
//   - Honor roll threshold is GPA >= 3.5.

export interface Student {
  id: number;
  name: string;
  email: string;
}

export interface Course {
  id: number;
  name: string;
  credits: number;
}

export interface Enrollment {
  studentId: number;
  courseId: number;
  grade: string;
}

export interface HonorRollEntry {
  studentId: number;
  studentName: string;
  gpa: number;
}

const GRADE_POINTS: Record<string, number> = {
  'A+': 4.0,
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C': 2.0,
  'C-': 1.7,
  'D+': 1.3,
  'D': 1.0,
  'D-': 0.7,
  'F': 0.0,
};

export class GradeDatabase {
  private students: Map<number, Student> = new Map();
  private courses: Map<number, Course> = new Map();
  private enrollments: Enrollment[] = [];

  addStudent(student: Student): void {
    this.students.set(student.id, student);
  }

  addCourse(course: Course): void {
    this.courses.set(course.id, course);
  }

  enrollStudent(studentId: number, courseId: number, grade: string): boolean {
    if (!this.students.has(studentId)) return false;
    if (!this.courses.has(courseId)) return false;
    if (!(grade in GRADE_POINTS)) return false;

    this.enrollments.push({ studentId, courseId, grade });
    return true;
  }

  getGPA(studentId: number): number {
    const studentEnrollments = this.enrollments.filter(
      (e) => e.studentId === studentId
    );

    if (studentEnrollments.length === 0) return 0.0;

    let totalWeightedPoints = 0;
    let totalCredits = 0;

    for (const enrollment of studentEnrollments) {
      const course = this.courses.get(enrollment.courseId);
      if (!course) continue;

      const gradePoints = GRADE_POINTS[enrollment.grade] ?? 0;
      totalWeightedPoints += gradePoints * course.credits;
      totalCredits += course.credits;
    }

    if (totalCredits === 0) return 0.0;
    return Math.round((totalWeightedPoints / totalCredits) * 100) / 100;
  }

  getHonorRoll(threshold: number = 3.5): HonorRollEntry[] {
    const result: HonorRollEntry[] = [];

    for (const student of this.students.values()) {
      const gpa = this.getGPA(student.id);
      if (gpa >= threshold) {
        result.push({
          studentId: student.id,
          studentName: student.name,
          gpa,
        });
      }
    }

    return result.sort((a, b) => b.gpa - a.gpa || a.studentId - b.studentId);
  }

  getStudent(id: number): Student | undefined {
    return this.students.get(id);
  }

  getCourse(id: number): Course | undefined {
    return this.courses.get(id);
  }

  getStudentEnrollments(studentId: number): Enrollment[] {
    return this.enrollments.filter((e) => e.studentId === studentId);
  }
}
