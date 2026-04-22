import { b as useSubjects, d as useIsAdmin, s as useCreateSubject, t as useDeleteSubject, r as reactExports, j as jsxRuntimeExports, l as Button, m as LoadingSpinner, B as BookOpen } from "./index-DPO0jM6g.js";
import { B as Badge } from "./Badge-Ct7Xi7OF.js";
import { D as DataTable, M as Modal, C as ConfirmModal } from "./Modal-DtWPPBob.js";
import { P as Plus, I as Input } from "./Input-B1svMa09.js";
import { C as CircleAlert, T as Trash2 } from "./trash-2-B4TM4Rct.js";
function SubjectsPage() {
  const { data: subjects, isLoading, isError } = useSubjects();
  const { data: isAdmin } = useIsAdmin();
  const createMut = useCreateSubject();
  const deleteMut = useDeleteSubject();
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const [name, setName] = reactExports.useState("");
  const [code, setCode] = reactExports.useState("");
  const [errors, setErrors] = reactExports.useState({});
  const validate = () => {
    const e = {};
    if (!name.trim()) e.name = "Subject name is required";
    if (!code.trim()) e.code = "Subject code is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };
  const handleAdd = async () => {
    if (!validate()) return;
    await createMut.mutateAsync({
      name: name.trim(),
      code: code.trim().toUpperCase()
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-3xl", "data-ocid": "subjects.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-bold text-foreground", children: "Subjects" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          (subjects == null ? void 0 : subjects.length) ?? 0,
          " subjects configured"
        ] })
      ] }),
      isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          onClick: openAdd,
          "data-ocid": "subjects.add_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }),
            " Add Subject"
          ]
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex items-center justify-center py-20",
        "data-ocid": "subjects.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg" })
      }
    ) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "card-elevated rounded-lg flex flex-col items-center justify-center py-16 gap-3 text-center",
        "data-ocid": "subjects.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 32, className: "text-destructive/60" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Failed to load subjects. Please refresh the page." })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      DataTable,
      {
        data: subjects ?? [],
        keyFn: (s) => s.id.toString(),
        "data-ocid": "subjects.table",
        emptyState: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-4", "data-ocid": "subjects.empty_state", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            BookOpen,
            {
              size: 32,
              className: "text-muted-foreground mx-auto mb-2"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground mb-1", children: "No subjects yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Add your first subject to start configuring exams and marks." })
        ] }),
        columns: [
          {
            key: "name",
            header: "Subject Name",
            cell: (s) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: s.name })
          },
          {
            key: "code",
            header: "Code",
            cell: (s) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: s.code }) })
          },
          {
            key: "actions",
            header: "",
            align: "right",
            cell: (s, i) => isAdmin ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "icon",
                onClick: () => setDeleteTarget(s),
                "data-ocid": `subjects.delete_button.${i + 1}`,
                "aria-label": "Delete subject",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14, className: "text-destructive" })
              }
            ) : null
          }
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        open: modalOpen,
        onClose: () => setModalOpen(false),
        title: "Add Subject",
        description: "Create a new subject for exams and marks",
        "data-ocid": "subjects.dialog",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              label: "Subject Name",
              value: name,
              onChange: (e) => setName(e.target.value),
              error: errors.name,
              placeholder: "e.g. Mathematics",
              "data-ocid": "subjects.name.input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              label: "Subject Code",
              value: code,
              onChange: (e) => setCode(e.target.value),
              error: errors.code,
              placeholder: "e.g. MATH101",
              "data-ocid": "subjects.code.input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: () => setModalOpen(false),
                "data-ocid": "subjects.cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                onClick: handleAdd,
                loading: createMut.isPending,
                "data-ocid": "subjects.submit_button",
                children: "Add Subject"
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
        onConfirm: async () => {
          if (deleteTarget) {
            await deleteMut.mutateAsync(deleteTarget.id);
            setDeleteTarget(null);
          }
        },
        title: "Delete Subject",
        description: `Delete "${(deleteTarget == null ? void 0 : deleteTarget.name) ?? "this subject"}"? All associated marks data will be affected.`,
        confirmLabel: "Delete",
        destructive: true,
        loading: deleteMut.isPending
      }
    )
  ] });
}
export {
  SubjectsPage as default
};
