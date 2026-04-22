import { a as useTeachers, d as useIsAdmin, n as useCallerProfile, o as useDeleteTeacher, p as useUpdateTeacherRole, r as reactExports, j as jsxRuntimeExports, m as LoadingSpinner, q as Shield, l as Button, U as Users } from "./index-DPO0jM6g.js";
import { B as Badge } from "./Badge-Ct7Xi7OF.js";
import { D as DataTable, C as ConfirmModal } from "./Modal-DtWPPBob.js";
import { T as TeacherRole } from "./backend.d-BdF2l3g-.js";
import { C as CircleAlert, T as Trash2 } from "./trash-2-B4TM4Rct.js";
import { U as User } from "./user-B3wdaSJn.js";
function TeachersPage() {
  const { data: teachers, isLoading, isError } = useTeachers();
  const { data: isAdmin } = useIsAdmin();
  const { data: callerProfile } = useCallerProfile();
  const deleteMut = useDeleteTeacher();
  const updateRoleMut = useUpdateTeacherRole();
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const handleDelete = async () => {
    if (!deleteTarget) return;
    await deleteMut.mutateAsync(deleteTarget.id);
    setDeleteTarget(null);
  };
  const toggleRole = async (t) => {
    const newRole = t.role === TeacherRole.admin ? TeacherRole.teacher : TeacherRole.admin;
    await updateRoleMut.mutateAsync({ id: t.id, role: newRole, name: t.name });
  };
  const isSelf = (t) => callerProfile && "ok" in callerProfile ? callerProfile.ok.id.toString() === t.id.toString() : false;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-5xl", "data-ocid": "teachers.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-bold text-foreground", children: "Teachers" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Manage teacher accounts and roles. First login auto-registers teachers." })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex items-center justify-center py-20",
        "data-ocid": "teachers.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg" })
      }
    ) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "card-elevated rounded-lg flex flex-col items-center justify-center py-16 gap-3 text-center",
        "data-ocid": "teachers.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 32, className: "text-destructive/60" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Failed to load teachers. Please refresh the page." })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      DataTable,
      {
        data: teachers ?? [],
        keyFn: (t) => t.id.toString(),
        "data-ocid": "teachers.table",
        emptyState: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-4", "data-ocid": "teachers.empty_state", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 32, className: "text-muted-foreground mx-auto mb-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground mb-1", children: "No teachers registered yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Teachers are automatically registered on first login." })
        ] }),
        columns: [
          {
            key: "name",
            header: "Name",
            cell: (t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary text-xs font-semibold", children: t.name.charAt(0).toUpperCase() }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground block", children: t.name }),
                isSelf(t) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "(you)" })
              ] })
            ] })
          },
          {
            key: "id",
            header: "Principal",
            cell: (t) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-muted-foreground truncate max-w-[160px] block", children: [
              t.id.toString().slice(0, 24),
              "…"
            ] })
          },
          {
            key: "role",
            header: "Role",
            cell: (t) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: t.role === TeacherRole.admin ? "default" : "muted",
                children: t.role === TeacherRole.admin ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { size: 10 }),
                  " Admin"
                ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 10 }),
                  " Teacher"
                ] })
              }
            )
          },
          {
            key: "actions",
            header: "",
            align: "right",
            cell: (t, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 justify-end", children: isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "outline",
                  size: "sm",
                  onClick: () => toggleRole(t),
                  loading: updateRoleMut.isPending,
                  disabled: isSelf(t),
                  "data-ocid": `teachers.toggle_role_button.${i + 1}`,
                  children: t.role === TeacherRole.admin ? "Revoke Admin" : "Make Admin"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "icon",
                  onClick: () => setDeleteTarget(t),
                  disabled: isSelf(t),
                  "data-ocid": `teachers.delete_button.${i + 1}`,
                  "aria-label": "Delete teacher",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14, className: "text-destructive" })
                }
              )
            ] }) })
          }
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmModal,
      {
        open: !!deleteTarget,
        onClose: () => setDeleteTarget(null),
        onConfirm: handleDelete,
        title: "Remove Teacher",
        description: `Remove "${(deleteTarget == null ? void 0 : deleteTarget.name) ?? "this teacher"}" from the system? They will lose all access.`,
        confirmLabel: "Remove",
        destructive: true,
        loading: deleteMut.isPending
      }
    )
  ] });
}
export {
  TeachersPage as default
};
