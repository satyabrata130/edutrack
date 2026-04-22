import { AlertCircle, ClipboardList, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import { DataTable } from "../components/DataTable";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { ConfirmModal, Modal } from "../components/ui/Modal";
import {
  useCreateExam,
  useDeleteExam,
  useExams,
  useIsAdmin,
} from "../hooks/useBackend";
import { ExamType } from "../types";
import type { CreateExamRequest, ExamView } from "../types";

const EXAM_TYPE_OPTIONS = [
  { value: ExamType.midterm, label: "Midterm" },
  { value: ExamType.final_, label: "Final" },
  { value: ExamType.quiz, label: "Quiz" },
  { value: ExamType.assignment, label: "Assignment" },
  { value: ExamType.practical, label: "Practical" },
];

const EXAM_TYPE_BADGE: Record<
  ExamType,
  "default" | "secondary" | "warning" | "success" | "muted"
> = {
  [ExamType.final_]: "default",
  [ExamType.midterm]: "secondary",
  [ExamType.quiz]: "success",
  [ExamType.assignment]: "warning",
  [ExamType.practical]: "muted",
};

type ExamFormState = Omit<CreateExamRequest, "maxMarks"> & { maxMarks: string };

const EMPTY: ExamFormState = {
  name: "",
  date: "",
  examType: ExamType.midterm,
  maxMarks: "100",
};

export default function ExamsPage() {
  const { data: exams, isLoading, isError } = useExams();
  const { data: isAdmin } = useIsAdmin();
  const createMut = useCreateExam();
  const deleteMut = useDeleteExam();

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<ExamView | null>(null);
  const [form, setForm] = useState<ExamFormState>(EMPTY);
  const [errors, setErrors] = useState<
    Partial<Record<keyof ExamFormState, string>>
  >({});

  const validate = () => {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "Exam name is required";
    if (!form.date) e.date = "Date is required";
    if (!form.maxMarks || Number(form.maxMarks) <= 0)
      e.maxMarks = "Max marks must be positive";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleAdd = async () => {
    if (!validate()) return;
    await createMut.mutateAsync({ ...form, maxMarks: BigInt(form.maxMarks) });
    setModalOpen(false);
    setForm(EMPTY);
  };

  const openAdd = () => {
    setForm(EMPTY);
    setErrors({});
    setModalOpen(true);
  };

  const examTypeLabel = (type: ExamType) => {
    return EXAM_TYPE_OPTIONS.find((o) => o.value === type)?.label ?? type;
  };

  return (
    <div className="space-y-6 max-w-5xl" data-ocid="exams.page">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-display font-bold text-foreground">
            Exams
          </h2>
          <p className="text-sm text-muted-foreground">
            {exams?.length ?? 0} exams configured
          </p>
        </div>
        {isAdmin && (
          <Button type="button" onClick={openAdd} data-ocid="exams.add_button">
            <Plus size={16} /> Add Exam
          </Button>
        )}
      </div>

      {/* Table */}
      {isLoading ? (
        <div
          className="flex items-center justify-center py-20"
          data-ocid="exams.loading_state"
        >
          <LoadingSpinner size="lg" />
        </div>
      ) : isError ? (
        <div
          className="card-elevated rounded-lg flex flex-col items-center justify-center py-16 gap-3 text-center"
          data-ocid="exams.error_state"
        >
          <AlertCircle size={32} className="text-destructive/60" />
          <p className="text-sm text-muted-foreground">
            Failed to load exams. Please refresh the page.
          </p>
        </div>
      ) : (
        <DataTable
          data={exams ?? []}
          keyFn={(e) => e.id.toString()}
          data-ocid="exams.table"
          emptyState={
            <div className="text-center py-4" data-ocid="exams.empty_state">
              <ClipboardList
                size={32}
                className="text-muted-foreground mx-auto mb-2"
              />
              <p className="font-medium text-foreground mb-1">No exams yet</p>
              <p className="text-sm text-muted-foreground">
                Create your first exam to begin recording student marks.
              </p>
            </div>
          }
          columns={[
            {
              key: "name",
              header: "Exam Name",
              cell: (e) => (
                <span className="font-medium text-foreground">{e.name}</span>
              ),
            },
            {
              key: "type",
              header: "Type",
              cell: (e) => (
                <Badge variant={EXAM_TYPE_BADGE[e.examType]}>
                  {examTypeLabel(e.examType)}
                </Badge>
              ),
            },
            {
              key: "date",
              header: "Date",
              cell: (e) => (
                <span className="text-muted-foreground">{e.date}</span>
              ),
            },
            {
              key: "marks",
              header: "Max Marks",
              align: "right",
              cell: (e) => (
                <span className="font-mono font-medium">
                  {e.maxMarks.toString()}
                </span>
              ),
            },
            {
              key: "actions",
              header: "",
              align: "right",
              cell: (e, i) =>
                isAdmin ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeleteTarget(e)}
                    data-ocid={`exams.delete_button.${i + 1}`}
                    aria-label="Delete exam"
                  >
                    <Trash2 size={14} className="text-destructive" />
                  </Button>
                ) : null,
            },
          ]}
        />
      )}

      {/* Add Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Add Exam"
        description="Configure a new exam for marking"
        data-ocid="exams.dialog"
      >
        <div className="space-y-4">
          <Input
            label="Exam Name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            error={errors.name}
            placeholder="e.g. Mid-Term 2025"
            data-ocid="exams.name.input"
          />
          <Input
            label="Date"
            type="date"
            value={form.date}
            onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
            error={errors.date}
            data-ocid="exams.date.input"
          />
          <Select
            label="Exam Type"
            options={EXAM_TYPE_OPTIONS}
            value={form.examType}
            onChange={(e) =>
              setForm((f) => ({ ...f, examType: e.target.value as ExamType }))
            }
            data-ocid="exams.type.select"
          />
          <Input
            label="Max Marks"
            type="number"
            value={form.maxMarks}
            onChange={(e) =>
              setForm((f) => ({ ...f, maxMarks: e.target.value }))
            }
            error={errors.maxMarks}
            placeholder="100"
            data-ocid="exams.maxmarks.input"
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setModalOpen(false)}
              data-ocid="exams.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleAdd}
              loading={createMut.isPending}
              data-ocid="exams.submit_button"
            >
              Add Exam
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete confirm */}
      <ConfirmModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={async () => {
          if (deleteTarget) {
            await deleteMut.mutateAsync(deleteTarget.id);
            setDeleteTarget(null);
          }
        }}
        title="Delete Exam"
        description={`Delete exam "${deleteTarget?.name ?? ""}"? All marks recorded for this exam will be removed.`}
        confirmLabel="Delete"
        destructive
        loading={deleteMut.isPending}
      />
    </div>
  );
}
