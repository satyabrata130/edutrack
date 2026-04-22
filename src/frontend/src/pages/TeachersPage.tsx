import { AlertCircle, Shield, Trash2, User, Users } from "lucide-react";
import { useState } from "react";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import { DataTable } from "../components/DataTable";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { ConfirmModal } from "../components/ui/Modal";
import {
  useCallerProfile,
  useDeleteTeacher,
  useIsAdmin,
  useTeachers,
  useUpdateTeacherRole,
} from "../hooks/useBackend";
import { TeacherRole } from "../types";
import type { TeacherView } from "../types";

export default function TeachersPage() {
  const { data: teachers, isLoading, isError } = useTeachers();
  const { data: isAdmin } = useIsAdmin();
  const { data: callerProfile } = useCallerProfile();
  const deleteMut = useDeleteTeacher();
  const updateRoleMut = useUpdateTeacherRole();

  const [deleteTarget, setDeleteTarget] = useState<TeacherView | null>(null);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await deleteMut.mutateAsync(deleteTarget.id);
    setDeleteTarget(null);
  };

  const toggleRole = async (t: TeacherView) => {
    const newRole =
      t.role === TeacherRole.admin ? TeacherRole.teacher : TeacherRole.admin;
    await updateRoleMut.mutateAsync({ id: t.id, role: newRole, name: t.name });
  };

  const isSelf = (t: TeacherView) =>
    callerProfile && "ok" in callerProfile
      ? (callerProfile as { ok: TeacherView }).ok.id.toString() ===
        t.id.toString()
      : false;

  return (
    <div className="space-y-6 max-w-5xl" data-ocid="teachers.page">
      {/* Header */}
      <div>
        <h2 className="text-xl font-display font-bold text-foreground">
          Teachers
        </h2>
        <p className="text-sm text-muted-foreground">
          Manage teacher accounts and roles. First login auto-registers
          teachers.
        </p>
      </div>

      {/* Table */}
      {isLoading ? (
        <div
          className="flex items-center justify-center py-20"
          data-ocid="teachers.loading_state"
        >
          <LoadingSpinner size="lg" />
        </div>
      ) : isError ? (
        <div
          className="card-elevated rounded-lg flex flex-col items-center justify-center py-16 gap-3 text-center"
          data-ocid="teachers.error_state"
        >
          <AlertCircle size={32} className="text-destructive/60" />
          <p className="text-sm text-muted-foreground">
            Failed to load teachers. Please refresh the page.
          </p>
        </div>
      ) : (
        <DataTable
          data={teachers ?? []}
          keyFn={(t) => t.id.toString()}
          data-ocid="teachers.table"
          emptyState={
            <div className="text-center py-4" data-ocid="teachers.empty_state">
              <Users size={32} className="text-muted-foreground mx-auto mb-2" />
              <p className="font-medium text-foreground mb-1">
                No teachers registered yet
              </p>
              <p className="text-sm text-muted-foreground">
                Teachers are automatically registered on first login.
              </p>
            </div>
          }
          columns={[
            {
              key: "name",
              header: "Name",
              cell: (t) => (
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="text-primary text-xs font-semibold">
                      {t.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <span className="font-medium text-foreground block">
                      {t.name}
                    </span>
                    {isSelf(t) && (
                      <span className="text-xs text-muted-foreground">
                        (you)
                      </span>
                    )}
                  </div>
                </div>
              ),
            },
            {
              key: "id",
              header: "Principal",
              cell: (t) => (
                <span className="font-mono text-xs text-muted-foreground truncate max-w-[160px] block">
                  {t.id.toString().slice(0, 24)}…
                </span>
              ),
            },
            {
              key: "role",
              header: "Role",
              cell: (t) => (
                <Badge
                  variant={t.role === TeacherRole.admin ? "default" : "muted"}
                >
                  {t.role === TeacherRole.admin ? (
                    <>
                      <Shield size={10} /> Admin
                    </>
                  ) : (
                    <>
                      <User size={10} /> Teacher
                    </>
                  )}
                </Badge>
              ),
            },
            {
              key: "actions",
              header: "",
              align: "right",
              cell: (t, i) => (
                <div className="flex items-center gap-2 justify-end">
                  {isAdmin && (
                    <>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => toggleRole(t)}
                        loading={updateRoleMut.isPending}
                        disabled={isSelf(t)}
                        data-ocid={`teachers.toggle_role_button.${i + 1}`}
                      >
                        {t.role === TeacherRole.admin
                          ? "Revoke Admin"
                          : "Make Admin"}
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setDeleteTarget(t)}
                        disabled={isSelf(t)}
                        data-ocid={`teachers.delete_button.${i + 1}`}
                        aria-label="Delete teacher"
                      >
                        <Trash2 size={14} className="text-destructive" />
                      </Button>
                    </>
                  )}
                </div>
              ),
            },
          ]}
        />
      )}

      <ConfirmModal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Remove Teacher"
        description={`Remove "${deleteTarget?.name ?? "this teacher"}" from the system? They will lose all access.`}
        confirmLabel="Remove"
        destructive
        loading={deleteMut.isPending}
      />
    </div>
  );
}
