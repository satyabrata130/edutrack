import { AlertCircle, BookOpen, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import { DataTable } from "../components/DataTable";
import { Input } from "../components/Input";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { ConfirmModal, Modal } from "../components/ui/Modal";
import {
  useCreateSubject,
  useDeleteSubject,
  useIsAdmin,
  useSubjects,
} from "../hooks/useBackend";
import type { SubjectView } from "../types";

export default function SubjectsPage() {
  const { data: subjects, isLoading, isError } = useSubjects();
  const { data: isAdmin } = useIsAdmin();
  const createMut = useCreateSubject();
  const deleteMut = useDeleteSubject();

  const [modalOpen, setModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<SubjectView | null>(null);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState<{ name?: string; code?: string }>({});

  const validate = () => {
    const e: typeof errors = {};
    if (!name.trim()) e.name = "Subject name is required";
    if (!code.trim()) e.code = "Subject code is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleAdd = async () => {
    if (!validate()) return;
    await createMut.mutateAsync({
      name: name.trim(),
      code: code.trim().toUpperCase(),
    });
    setModalOpen(false);
    setName("");
    setCode("");
  };

  const openAdd = () => {
    setName("");
    setCode("");
    setErrors({});
    setModalOpen(true);
  };

  return (
    <div className="space-y-6 max-w-3xl" data-ocid="subjects.page">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-display font-bold text-foreground">
            Subjects
          </h2>
          <p className="text-sm text-muted-foreground">
            {subjects?.length ?? 0} subjects configured
          </p>
        </div>
        {isAdmin && (
          <Button
            type="button"
            onClick={openAdd}
            data-ocid="subjects.add_button"
          >
            <Plus size={16} /> Add Subject
          </Button>
        )}
      </div>

      {/* Table */}
      {isLoading ? (
        <div
          className="flex items-center justify-center py-20"
          data-ocid="subjects.loading_state"
        >
          <LoadingSpinner size="lg" />
        </div>
      ) : isError ? (
        <div
          className="card-elevated rounded-lg flex flex-col items-center justify-center py-16 gap-3 text-center"
          data-ocid="subjects.error_state"
        >
          <AlertCircle size={32} className="text-destructive/60" />
          <p className="text-sm text-muted-foreground">
            Failed to load subjects. Please refresh the page.
          </p>
        </div>
      ) : (
        <DataTable
          data={subjects ?? []}
          keyFn={(s) => s.id.toString()}
          data-ocid="subjects.table"
          emptyState={
            <div className="text-center py-4" data-ocid="subjects.empty_state">
              <BookOpen
                size={32}
                className="text-muted-foreground mx-auto mb-2"
              />
              <p className="font-medium text-foreground mb-1">
                No subjects yet
              </p>
              <p className="text-sm text-muted-foreground">
                Add your first subject to start configuring exams and marks.
              </p>
            </div>
          }
          columns={[
            {
              key: "name",
              header: "Subject Name",
              cell: (s) => (
                <span className="font-medium text-foreground">{s.name}</span>
              ),
            },
            {
              key: "code",
              header: "Code",
              cell: (s) => (
                <Badge variant="outline">
                  <span className="font-mono">{s.code}</span>
                </Badge>
              ),
            },
            {
              key: "actions",
              header: "",
              align: "right",
              cell: (s, i) =>
                isAdmin ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeleteTarget(s)}
                    data-ocid={`subjects.delete_button.${i + 1}`}
                    aria-label="Delete subject"
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
        title="Add Subject"
        description="Create a new subject for exams and marks"
        data-ocid="subjects.dialog"
      >
        <div className="space-y-4">
          <Input
            label="Subject Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
            placeholder="e.g. Mathematics"
            data-ocid="subjects.name.input"
          />
          <Input
            label="Subject Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            error={errors.code}
            placeholder="e.g. MATH101"
            data-ocid="subjects.code.input"
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setModalOpen(false)}
              data-ocid="subjects.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleAdd}
              loading={createMut.isPending}
              data-ocid="subjects.submit_button"
            >
              Add Subject
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
        title="Delete Subject"
        description={`Delete "${deleteTarget?.name ?? "this subject"}"? All associated marks data will be affected.`}
        confirmLabel="Delete"
        destructive
        loading={deleteMut.isPending}
      />
    </div>
  );
}
