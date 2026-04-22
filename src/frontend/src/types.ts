// Re-export all types from the generated backend declarations
// This ensures frontend components use the same types as the backend hooks
export type {
  ClassReport,
  ClassSubjectSummary,
  CreateExamRequest,
  CreateStudentRequest,
  CreateSubjectRequest,
  CreateTeacherRequest,
  ExamId,
  ExamView,
  MarkId,
  MarkView,
  StudentExamPerformance,
  StudentId,
  StudentReport,
  StudentView,
  SubjectId,
  SubjectView,
  TeacherView,
  Timestamp,
  UpdateStudentRequest,
  UpdateTeacherRequest,
  UpsertMarkRequest,
  UserId,
} from "./backend.d";

export {
  EnrollmentStatus,
  ExamType,
  TeacherRole,
  UserRole,
} from "./backend.d";

export type { Principal } from "@icp-sdk/core/principal";

// ─── CO Analysis Types ─────────────────────────────────────────────────────

export interface CoMarks {
  co1: number;
  co2: number;
  co3: number;
  co4: number;
  co5: number;
}

export interface PerformanceRecordView {
  id: number;
  studentId: number;
  subjectCode: string;
  midsem: CoMarks;
  quiz: CoMarks;
  assignment: CoMarks;
  attendance: CoMarks;
  totalMark: number;
  uploadedAt: number;
}

export interface UploadRecordRequest {
  studentId: number;
  subjectCode: string;
  midsem: CoMarks;
  quiz: CoMarks;
  assignment: CoMarks;
  attendance: CoMarks;
}

export type AttainmentLevel = "level1" | "level2" | "level3";

export interface CoAttainment {
  co: string;
  passPercentage: number;
  attainmentLevel: AttainmentLevel;
}

export interface CoAttainmentAnalysis {
  subjectCode: string;
  totalStudents: number;
  coAttainments: CoAttainment[];
}
