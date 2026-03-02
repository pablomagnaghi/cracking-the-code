// 14.05. Denormalization
//
// What is denormalization? Explain the pros and cons. Adapted: demonstrate
// normalized vs denormalized data structures and query performance
// differences using TypeScript classes.
//
// Approach:
//   - NormalizedDB stores data in separate tables (Course, Teacher, Student,
//     Enrollment) following 3NF. Querying student courses requires joining
//     across multiple tables.
//   - DenormalizedDB stores pre-joined data where each enrollment record
//     contains the full student name, course name, and teacher name.
//     Querying is a simple filter but updates require changing multiple rows.
//   - Both classes expose getStudentCourses(studentId) to show the
//     trade-off: normalized is more flexible but requires more lookups;
//     denormalized is faster to read but harder to maintain.
//
// Example:
//   normalizedDb.getStudentCourses(1) => [{ courseName: 'Math', teacherName: 'Dr. Smith' }]
//   denormalizedDb.getStudentCourses(1) => [{ courseName: 'Math', teacherName: 'Dr. Smith' }]
//
// Constraints:
//   - Student and course ids must exist before enrollment.
//   - Both databases return the same results for the same data.

export interface Teacher {
  id: number;
  name: string;
}

export interface Course {
  id: number;
  name: string;
  teacherId: number;
}

export interface Student {
  id: number;
  name: string;
}

export interface Enrollment {
  studentId: number;
  courseId: number;
}

export interface StudentCourseInfo {
  courseName: string;
  teacherName: string;
}

export class NormalizedDB {
  private teachers: Map<number, Teacher> = new Map();
  private courses: Map<number, Course> = new Map();
  private students: Map<number, Student> = new Map();
  private enrollments: Enrollment[] = [];

  addTeacher(teacher: Teacher): void {
    this.teachers.set(teacher.id, teacher);
  }

  addCourse(course: Course): void {
    this.courses.set(course.id, course);
  }

  addStudent(student: Student): void {
    this.students.set(student.id, student);
  }

  enroll(studentId: number, courseId: number): void {
    this.enrollments.push({ studentId, courseId });
  }

  getStudentCourses(studentId: number): StudentCourseInfo[] {
    // Requires joining enrollments -> courses -> teachers
    const result: StudentCourseInfo[] = [];
    for (const enrollment of this.enrollments) {
      if (enrollment.studentId === studentId) {
        const course = this.courses.get(enrollment.courseId);
        if (course) {
          const teacher = this.teachers.get(course.teacherId);
          result.push({
            courseName: course.name,
            teacherName: teacher?.name ?? 'Unknown',
          });
        }
      }
    }
    return result.sort((a, b) => a.courseName.localeCompare(b.courseName));
  }

  getAllStudents(): Student[] {
    return Array.from(this.students.values());
  }

  updateTeacherName(teacherId: number, newName: string): void {
    const teacher = this.teachers.get(teacherId);
    if (teacher) {
      teacher.name = newName;
    }
  }
}

export interface DenormalizedEnrollment {
  studentId: number;
  studentName: string;
  courseId: number;
  courseName: string;
  teacherName: string;
}

export class DenormalizedDB {
  private enrollments: DenormalizedEnrollment[] = [];

  addEnrollment(enrollment: DenormalizedEnrollment): void {
    this.enrollments.push(enrollment);
  }

  getStudentCourses(studentId: number): StudentCourseInfo[] {
    // Simple filter - no joins needed
    return this.enrollments
      .filter((e) => e.studentId === studentId)
      .map((e) => ({
        courseName: e.courseName,
        teacherName: e.teacherName,
      }))
      .sort((a, b) => a.courseName.localeCompare(b.courseName));
  }

  updateTeacherName(oldName: string, newName: string): number {
    // Must update every row containing this teacher name
    let updatedCount = 0;
    for (const enrollment of this.enrollments) {
      if (enrollment.teacherName === oldName) {
        enrollment.teacherName = newName;
        updatedCount++;
      }
    }
    return updatedCount;
  }

  getAllEnrollments(): DenormalizedEnrollment[] {
    return [...this.enrollments];
  }
}
