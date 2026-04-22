import type { backendInterface } from "../backend";
import { EnrollmentStatus, ExamType, TeacherRole, UserRole } from "../backend";
import { Principal } from "@icp-sdk/core/principal";

const now = BigInt(Date.now()) * BigInt(1_000_000);

const mockStudents = [
  {
    id: BigInt(1),
    name: "Alice Johnson",
    rollNumber: "R001",
    className: "10A",
    contact: "alice@example.com",
    enrollmentStatus: EnrollmentStatus.active,
    createdAt: now,
  },
  {
    id: BigInt(2),
    name: "Bob Smith",
    rollNumber: "R002",
    className: "10A",
    contact: "bob@example.com",
    enrollmentStatus: EnrollmentStatus.active,
    createdAt: now,
  },
  {
    id: BigInt(3),
    name: "Carol Williams",
    rollNumber: "R003",
    className: "10B",
    contact: "carol@example.com",
    enrollmentStatus: EnrollmentStatus.active,
    createdAt: now,
  },
];

const mockSubjects = [
  { id: BigInt(1), code: "MATH", name: "Mathematics", createdAt: now },
  { id: BigInt(2), code: "SCI", name: "Science", createdAt: now },
  { id: BigInt(3), code: "ENG", name: "English", createdAt: now },
];

const mockExams = [
  { id: BigInt(1), name: "Midterm Exam", date: "2026-03-15", maxMarks: BigInt(100), examType: ExamType.midterm, createdAt: now },
  { id: BigInt(2), name: "Final Exam", date: "2026-05-20", maxMarks: BigInt(100), examType: ExamType.final_, createdAt: now },
];

const mockTeachers = [
  { id: Principal.fromText("2vxsx-fae"), name: "Dr. Admin User", role: TeacherRole.admin, createdAt: now },
  { id: Principal.fromText("aaaaa-aa"), name: "Ms. Jane Doe", role: TeacherRole.teacher, createdAt: now },
];

const mockMarks = [
  { id: BigInt(1), studentId: BigInt(1), subjectId: BigInt(1), examId: BigInt(1), marksObtained: BigInt(85), remarks: "Excellent", enteredBy: Principal.fromText("2vxsx-fae"), createdAt: now },
  { id: BigInt(2), studentId: BigInt(1), subjectId: BigInt(2), examId: BigInt(1), marksObtained: BigInt(78), remarks: "Good", enteredBy: Principal.fromText("2vxsx-fae"), createdAt: now },
  { id: BigInt(3), studentId: BigInt(2), subjectId: BigInt(1), examId: BigInt(1), marksObtained: BigInt(92), remarks: "Outstanding", enteredBy: Principal.fromText("2vxsx-fae"), createdAt: now },
];

export const mockBackend: backendInterface = {
  _initializeAccessControl: async () => undefined,
  assignCallerUserRole: async () => undefined,
  createExam: async (req) => ({ id: BigInt(3), ...req, createdAt: now }),
  createStudent: async (req) => ({ id: BigInt(4), ...req, createdAt: now }),
  createSubject: async (req) => ({ id: BigInt(4), ...req, createdAt: now }),
  createTeacher: async (req) => ({ id: req.principal, name: req.name, role: req.role, createdAt: now }),
  deleteExam: async () => undefined,
  deleteStudent: async () => undefined,
  deleteSubject: async () => undefined,
  deleteTeacher: async () => undefined,
  getCallerTeacherProfile: async () => mockTeachers[0],
  getCallerUserRole: async () => UserRole.admin,
  getClassReport: async (cls, examId) => ({
    className: cls,
    examId,
    examName: "Midterm Exam",
    topPerformers: ["Alice Johnson", "Bob Smith"],
    bottomPerformers: ["Carol Williams"],
    subjectSummaries: [
      { subjectId: BigInt(1), subjectName: "Mathematics", averageScore: 82, topStudent: "Alice Johnson", bottomStudent: "Carol Williams" },
      { subjectId: BigInt(2), subjectName: "Science", averageScore: 76, topStudent: "Bob Smith", bottomStudent: "Carol Williams" },
    ],
  }),
  getStudent: async (id) => mockStudents.find((s) => s.id === id) ?? null,
  getStudentReport: async (studentId) => ({
    studentId,
    studentName: "Alice Johnson",
    className: "10A",
    rollNumber: "R001",
    overallPassed: true,
    averageScore: 85.5,
    performances: [
      { examId: BigInt(1), examName: "Midterm Exam", subjectId: BigInt(1), subjectName: "Mathematics", marksObtained: BigInt(85), maxMarks: BigInt(100), passed: true },
      { examId: BigInt(1), examName: "Midterm Exam", subjectId: BigInt(2), subjectName: "Science", marksObtained: BigInt(78), maxMarks: BigInt(100), passed: true },
      { examId: BigInt(2), examName: "Final Exam", subjectId: BigInt(1), subjectName: "Mathematics", marksObtained: BigInt(92), maxMarks: BigInt(100), passed: true },
      { examId: BigInt(2), examName: "Final Exam", subjectId: BigInt(2), subjectName: "Science", marksObtained: BigInt(88), maxMarks: BigInt(100), passed: true },
    ],
  }),
  getTeacher: async (id) => mockTeachers.find((t) => t.id.toText() === id.toText()) ?? null,
  isCallerAdmin: async () => true,
  registerOrUpdateTeacher: async () => mockTeachers[0],
  listExams: async () => mockExams,
  listMarksForStudent: async () => mockMarks,
  listStudents: async () => mockStudents,
  listSubjects: async () => mockSubjects,
  listTeachers: async () => mockTeachers,
  searchStudents: async (term) => mockStudents.filter((s) => s.name.toLowerCase().includes(term.toLowerCase()) || s.rollNumber.includes(term)),
  updateExam: async (id, req) => ({ id, ...req, createdAt: now }),
  updateStudent: async (id, req) => ({ id, ...req, createdAt: now }),
  updateSubject: async (id, req) => ({ id, ...req, createdAt: now }),
  updateTeacher: async (id, req) => ({ id, ...req, createdAt: now }),
  upsertMark: async (req) => ({ id: BigInt(10), ...req, enteredBy: Principal.fromText("2vxsx-fae"), createdAt: now }),
};
