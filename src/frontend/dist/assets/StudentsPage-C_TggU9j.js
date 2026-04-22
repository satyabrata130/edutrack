import { e as createLucideIcon, j as jsxRuntimeExports, S as Search, f as cn, X, r as reactExports, u as useStudents, g as useSearchStudents, d as useIsAdmin, h as useCreateStudent, i as useUpdateStudent, k as useDeleteStudent, l as Button, m as LoadingSpinner, G as GraduationCap } from "./index-DPO0jM6g.js";
import { B as Badge } from "./Badge-Ct7Xi7OF.js";
import { D as DataTable, M as Modal, C as ConfirmModal } from "./Modal-DtWPPBob.js";
import { P as Plus, I as Input } from "./Input-B1svMa09.js";
import { S as Select } from "./Select-Bn2zkUoE.js";
import { E as EnrollmentStatus } from "./backend.d-BdF2l3g-.js";
import { C as CircleAlert, T as Trash2 } from "./trash-2-B4TM4Rct.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode);
function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  className,
  "data-ocid": dataOcid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("relative", className), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Search,
      {
        size: 16,
        className: "absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        value,
        onChange: (e) => onChange(e.target.value),
        placeholder,
        "data-ocid": dataOcid ?? "search_input",
        className: cn(
          "h-9 w-full rounded-md border border-input bg-card pl-9 pr-9 py-2 text-sm text-foreground placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-ring",
          "transition-smooth"
        )
      }
    ),
    value && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => onChange(""),
        className: "absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded text-muted-foreground hover:text-foreground transition-colors",
        "aria-label": "Clear search",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14 })
      }
    )
  ] });
}
const STATUS_OPTIONS = [
  { value: EnrollmentStatus.active, label: "Active" },
  { value: EnrollmentStatus.inactive, label: "Inactive" },
  { value: EnrollmentStatus.graduated, label: "Graduated" },
  { value: EnrollmentStatus.suspended, label: "Suspended" }
];
const EMPTY = {
  name: "",
  rollNumber: "",
  className: "",
  contact: "",
  enrollmentStatus: EnrollmentStatus.active
};
function statusBadge(status) {
  const map = {
    [EnrollmentStatus.active]: "success",
    [EnrollmentStatus.inactive]: "muted",
    [EnrollmentStatus.graduated]: "default",
    [EnrollmentStatus.suspended]: "destructive"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: map[status], children: status.charAt(0).toUpperCase() + status.slice(1) });
}
function StudentsPage() {
  const [search, setSearch] = reactExports.useState("");
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const [editing, setEditing] = reactExports.useState(null);
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(EMPTY);
  const [errors, setErrors] = reactExports.useState({});
  const { data: allStudents, isLoading, isError } = useStudents();
  const { data: searchResults, isLoading: isSearching } = useSearchStudents(search);
  const { data: isAdmin } = useIsAdmin();
  const createMut = useCreateStudent();
  const updateMut = useUpdateStudent();
  const deleteMut = useDeleteStudent();
  const isSearchActive = search.trim().length > 0;
  const students = isSearchActive ? searchResults ?? [] : allStudents ?? [];
  const isBusy = isSearchActive ? isSearching : isLoading;
  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY);
    setErrors({});
    setModalOpen(true);
  };
  const openEdit = (s) => {
    setEditing(s);
    setForm({
      name: s.name,
      rollNumber: s.rollNumber,
      className: s.className,
      contact: s.contact,
      enrollmentStatus: s.enrollmentStatus
    });
    setErrors({});
    setModalOpen(true);
  };
  const validate = () => {
    const e = {};
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-6xl", "data-ocid": "students.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-bold text-foreground", children: "Students" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          (allStudents == null ? void 0 : allStudents.length) ?? 0,
          " total records"
        ] })
      ] }),
      isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          onClick: openAdd,
          "data-ocid": "students.add_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }),
            " Add Student"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      SearchBar,
      {
        value: search,
        onChange: setSearch,
        placeholder: "Search by name, roll number, or class…",
        "data-ocid": "students.search_input",
        className: "max-w-sm"
      }
    ),
    isBusy ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex items-center justify-center py-20",
        "data-ocid": "students.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg" })
      }
    ) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "card-elevated rounded-lg flex flex-col items-center justify-center py-16 gap-3 text-center",
        "data-ocid": "students.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 32, className: "text-destructive/60" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Failed to load students. Please refresh the page." })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      DataTable,
      {
        data: students,
        keyFn: (s) => s.id.toString(),
        "data-ocid": "students.table",
        emptyState: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-4", "data-ocid": "students.empty_state", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            GraduationCap,
            {
              size: 32,
              className: "text-muted-foreground mx-auto mb-2"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground mb-1", children: isSearchActive ? "No students match your search" : "No students yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: isSearchActive ? "Try a different term." : "Add your first student to get started." })
        ] }),
        columns: [
          {
            key: "name",
            header: "Name",
            cell: (s) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: s.name })
          },
          {
            key: "roll",
            header: "Roll #",
            cell: (s) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm", children: s.rollNumber })
          },
          { key: "class", header: "Class", cell: (s) => s.className },
          {
            key: "contact",
            header: "Contact",
            cell: (s) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: s.contact || "—" })
          },
          {
            key: "status",
            header: "Status",
            cell: (s) => statusBadge(s.enrollmentStatus)
          },
          {
            key: "actions",
            header: "",
            align: "right",
            cell: (s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 justify-end", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "icon",
                  onClick: () => openEdit(s),
                  "data-ocid": `students.edit_button.${i + 1}`,
                  "aria-label": "Edit student",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { size: 14 })
                }
              ),
              isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "ghost",
                  size: "icon",
                  onClick: () => setDeleteTarget(s),
                  "data-ocid": `students.delete_button.${i + 1}`,
                  "aria-label": "Delete student",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14, className: "text-destructive" })
                }
              )
            ] })
          }
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        open: modalOpen,
        onClose: () => setModalOpen(false),
        title: editing ? "Edit Student" : "Add Student",
        description: editing ? `Editing record for ${editing.name}` : "Fill in the student details below",
        "data-ocid": "students.dialog",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              label: "Full Name",
              value: form.name,
              onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
              error: errors.name,
              placeholder: "e.g. Alice Johnson",
              "data-ocid": "students.name.input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              label: "Roll Number",
              value: form.rollNumber,
              onChange: (e) => setForm((f) => ({ ...f, rollNumber: e.target.value })),
              error: errors.rollNumber,
              placeholder: "e.g. 2024-001",
              "data-ocid": "students.roll.input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              label: "Class / Grade",
              value: form.className,
              onChange: (e) => setForm((f) => ({ ...f, className: e.target.value })),
              error: errors.className,
              placeholder: "e.g. 10-A",
              "data-ocid": "students.class.input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              label: "Contact",
              value: form.contact,
              onChange: (e) => setForm((f) => ({ ...f, contact: e.target.value })),
              placeholder: "Phone or email",
              "data-ocid": "students.contact.input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Select,
            {
              label: "Enrollment Status",
              options: STATUS_OPTIONS,
              value: form.enrollmentStatus,
              onChange: (e) => setForm((f) => ({
                ...f,
                enrollmentStatus: e.target.value
              })),
              "data-ocid": "students.status.select"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: () => setModalOpen(false),
                "data-ocid": "students.cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                onClick: handleSubmit,
                loading: isSaving,
                "data-ocid": "students.submit_button",
                children: editing ? "Save Changes" : "Add Student"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmModal,
      {
        open: !!deleteTarget,
        onClose: () => setDeleteTarget(null),
        onConfirm: handleDelete,
        title: "Delete Student",
        description: `Remove "${(deleteTarget == null ? void 0 : deleteTarget.name) ?? "this student"}" permanently? This action cannot be undone.`,
        confirmLabel: "Delete",
        destructive: true,
        loading: deleteMut.isPending
      }
    )
  ] });
}
export {
  StudentsPage as default
};
