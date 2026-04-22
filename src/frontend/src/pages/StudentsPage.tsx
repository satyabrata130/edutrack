import { AlertCircle, GraduationCap, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import { DataTable } from "../components/DataTable";
import { Input } from "../components/Input";
import { Select } from "../components/Select";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { ConfirmModal, Modal } from "../components/ui/Modal";
import { SearchBar } from "../components/ui/SearchBar";
import {
  useCreateStudent,
  useDeleteStudent,
  useIsAdmin,
  useSearchStudents,
  useStudents,
  useUpdateStudent,
} from "../hooks/useBackend";
import { EnrollmentStatus } from "../types";
import type { CreateStudentRequest, StudentView } from "../types";

const STATUS_OPTIONS = [
  { value: EnrollmentStatus.active, label: "Active" },
  { value: EnrollmentStatus.inactive, label: "Inactive" },
  { value: EnrollmentStatus.graduated, label: "Graduated" },
  { value: EnrollmentStatus.suspended, label: "Suspended" },
];

const EMPTY: CreateStudentRequest = {
  name: "",
  rollNumber: "",
  className: "",
  contact: "",
  enrollmentStatus: EnrollmentStatus.active,
};

function statusBadge(status: EnrollmentStatus) {
  const map: Record<
    EnrollmentStatus,
    "success" | "muted" | "default" | "destructive"
  > = {
    [EnrollmentStatus.active]: "success",
    [EnrollmentStatus.inactive]: "muted",
    [EnrollmentStatus.graduated]: "default",
    [EnrollmentStatus.suspended]: "destructive",
  };
  return (
    <Badge variant={map[status]}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}

export default function StudentsPage() {
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<StudentView | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<StudentView | null>(null);
  const [form, setForm] = useState<CreateStudentRequest>(EMPTY);
  const [errors, setErrors] = useState<
    Partial<Record<keyof CreateStudentRequest, string>>
  >({});

  const { data: allStudents, isLoading, isError } = useStudents();
  const { data: searchResults, isLoading: isSearching } =
    useSearchStudents(search);
  const { data: isAdmin } = useIsAdmin();
  const createMut = useCreateStudent();
  const updateMut = useUpdateStudent();
  const deleteMut = useDeleteStudent();

  const isSearchActive = search.trim().length > 0;
  const students = isSearchActive ? (searchResults ?? []) : (allStudents ?? []);
  const isBusy = isSearchActive ? isSearching : isLoading;

  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY);
    setErrors({});
    setModalOpen(true);
  };

  const openEdit = (s: StudentView) => {
    setEditing(s);
    setForm({
      name: s.name,
      rollNumber: s.rollNumber,
      className: s.className,
      contact: s.contact,
      enrollmentStatus: s.enrollmentStatus,
    });
    setErrors({});
    setModalOpen(true);
  };

  const validate = () => {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.rollNumber.trim()) e.rollNumber = "Roll number is required";
    if (!form.className.trim()) e.className = "Class is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    if (editing) {
      await updateMut.mutateAsync({ id: editing.id, req: form });
    } else {
      await createMut.mutateAsync(form);
    }
    setModalOpen(false);
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await deleteMut.mutateAsync(deleteTarget.id);
    setDeleteTarget(null);
  };

  const isSaving = createMut.isPending || updateMut.isPending;

  return (
    <div className="space-y-6 max-w-6xl" data-ocid="students.page">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-display font-bold text-foreground">
            Students
          </h2>
          <p className="text-sm text-muted-foreground">
            {allStudents?.length ?? 0} total records
          </p>
        </div>
        {isAdmin && (
          <Button
            type="button"
            onClick={openAdd}
            data-ocid="students.add_button"
          >
            <Plus size={16} /> Add Student
          </Button>
        )}
      </div>

      {/* Search */}
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search by name, roll number, or class…"
        data-ocid="students.search_input"
        className="max-w-sm"
      />

      {/* Table */}
      {isBusy ? (
        <div
          className="flex items-center justify-center py-20"
          data-ocid="students.loading_state"
        >
          <LoadingSpinner size="lg" />
        </div>
      ) : isError ? (
        <div
          className="card-elevated rounded-lg flex flex-col items-center justify-center py-16 gap-3 text-center"
          data-ocid="students.error_state"
        >
          <AlertCircle size={32} className="text-destructive/60" />
          <p className="text-sm text-muted-foreground">
            Failed to load students. Please refresh the page.
          </p>
        </div>
      ) : (
        <DataTable
          data={students}
          keyFn={(s) => s.id.toString()}
          data-ocid="students.table"
          emptyState={
            <div className="text-center py-4" data-ocid="students.empty_state">
              <GraduationCap
                size={32}
                className="text-muted-foreground mx-auto mb-2"
              />
              <p className="font-medium text-foreground mb-1">
                {isSearchActive
                  ? "No students match your search"
                  : "No students yet"}
              </p>
              <p className="text-sm text-muted-foreground">
                {isSearchActive
                  ? "Try a different term."
                  : "Add your first student to get started."}
              </p>
            </div>
          }
          columns={[
            {
              key: "name",
              header: "Name",
              cell: (s) => (
                <span className="font-medium text-foreground">{s.name}</span>
              ),
            },
            {
              key: "roll",
              header: "Roll #",
              cell: (s) => (
                <span className="font-mono text-sm">{s.rollNumber}</span>
              ),
            },
            { key: "class", header: "Class", cell: (s) => s.className },
            {
              key: "contact",
              header: "Contact",
              cell: (s) => (
                <span className="text-muted-foreground">
                  {s.contact || "—"}
                </span>
              ),
            },
            {
              key: "status",
              header: "Status",
              cell: (s) => statusBadge(s.enrollmentStatus),
            },
            {
              key: "actions",
              header: "",
              align: "right",
              cell: (s, i) => (
                <div className="flex items-center gap-2 justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => openEdit(s)}
                    data-ocid={`students.edit_button.${i + 1}`}
                    aria-label="Edit student"
                  >
                    <Pencil size={14} />
                  </Button>
                  {isAdmin && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeleteTarget(s)}
                      data-ocid={`students.delete_button.${i + 1}`}
                      aria-label="Delete student"
                    >
                      <Trash2 size={14} className="text-destructive" />
                    </Button>
                  )}
                </div>
              ),
            },
          ]}
        />
      )}

      {/* Add/Edit Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? "Edit Student" : "Add Student"}
        description={
          editing
            ? `Editing record for ${editing.name}`
            : "Fill in the student details below"
        }
        data-ocid="students.dialog"
      >
        <div className="space-y-4">
          <Input
            label="Full Name"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            error={errors.name}
            placeholder="e.g. Alice Johnson"
            data-ocid="students.name.input"
          />
          <Input
            label="Roll Number"
            value={form.rollNumber}
            onChange={(e) =>
              setForm((f) => ({ ...f, rollNumber: e.target.value }))
            }
            error={errors.rollNumber}
            placeholder="e.g. 2024-001"
            data-ocid="students.roll.input"
          />
          <Input
            label="Class / Grade"
            value={form.className}
            onChange={(e) =>
              setForm((f) => ({ ...f, className: e.target.value }))
            }
            error={errors.className}
            placeholder="e.g. 10-A"
            data-ocid="students.class.input"
          />
          <Input
            label="Contact"
            value={form.contact}
            onChange={(e) =>
              setForm((f) => ({ ...f, contact: e.target.value }))
            }
            placeholder="Phone or email"
            data-ocid="students.contact.input"
          />
          <Select
            label="Enrollment Status"
            options={STATUS_OPTIONS}
            value={form.enrollmentStatus}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                enrollmentStatus: e.target.value as EnrollmentStatus,
              }))
            }
            data-ocid="students.status.select"
          />
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setModalOpen(false)}
              data-ocid="students.cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              loading={isSaving}
              data-ocid="students.submit_button"
            >
              {editing ? "Save Changes" : "Add Student"}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete confirm */}
      <ConfirmModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Student"
        description={`Remove "${deleteTarget?.name ?? "this student"}" permanently? This action cannot be undone.`}
        confirmLabel="Delete"
        destructive
        loading={deleteMut.isPending}
      />
    </div>
  );
}
