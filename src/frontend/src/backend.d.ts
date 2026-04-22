import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Timestamp = bigint;
export interface CreateTeacherRequest {
    principal: UserId;
    name: string;
    role: TeacherRole;
}
export interface TeacherView {
    id: UserId;
    name: string;
    createdAt: Timestamp;
    role: TeacherRole;
}
export interface CreateStudentRequest {
    contact: string;
    name: string;
    enrollmentStatus: EnrollmentStatus;
    rollNumber: string;
    className: string;
}
export type ExamId = bigint;
export interface CreateExamRequest {
    date: string;
    name: string;
    maxMarks: bigint;
    examType: ExamType;
}
export interface CoAttainmentAnalysis {
    subjectCode: string;
    totalStudents: bigint;
    coAttainments: Array<CoAttainment>;
}
export type MarkId = bigint;
export interface UploadRecordRequest {
    studentId: StudentId;
    subjectCode: string;
    assignment: CoMarks;
    quiz: CoMarks;
    midsem: CoMarks;
    attendance: CoMarks;
}
export interface SubjectView {
    id: SubjectId;
    code: string;
    name: string;
    createdAt: Timestamp;
}
export interface StudentReport {
    studentId: StudentId;
    studentName: string;
    performances: Array<StudentExamPerformance>;
    rollNumber: string;
    overallPassed: boolean;
    className: string;
    averageScore: number;
}
export interface PerformanceRecordView {
    id: bigint;
    studentId: StudentId;
    subjectCode: string;
    assignment: CoMarks;
    quiz: CoMarks;
    midsem: CoMarks;
    totalMark: bigint;
    attendance: CoMarks;
    uploadedAt: Timestamp;
    uploadedBy: UserId;
}
export interface ExamView {
    id: ExamId;
    date: string;
    name: string;
    createdAt: Timestamp;
    maxMarks: bigint;
    examType: ExamType;
}
export interface MarkView {
    id: MarkId;
    studentId: StudentId;
    marksObtained: bigint;
    createdAt: Timestamp;
    subjectId: SubjectId;
    examId: ExamId;
    remarks: string;
    enteredBy: UserId;
}
export interface CoMarks {
    co1: bigint;
    co2: bigint;
    co3: bigint;
    co4: bigint;
    co5: bigint;
}
export type SubjectId = bigint;
export interface StudentView {
    id: StudentId;
    contact: string;
    name: string;
    createdAt: Timestamp;
    enrollmentStatus: EnrollmentStatus;
    rollNumber: string;
    className: string;
}
export interface CreateSubjectRequest {
    code: string;
    name: string;
}
export interface ClassReport {
    topPerformers: Array<string>;
    bottomPerformers: Array<string>;
    examId: ExamId;
    examName: string;
    subjectSummaries: Array<ClassSubjectSummary>;
    className: string;
}
export interface ClassSubjectSummary {
    bottomStudent?: string;
    topStudent?: string;
    subjectName: string;
    subjectId: SubjectId;
    averageScore: number;
}
export type StudentId = bigint;
export type UserId = Principal;
export interface StudentExamPerformance {
    subjectName: string;
    marksObtained: bigint;
    subjectId: SubjectId;
    maxMarks: bigint;
    examId: ExamId;
    examName: string;
    passed: boolean;
}
export interface UpsertMarkRequest {
    studentId: StudentId;
    marksObtained: bigint;
    subjectId: SubjectId;
    examId: ExamId;
    remarks: string;
}
export interface UpdateStudentRequest {
    contact: string;
    name: string;
    enrollmentStatus: EnrollmentStatus;
    rollNumber: string;
    className: string;
}
export interface UpdateTeacherRequest {
    name: string;
    role: TeacherRole;
}
export interface CoAttainment {
    co: string;
    attainmentLevel: AttainmentLevel;
    passPercentage: number;
}
export enum AttainmentLevel {
    level1 = "level1",
    level2 = "level2",
    level3 = "level3"
}
export enum EnrollmentStatus {
    active = "active",
    inactive = "inactive",
    graduated = "graduated",
    suspended = "suspended"
}
export enum ExamType {
    final_ = "final",
    practical = "practical",
    assignment = "assignment",
    quiz = "quiz",
    midterm = "midterm"
}
export enum TeacherRole {
    admin = "admin",
    teacher = "teacher"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createExam(req: CreateExamRequest): Promise<ExamView>;
    createStudent(req: CreateStudentRequest): Promise<StudentView>;
    createSubject(req: CreateSubjectRequest): Promise<SubjectView>;
    createTeacher(req: CreateTeacherRequest): Promise<TeacherView>;
    deleteExam(id: ExamId): Promise<void>;
    deleteStudent(id: StudentId): Promise<void>;
    deleteSubject(id: SubjectId): Promise<void>;
    deleteTeacher(id: UserId): Promise<void>;
    deleteUploadedRecord(id: bigint): Promise<boolean>;
    getCallerTeacherProfile(): Promise<TeacherView | null>;
    getCallerUserRole(): Promise<UserRole>;
    getClassReport(className: string, examId: ExamId): Promise<ClassReport>;
    getCoAttainmentAnalysis(subjectCode: string): Promise<CoAttainmentAnalysis>;
    getStudent(id: StudentId): Promise<StudentView | null>;
    getStudentReport(studentId: StudentId): Promise<StudentReport | null>;
    getTeacher(id: UserId): Promise<TeacherView | null>;
    isCallerAdmin(): Promise<boolean>;
    listExams(): Promise<Array<ExamView>>;
    listMarksForStudent(studentId: StudentId): Promise<Array<MarkView>>;
    listStudents(): Promise<Array<StudentView>>;
    listSubjects(): Promise<Array<SubjectView>>;
    listTeachers(): Promise<Array<TeacherView>>;
    listUploadedPerformance(subjectCode: string | null, studentId: bigint | null): Promise<Array<PerformanceRecordView>>;
    registerOrUpdateTeacher(name: string): Promise<TeacherView>;
    searchStudents(term: string): Promise<Array<StudentView>>;
    updateExam(id: ExamId, req: CreateExamRequest): Promise<ExamView>;
    updateStudent(id: StudentId, req: UpdateStudentRequest): Promise<StudentView>;
    updateSubject(id: SubjectId, req: CreateSubjectRequest): Promise<SubjectView>;
    updateTeacher(id: UserId, req: UpdateTeacherRequest): Promise<TeacherView>;
    uploadPerformanceData(requests: Array<UploadRecordRequest>): Promise<Array<PerformanceRecordView>>;
    upsertMark(req: UpsertMarkRequest): Promise<MarkView>;
}
