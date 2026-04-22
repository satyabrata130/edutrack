import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type {
  AttainmentLevel,
  CoAttainmentAnalysis,
  CoMarks,
  CreateExamRequest,
  CreateStudentRequest,
  ExamId,
  PerformanceRecordView,
  StudentId,
  SubjectId,
  TeacherRole,
  UpdateStudentRequest,
  UploadRecordRequest,
  UpsertMarkRequest,
  UserId,
} from "../types";

// ─── Profile / Role ────────────────────────────────────────────────────────

export function useCallerProfile() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["callerProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerTeacherProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsAdmin() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

// ─── Students ─────────────────────────────────────────────────────────────

export function useStudents() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listStudents();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useStudent(id: StudentId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["student", id.toString()],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getStudent(id);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSearchStudents(term: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["searchStudents", term],
    queryFn: async () => {
      if (!actor || !term.trim()) return [];
      return actor.searchStudents(term);
    },
    enabled: !!actor && !isFetching && term.trim().length > 0,
  });
}

export function useCreateStudent() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (req: CreateStudentRequest) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createStudent(req);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["students"] }),
  });
}

export function useUpdateStudent() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      req,
    }: { id: StudentId; req: UpdateStudentRequest }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateStudent(id, req);
    },
    onSuccess: (_data, { id }) => {
      qc.invalidateQueries({ queryKey: ["students"] });
      qc.invalidateQueries({ queryKey: ["student", id.toString()] });
    },
  });
}

export function useDeleteStudent() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: StudentId) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteStudent(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["students"] }),
  });
}

// ─── Subjects ─────────────────────────────────────────────────────────────

export function useSubjects() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["subjects"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listSubjects();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateSubject() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ name, code }: { name: string; code: string }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createSubject({ name, code });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["subjects"] }),
  });
}

export function useDeleteSubject() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: SubjectId) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteSubject(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["subjects"] }),
  });
}

// ─── Exams ────────────────────────────────────────────────────────────────

export function useExams() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["exams"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listExams();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateExam() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (req: CreateExamRequest) => {
      if (!actor) throw new Error("Actor not available");
      return actor.createExam(req);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["exams"] }),
  });
}

export function useDeleteExam() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: ExamId) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteExam(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["exams"] }),
  });
}

// ─── Marks ────────────────────────────────────────────────────────────────

export function useMarksForStudent(studentId: StudentId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["marks", studentId.toString()],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMarksForStudent(studentId);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpsertMark() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (req: UpsertMarkRequest) => {
      if (!actor) throw new Error("Actor not available");
      return actor.upsertMark(req);
    },
    onSuccess: (_data, req) => {
      qc.invalidateQueries({ queryKey: ["marks", req.studentId.toString()] });
      qc.invalidateQueries({ queryKey: ["studentReport"] });
    },
  });
}

// ─── Reports ──────────────────────────────────────────────────────────────

export function useStudentReport(studentId: StudentId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["studentReport", studentId.toString()],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getStudentReport(studentId);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useClassReport(className: string, examId: ExamId) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["classReport", className, examId.toString()],
    queryFn: async () => {
      if (!actor || !className || !examId) return null;
      return actor.getClassReport(className, examId);
    },
    enabled: !!actor && !isFetching && !!className && !!examId,
  });
}

// ─── Teachers ─────────────────────────────────────────────────────────────

export function useTeachers() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["teachers"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listTeachers();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateTeacherRole() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      role,
      name,
    }: {
      id: UserId;
      role: TeacherRole;
      name: string;
    }) => {
      if (!actor) throw new Error("Actor not available");
      return actor.updateTeacher(id, { name, role });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["teachers"] }),
  });
}

export function useDeleteTeacher() {
  const { actor } = useActor(createActor);
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: UserId) => {
      if (!actor) throw new Error("Actor not available");
      return actor.deleteTeacher(id);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["teachers"] }),
  });
}

// ─── CO Analysis / Performance Upload ──────────────────────────────────────

function computeTotalMark(
  midsem: CoMarks,
  quiz: CoMarks,
  assignment: CoMarks,
  attendance: CoMarks,
): number {
  const sumCo = (m: CoMarks) => m.co1 + m.co2 + m.co3 + m.co4 + m.co5;
  return sumCo(midsem) + sumCo(quiz) + sumCo(assignment) + sumCo(attendance);
}

function computeAttainmentLevel(passPercentage: number): AttainmentLevel {
  if (passPercentage > 75) return "level3";
  if (passPercentage >= 60) return "level2";
  return "level1";
}

// In-memory store for uploaded performance records (frontend-local until backend supports it)
let _records: PerformanceRecordView[] = [];
let _nextId = 1;

export function useUploadPerformance() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (requests: UploadRecordRequest[]) => {
      const results: PerformanceRecordView[] = requests.map((req) => ({
        id: _nextId++,
        studentId: req.studentId,
        subjectCode: req.subjectCode,
        midsem: req.midsem,
        quiz: req.quiz,
        assignment: req.assignment,
        attendance: req.attendance,
        totalMark: computeTotalMark(
          req.midsem,
          req.quiz,
          req.assignment,
          req.attendance,
        ),
        uploadedAt: Date.now(),
      }));
      // Add to existing records (not replace)
      _records = [..._records, ...results];
      return results;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["uploadedPerformance"] });
      qc.invalidateQueries({ queryKey: ["coAttainment"] });
    },
  });
}

export function useListUploadedPerformance(
  subjectCode?: string,
  studentId?: number,
) {
  return useQuery({
    queryKey: ["uploadedPerformance", subjectCode ?? "", studentId ?? ""],
    queryFn: async (): Promise<PerformanceRecordView[]> => {
      let results = [..._records];
      if (subjectCode) {
        results = results.filter((r) => r.subjectCode === subjectCode);
      }
      if (studentId !== undefined) {
        results = results.filter((r) => r.studentId === studentId);
      }
      return results;
    },
  });
}

export function useCoAttainmentAnalysis(subjectCode: string) {
  return useQuery({
    queryKey: ["coAttainment", subjectCode],
    queryFn: async (): Promise<CoAttainmentAnalysis | null> => {
      if (!subjectCode) return null;
      const records = _records.filter((r) => r.subjectCode === subjectCode);
      if (records.length === 0) return null;

      const coKeys: (keyof CoMarks)[] = ["co1", "co2", "co3", "co4", "co5"];
      const coAttainments = coKeys.map((co, idx) => {
        // Sum all components per student per CO, pass if >= 50% of max for that component
        const passingStudents = records.filter((r) => {
          const total =
            r.midsem[co] + r.quiz[co] + r.assignment[co] + r.attendance[co];
          // max possible: midsem 20 + quiz 5 + assignment 10 + attendance 5 = 40 per CO
          return total >= 20; // 50% of 40
        });
        const passPercentage =
          records.length > 0
            ? (passingStudents.length / records.length) * 100
            : 0;
        return {
          co: `CO${idx + 1}`,
          passPercentage: Math.round(passPercentage * 10) / 10,
          attainmentLevel: computeAttainmentLevel(passPercentage),
        };
      });

      return {
        subjectCode,
        totalStudents: records.length,
        coAttainments,
      };
    },
    enabled: !!subjectCode,
  });
}

export function useDeleteUploadedRecord() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      _records = _records.filter((r) => r.id !== id);
      return true;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["uploadedPerformance"] });
      qc.invalidateQueries({ queryKey: ["coAttainment"] });
    },
  });
}

export function useUpdateUploadedRecord() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      updates,
    }: {
      id: number;
      updates: Partial<
        Pick<
          PerformanceRecordView,
          "midsem" | "quiz" | "assignment" | "attendance"
        >
      >;
    }) => {
      _records = _records.map((r) => {
        if (r.id !== id) return r;
        const updated = { ...r, ...updates };
        updated.totalMark = computeTotalMark(
          updated.midsem,
          updated.quiz,
          updated.assignment,
          updated.attendance,
        );
        return updated;
      });
      return _records.find((r) => r.id === id) ?? null;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["uploadedPerformance"] });
      qc.invalidateQueries({ queryKey: ["coAttainment"] });
    },
  });
}
