import { CheckCircle, ChevronRight, FileText, XCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import { Select } from "../components/Select";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { Skeleton } from "../components/ui/skeleton";
import {
  useExams,
  useMarksForStudent,
  useStudents,
  useSubjects,
  useUpsertMark,
} from "../hooks/useBackend";
import type { ExamId, MarkView, StudentId, SubjectId } from "../types";

const PASS_THRESHOLD = 40;

interface CellKey {
  subjectId: string;
  examId: string;
}

function cellKey(s: string, e: string) {
  return `${s}_${e}`;
}

function PassIndicator({ value }: { value: string }) {
  const num = Number(value);
  if (!value || Number.isNaN(num)) return null;
  const pass = num >= PASS_THRESHOLD;
  return pass ? (
    <CheckCircle size={14} className="text-primary shrink-0" />
  ) : (
    <XCircle size={14} className="text-destructive shrink-0" />
  );
}

function MarkCell({
  value,
  onChange,
  ocid,
}: {
  value: string;
  onChange: (v: string) => void;
  ocid: string;
}) {
  const num = Number(value);
  const isInvalid = value !== "" && (Number.isNaN(num) || num < 0 || num > 100);
  return (
    <div className="flex items-center gap-1">
      <input
        type="number"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="—"
        data-ocid={ocid}
        className={`w-16 h-8 rounded-md border px-2 text-sm font-mono text-right bg-background text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring ${
          isInvalid
            ? "border-destructive"
            : "border-input hover:border-primary/40"
        }`}
      />
      <PassIndicator value={isInvalid ? "" : value} />
    </div>
  );
}

export default function MarksPage() {
  const { data: students, isLoading: studentsLoading } = useStudents();
  const { data: subjects, isLoading: subjectsLoading } = useSubjects();
  const { data: exams, isLoading: examsLoading } = useExams();
  const upsertMut = useUpsertMark();

  const [selectedStudentId, setSelectedStudentId] = useState<string>("");
  // map from "subjectId_examId" → string value
  const [draftMarks, setDraftMarks] = useState<Record<string, string>>({});
  const [savingAll, setSavingAll] = useState(false);

  const studentId: StudentId | null = selectedStudentId
    ? (BigInt(selectedStudentId) as StudentId)
    : null;

  const { data: existingMarks, isLoading: marksLoading } = useMarksForStudent(
    studentId ?? (BigInt(0) as StudentId),
  );

  // Pre-fill draft when existing marks arrive or student changes
  useEffect(() => {
    if (!studentId) {
      setDraftMarks({});
      return;
    }
    if (!existingMarks) return;
    const init: Record<string, string> = {};
    for (const m of existingMarks) {
      const k = cellKey(m.subjectId.toString(), m.examId.toString());
      init[k] = m.marksObtained.toString();
    }
    setDraftMarks(init);
  }, [existingMarks, studentId]);

  function setCell({ subjectId, examId }: CellKey, value: string) {
    const k = cellKey(subjectId, examId);
    setDraftMarks((prev) => ({ ...prev, [k]: value }));
  }

  function getCell(subjectId: string, examId: string) {
    return draftMarks[cellKey(subjectId, examId)] ?? "";
  }

  function getExistingMark(
    subjectId: string,
    examId: string,
  ): MarkView | undefined {
    return existingMarks?.find(
      (m) =>
        m.subjectId.toString() === subjectId && m.examId.toString() === examId,
    );
  }

  // Collect dirty cells (changed or new, valid)
  const dirtyCells = useMemo(() => {
    const cells: Array<{ subjectId: string; examId: string; value: string }> =
      [];
    for (const [k, v] of Object.entries(draftMarks)) {
      if (!v) continue;
      const num = Number(v);
      if (Number.isNaN(num) || num < 0 || num > 100) continue;
      const [sid, eid] = k.split("_");
      const existing = existingMarks?.find(
        (m) => m.subjectId.toString() === sid && m.examId.toString() === eid,
      );
      if (!existing || existing.marksObtained.toString() !== v) {
        cells.push({ subjectId: sid, examId: eid, value: v });
      }
    }
    return cells;
  }, [draftMarks, existingMarks]);

  const hasInvalid = useMemo(() => {
    return Object.values(draftMarks).some((v) => {
      if (!v) return false;
      const num = Number(v);
      return Number.isNaN(num) || num < 0 || num > 100;
    });
  }, [draftMarks]);

  async function saveSingleCell(subjectId: string, examId: string) {
    if (!studentId) return;
    const value = getCell(subjectId, examId);
    const num = Number(value);
    if (!value || Number.isNaN(num) || num < 0 || num > 100) {
      toast.error("Mark must be between 0 and 100");
      return;
    }
    const existing = getExistingMark(subjectId, examId);
    await upsertMut.mutateAsync({
      studentId,
      subjectId: BigInt(subjectId) as SubjectId,
      examId: BigInt(examId) as ExamId,
      marksObtained: BigInt(Math.round(num)),
      remarks: existing?.remarks ?? "",
    });
    toast.success("Mark saved");
  }

  async function saveAll() {
    if (!studentId || dirtyCells.length === 0) return;
    setSavingAll(true);
    try {
      for (const cell of dirtyCells) {
        await upsertMut.mutateAsync({
          studentId,
          subjectId: BigInt(cell.subjectId) as SubjectId,
          examId: BigInt(cell.examId) as ExamId,
          marksObtained: BigInt(Math.round(Number(cell.value))),
          remarks: getExistingMark(cell.subjectId, cell.examId)?.remarks ?? "",
        });
      }
      toast.success(
        `${dirtyCells.length} mark${dirtyCells.length > 1 ? "s" : ""} saved successfully`,
      );
    } catch {
      toast.error("Failed to save some marks");
    } finally {
      setSavingAll(false);
    }
  }

  const isDataLoading = studentsLoading || subjectsLoading || examsLoading;
  const selectedStudent = students?.find(
    (s) => s.id.toString() === selectedStudentId,
  );

  const studentOptions = (students ?? []).map((s) => ({
    value: s.id.toString(),
    label: `${s.name} (${s.rollNumber})`,
  }));

  return (
    <div className="space-y-8 max-w-5xl" data-ocid="marks.page">
      {/* Page header */}
      <div>
        <h2 className="text-xl font-display font-bold text-foreground">
          Marks Entry
        </h2>
        <p className="text-sm text-muted-foreground">
          Record or update student marks per subject and exam.
        </p>
      </div>

      {/* Step 1 — Select student */}
      <div
        className="card-elevated rounded-lg p-6 space-y-4"
        data-ocid="marks.student.section"
      >
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">
            1
          </span>
          <h3 className="text-sm font-semibold text-foreground">
            Select Student
          </h3>
        </div>

        {isDataLoading ? (
          <Skeleton className="h-10 w-72" />
        ) : (
          <div className="flex items-end gap-4 flex-wrap">
            <div className="flex-1 min-w-56 max-w-sm">
              <Select
                label="Student"
                id="student-select"
                value={selectedStudentId}
                onChange={(e) => {
                  setSelectedStudentId(e.target.value);
                  setDraftMarks({});
                }}
                options={studentOptions}
                placeholder="Choose a student…"
                data-ocid="marks.student.select"
              />
            </div>
            {selectedStudent && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground pb-0.5">
                <ChevronRight size={14} />
                <span className="font-medium text-foreground">
                  {selectedStudent.name}
                </span>
                <span>·</span>
                <span>{selectedStudent.rollNumber}</span>
                <span>·</span>
                <span>Class {selectedStudent.className}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Step 2 & 3 — Mark entry grid */}
      {studentId && (
        <div className="space-y-4" data-ocid="marks.grid.section">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">
                2
              </span>
              <h3 className="text-sm font-semibold text-foreground">
                Enter Marks
              </h3>
              <span className="text-xs text-muted-foreground">
                (0–100 · pass ≥ {PASS_THRESHOLD})
              </span>
            </div>
            <Button
              type="button"
              onClick={saveAll}
              disabled={dirtyCells.length === 0 || hasInvalid || savingAll}
              data-ocid="marks.save_all_button"
              size="sm"
            >
              {savingAll ? (
                <span className="flex items-center gap-2">
                  <LoadingSpinner size="sm" />
                  Saving…
                </span>
              ) : (
                `Save All${dirtyCells.length > 0 ? ` (${dirtyCells.length})` : ""}`
              )}
            </Button>
          </div>

          {marksLoading ? (
            <div
              className="flex items-center justify-center py-12"
              data-ocid="marks.loading_state"
            >
              <LoadingSpinner size="md" />
            </div>
          ) : (subjects ?? []).length === 0 || (exams ?? []).length === 0 ? (
            <div
              className="card-elevated rounded-lg flex flex-col items-center py-16 text-center"
              data-ocid="marks.empty_state"
            >
              <FileText size={32} className="text-muted-foreground mb-3" />
              <p className="font-medium text-foreground">
                No subjects or exams configured
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Add subjects and exams in the admin panel first.
              </p>
            </div>
          ) : (
            <div
              className="card-elevated rounded-lg overflow-auto"
              data-ocid="marks.table"
            >
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/30">
                    <th className="sticky left-0 z-10 bg-muted/30 text-left px-4 py-3 font-semibold text-foreground whitespace-nowrap">
                      Subject
                    </th>
                    {(exams ?? []).map((exam) => (
                      <th
                        key={exam.id.toString()}
                        className="px-3 py-3 text-center font-semibold text-foreground whitespace-nowrap min-w-28"
                      >
                        <div>{exam.name}</div>
                        <div className="text-xs text-muted-foreground font-normal">
                          Max: {exam.maxMarks.toString()}
                        </div>
                      </th>
                    ))}
                    <th className="px-4 py-3 text-center font-semibold text-foreground whitespace-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {(subjects ?? []).map((subject, si) => (
                    <tr
                      key={subject.id.toString()}
                      className={`border-b border-border last:border-0 ${si % 2 === 0 ? "" : "bg-muted/10"}`}
                    >
                      <td className="sticky left-0 z-10 px-4 py-3 font-medium text-foreground bg-card whitespace-nowrap">
                        <div>{subject.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {subject.code}
                        </div>
                      </td>
                      {(exams ?? []).map((exam, ei) => {
                        const sid = subject.id.toString();
                        const eid = exam.id.toString();
                        const val = getCell(sid, eid);
                        const num = Number(val);
                        const isInvalid =
                          val !== "" &&
                          (Number.isNaN(num) || num < 0 || num > 100);
                        return (
                          <td key={eid} className="px-3 py-3 text-center">
                            <MarkCell
                              value={val}
                              onChange={(v) =>
                                setCell({ subjectId: sid, examId: eid }, v)
                              }
                              ocid={`marks.cell.${si + 1}.${ei + 1}`}
                            />
                            {isInvalid && (
                              <p className="text-xs text-destructive mt-0.5">
                                0–100
                              </p>
                            )}
                          </td>
                        );
                      })}
                      <td className="px-4 py-3 text-center">
                        <div className="flex items-center justify-center gap-1 flex-wrap">
                          {(exams ?? []).map((exam) => {
                            const sid = subject.id.toString();
                            const eid = exam.id.toString();
                            const val = getCell(sid, eid);
                            const existing = getExistingMark(sid, eid);
                            const isDirty =
                              val &&
                              (!existing ||
                                existing.marksObtained.toString() !== val);
                            if (!isDirty) return null;
                            return (
                              <Button
                                key={eid}
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={() => saveSingleCell(sid, eid)}
                                disabled={upsertMut.isPending}
                                data-ocid={`marks.save_button.${exam.name.toLowerCase().replace(/\s+/g, "_")}`}
                                className="h-7 text-xs px-2"
                              >
                                Save {exam.name}
                              </Button>
                            );
                          })}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Legend */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <CheckCircle size={12} className="text-primary" />
              Pass (≥{PASS_THRESHOLD})
            </span>
            <span className="flex items-center gap-1">
              <XCircle size={12} className="text-destructive" />
              Fail (&lt;{PASS_THRESHOLD})
            </span>
            {dirtyCells.length > 0 && !hasInvalid && (
              <Badge variant="secondary" className="ml-auto">
                {dirtyCells.length} unsaved change
                {dirtyCells.length > 1 ? "s" : ""}
              </Badge>
            )}
            {hasInvalid && (
              <Badge variant="destructive" className="ml-auto">
                Fix invalid entries before saving
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
