import { r as reactExports, g as useSearchStudents, u as useStudents, j as jsxRuntimeExports, S as Search, l as Button, X, G as GraduationCap, L as Link } from "./index-DPO0jM6g.js";
import { B as Badge } from "./Badge-Ct7Xi7OF.js";
import { S as Select } from "./Select-Bn2zkUoE.js";
import { S as Skeleton } from "./skeleton-CuiYZ0LW.js";
import { E as EnrollmentStatus } from "./backend.d-BdF2l3g-.js";
import { T as TrendingUp } from "./trending-up-Noa0hL3t.js";
const STATUS_LABELS = {
  [EnrollmentStatus.active]: "Active",
  [EnrollmentStatus.inactive]: "Inactive",
  [EnrollmentStatus.graduated]: "Graduated",
  [EnrollmentStatus.suspended]: "Suspended"
};
const STATUS_VARIANTS = {
  [EnrollmentStatus.active]: "default",
  [EnrollmentStatus.inactive]: "secondary",
  [EnrollmentStatus.graduated]: "outline",
  [EnrollmentStatus.suspended]: "destructive"
};
const STATUS_DOT = {
  [EnrollmentStatus.active]: "bg-primary",
  [EnrollmentStatus.inactive]: "bg-muted-foreground",
  [EnrollmentStatus.graduated]: "bg-accent-foreground",
  [EnrollmentStatus.suspended]: "bg-destructive"
};
function StudentCard({
  student,
  index
}) {
  const initials = student.name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to: "/reports/$studentId",
      params: { studentId: student.id.toString() },
      "data-ocid": `search.result.${index}`,
      className: "flex items-center gap-4 p-4 card-elevated rounded-lg hover:shadow-md hover:border-primary/30 transition-smooth group",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-11 w-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-bold text-sm", children: initials }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground group-hover:text-primary transition-colors truncate", children: student.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: STATUS_VARIANTS[student.enrollmentStatus],
                className: "shrink-0 flex items-center gap-1",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `h-1.5 w-1.5 rounded-full ${STATUS_DOT[student.enrollmentStatus]}`
                    }
                  ),
                  STATUS_LABELS[student.enrollmentStatus]
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
            "Roll: ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: student.rollNumber }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-1.5", children: "·" }),
            "Class ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: student.className }),
            student.contact && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-1.5", children: "·" }),
              student.contact
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground group-hover:text-primary transition-colors shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 14 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:block", children: "View Report" })
        ] })
      ]
    }
  );
}
function SearchPage() {
  const [term, setTerm] = reactExports.useState("");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const { data: searchResults, isLoading: searchLoading } = useSearchStudents(term);
  const { data: allStudents, isLoading: allLoading } = useStudents();
  const isLoading = term.trim() ? searchLoading : allLoading;
  const baseResults = term.trim() ? searchResults ?? [] : allStudents ?? [];
  const filtered = baseResults.filter(
    (s) => statusFilter === "all" || s.enrollmentStatus === statusFilter
  );
  const statusCounts = (allStudents ?? []).reduce(
    (acc, s) => {
      acc[s.enrollmentStatus] = (acc[s.enrollmentStatus] ?? 0) + 1;
      return acc;
    },
    {}
  );
  function clearFilters() {
    setTerm("");
    setStatusFilter("all");
  }
  const hasFilters = term.trim() || statusFilter !== "all";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-3xl", "data-ocid": "search.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-bold text-foreground", children: "Search Students" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Find students by name, roll number, or class. Click any card to view their performance report." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 flex-wrap items-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-48", children: [
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
            value: term,
            onChange: (e) => setTerm(e.target.value),
            placeholder: "Type a name, roll number, or class…",
            "data-ocid": "search.search_input",
            className: "h-9 w-full rounded-md border border-input bg-card pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-ring transition-smooth"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-44", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Select,
        {
          value: statusFilter,
          onChange: (e) => setStatusFilter(e.target.value),
          options: [
            {
              value: "all",
              label: `All statuses${allStudents ? ` (${allStudents.length})` : ""}`
            },
            ...Object.values(EnrollmentStatus).map((s) => ({
              value: s,
              label: `${STATUS_LABELS[s]}${statusCounts[s] !== void 0 ? ` (${statusCounts[s]})` : ""}`
            }))
          ],
          "data-ocid": "search.status.select"
        }
      ) }),
      hasFilters && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "ghost",
          size: "sm",
          onClick: clearFilters,
          "data-ocid": "search.clear_button",
          className: "text-muted-foreground hover:text-foreground h-10",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14, className: "mr-1" }),
            "Clear"
          ]
        }
      )
    ] }),
    !isLoading && filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "p",
      {
        className: "text-xs text-muted-foreground",
        "data-ocid": "search.results.count",
        children: [
          filtered.length,
          " student",
          filtered.length !== 1 ? "s" : "",
          " found",
          statusFilter !== "all" && ` · filtered by ${STATUS_LABELS[statusFilter]}`
        ]
      }
    ),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "search.loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-lg" }, i)) }),
    !isLoading && !term.trim() && filtered.length === 0 && statusFilter === "all" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center py-20 text-center",
        "data-ocid": "search.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 rounded-full bg-muted/60 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { size: 28, className: "text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "Search for students" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 max-w-xs", children: "Enter a name, roll number, or class above to find students. Or use the status filter to browse." })
        ]
      }
    ),
    !isLoading && (term.trim() || statusFilter !== "all") && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center py-16 text-center",
        "data-ocid": "search.no_results.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 rounded-full bg-muted/60 flex items-center justify-center mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GraduationCap, { size: 28, className: "text-muted-foreground" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: "No students found" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Try a different search term or change the status filter." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: "outline",
              size: "sm",
              onClick: clearFilters,
              className: "mt-4",
              "data-ocid": "search.clear_filters_button",
              children: "Clear filters"
            }
          )
        ]
      }
    ),
    !isLoading && filtered.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "search.results.list", children: filtered.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(StudentCard, { student: s, index: i + 1 }, s.id.toString())) })
  ] });
}
export {
  SearchPage as default
};
