import { c as useExams, d as useIsAdmin, v as useCreateExam, w as useDeleteExam, r as reactExports, j as jsxRuntimeExports, l as Button, m as LoadingSpinner, x as ClipboardList } from "./index-DPO0jM6g.js";
import { B as Badge } from "./Badge-Ct7Xi7OF.js";
import { D as DataTable, M as Modal, C as ConfirmModal } from "./Modal-DtWPPBob.js";
import { P as Plus, I as Input } from "./Input-B1svMa09.js";
import { S as Select } from "./Select-Bn2zkUoE.js";
import { a as ExamType } from "./backend.d-BdF2l3g-.js";
import { C as CircleAlert, T as Trash2 } from "./trash-2-B4TM4Rct.js";
const EXAM_TYPE_OPTIONS = [
  { value: ExamType.midterm, label: "Midterm" },
  { value: ExamType.final_, label: "Final" },
  { value: ExamType.quiz, label: "Quiz" },
  { value: ExamType.assignment, label: "Assignment" },
  { value: ExamType.practical, label: "Practical" }
];
const EXAM_TYPE_BADGE = {
  [ExamType.final_]: "default",
  [ExamType.midterm]: "secondary",
  [ExamType.quiz]: "success",
  [ExamType.assignment]: "warning",
  [ExamType.practical]: "muted"
};
const EMPTY = {
  name: "",
  date: "",
  examType: ExamType.midterm,
  maxMarks: "100"
};
function ExamsPage() {
  const { data: exams, isLoading, isError } = useExams();
  const { data: isAdmin } = useIsAdmin();
  const createMut = useCreateExam();
  const deleteMut = useDeleteExam();
  const [modalOpen, setModalOpen] = reactExports.useState(false);
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const [form, setForm] = reactExports.useState(EMPTY);
  const [errors, setErrors] = reactExports.useState({});
  const validate = () => {
    const e = {};
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
  const examTypeLabel = (type) => {
    var _a;
    return ((_a = EXAM_TYPE_OPTIONS.find((o) => o.value === type)) == null ? void 0 : _a.label) ?? type;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-5xl", "data-ocid": "exams.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-bold text-foreground", children: "Exams" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          (exams == null ? void 0 : exams.length) ?? 0,
          " exams configured"
        ] })
      ] }),
      isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { type: "button", onClick: openAdd, "data-ocid": "exams.add_button", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 16 }),
        " Add Exam"
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "flex items-center justify-center py-20",
        "data-ocid": "exams.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg" })
      }
    ) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "card-elevated rounded-lg flex flex-col items-center justify-center py-16 gap-3 text-center",
        "data-ocid": "exams.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { size: 32, className: "text-destructive/60" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Failed to load exams. Please refresh the page." })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
      DataTable,
      {
        data: exams ?? [],
        keyFn: (e) => e.id.toString(),
        "data-ocid": "exams.table",
        emptyState: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-4", "data-ocid": "exams.empty_state", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ClipboardList,
            {
              size: 32,
              className: "text-muted-foreground mx-auto mb-2"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground mb-1", children: "No exams yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Create your first exam to begin recording student marks." })
        ] }),
        columns: [
          {
            key: "name",
            header: "Exam Name",
            cell: (e) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: e.name })
          },
          {
            key: "type",
            header: "Type",
            cell: (e) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: EXAM_TYPE_BADGE[e.examType], children: examTypeLabel(e.examType) })
          },
          {
            key: "date",
            header: "Date",
            cell: (e) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: e.date })
          },
          {
            key: "marks",
            header: "Max Marks",
            align: "right",
            cell: (e) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-medium", children: e.maxMarks.toString() })
          },
          {
            key: "actions",
            header: "",
            align: "right",
            cell: (e, i) => isAdmin ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "ghost",
                size: "icon",
                onClick: () => setDeleteTarget(e),
                "data-ocid": `exams.delete_button.${i + 1}`,
                "aria-label": "Delete exam",
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
        title: "Add Exam",
        description: "Configure a new exam for marking",
        "data-ocid": "exams.dialog",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              label: "Exam Name",
              value: form.name,
              onChange: (e) => setForm((f) => ({ ...f, name: e.target.value })),
              error: errors.name,
              placeholder: "e.g. Mid-Term 2025",
              "data-ocid": "exams.name.input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              label: "Date",
              type: "date",
              value: form.date,
              onChange: (e) => setForm((f) => ({ ...f, date: e.target.value })),
              error: errors.date,
              "data-ocid": "exams.date.input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Select,
            {
              label: "Exam Type",
              options: EXAM_TYPE_OPTIONS,
              value: form.examType,
              onChange: (e) => setForm((f) => ({ ...f, examType: e.target.value })),
              "data-ocid": "exams.type.select"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Input,
            {
              label: "Max Marks",
              type: "number",
              value: form.maxMarks,
              onChange: (e) => setForm((f) => ({ ...f, maxMarks: e.target.value })),
              error: errors.maxMarks,
              placeholder: "100",
              "data-ocid": "exams.maxmarks.input"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                variant: "outline",
                onClick: () => setModalOpen(false),
                "data-ocid": "exams.cancel_button",
                children: "Cancel"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                type: "button",
                onClick: handleAdd,
                loading: createMut.isPending,
                "data-ocid": "exams.submit_button",
                children: "Add Exam"
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
        title: "Delete Exam",
        description: `Delete exam "${(deleteTarget == null ? void 0 : deleteTarget.name) ?? ""}"? All marks recorded for this exam will be removed.`,
        confirmLabel: "Delete",
        destructive: true,
        loading: deleteMut.isPending
      }
    )
  ] });
}
export {
  ExamsPage as default
};
