import { u as useStudents, a as useTeachers, b as useSubjects, c as useExams, d as useIsAdmin, G as GraduationCap, U as Users, B as BookOpen, F as FileText, j as jsxRuntimeExports, C as ChartNoAxesColumn, L as Link } from "./index-DPO0jM6g.js";
import { B as Badge } from "./Badge-Ct7Xi7OF.js";
import { T as TrendingUp } from "./trending-up-Noa0hL3t.js";
import { R as ResponsiveContainer, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, B as Bar } from "./generateCategoricalChart-DpPC91G4.js";
import { B as BarChart } from "./BarChart-DTXAzE9L.js";
function StatCard({
  label,
  value,
  icon: Icon,
  colorClass,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-elevated rounded-lg p-5", "data-ocid": ocid, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground", children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 16, className: colorClass })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-bold font-mono text-foreground", children: value })
  ] });
}
function DashboardPage() {
  const { data: students, isLoading: studentsLoading } = useStudents();
  const { data: teachers, isLoading: teachersLoading } = useTeachers();
  const { data: subjects, isLoading: subjectsLoading } = useSubjects();
  const { data: exams, isLoading: examsLoading } = useExams();
  const { data: isAdmin } = useIsAdmin();
  const isLoading = studentsLoading || teachersLoading || subjectsLoading || examsLoading;
  const classCounts = {};
  for (const s of students ?? []) {
    classCounts[s.className] = (classCounts[s.className] ?? 0) + 1;
  }
  const classChartData = Object.entries(classCounts).sort(([a], [b]) => a.localeCompare(b)).map(([name, count]) => ({ name, count }));
  const summaryStats = [
    {
      label: "Total Students",
      value: (students == null ? void 0 : students.length) ?? 0,
      icon: GraduationCap,
      colorClass: "text-chart-1",
      ocid: "dashboard.stat.1"
    },
    {
      label: "Total Teachers",
      value: (teachers == null ? void 0 : teachers.length) ?? 0,
      icon: Users,
      colorClass: "text-chart-2",
      ocid: "dashboard.stat.2"
    },
    {
      label: "Subjects",
      value: (subjects == null ? void 0 : subjects.length) ?? 0,
      icon: BookOpen,
      colorClass: "text-chart-3",
      ocid: "dashboard.stat.3"
    },
    {
      label: "Exams",
      value: (exams == null ? void 0 : exams.length) ?? 0,
      icon: FileText,
      colorClass: "text-chart-4",
      ocid: "dashboard.stat.4"
    }
  ];
  const quickActions = [
    {
      label: "Enter Marks",
      desc: "Record student marks for exams",
      path: "/marks",
      icon: FileText
    },
    {
      label: "Search Students",
      desc: "Find students by name or roll number",
      path: "/search",
      icon: GraduationCap
    },
    {
      label: "View Reports",
      desc: "Individual and class performance reports",
      path: "/reports",
      icon: ChartNoAxesColumn
    },
    ...isAdmin ? [
      {
        label: "Manage Students",
        desc: "Add, edit, or remove student records",
        path: "/admin/students",
        icon: Users
      },
      {
        label: "Manage Subjects",
        desc: "Configure subjects for your school",
        path: "/admin/subjects",
        icon: BookOpen
      },
      {
        label: "Manage Exams",
        desc: "Create and schedule examinations",
        path: "/admin/exams",
        icon: FileText
      }
    ] : []
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { "data-ocid": "dashboard.page", className: "space-y-8 max-w-5xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-display font-bold text-foreground mb-1", children: "Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: isAdmin ? "Admin view — full access to all features." : "Teacher view — manage marks and reports." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "grid grid-cols-2 lg:grid-cols-4 gap-4",
        "data-ocid": "dashboard.stats.section",
        children: isLoading ? Array.from({ length: 4 }, (_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "card-elevated rounded-lg p-5 animate-pulse h-24 bg-muted/30"
          },
          `skeleton-stat-${i + 1}`
        )) : summaryStats.map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { ...stat }, stat.label))
      }
    ),
    !studentsLoading && classChartData.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "card-elevated rounded-lg p-6",
        "data-ocid": "dashboard.class_chart.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 16, className: "text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-foreground", children: "Students per Class" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            BarChart,
            {
              data: classChartData,
              margin: { top: 4, right: 8, left: -20, bottom: 0 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  CartesianGrid,
                  {
                    strokeDasharray: "3 3",
                    stroke: "oklch(var(--border))"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  XAxis,
                  {
                    dataKey: "name",
                    tick: { fontSize: 12, fill: "oklch(var(--muted-foreground))" },
                    tickLine: false,
                    axisLine: false
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  YAxis,
                  {
                    tick: { fontSize: 12, fill: "oklch(var(--muted-foreground))" },
                    tickLine: false,
                    axisLine: false,
                    allowDecimals: false
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Tooltip,
                  {
                    contentStyle: {
                      backgroundColor: "oklch(var(--card))",
                      border: "1px solid oklch(var(--border))",
                      borderRadius: "6px",
                      fontSize: "12px",
                      color: "oklch(var(--foreground))"
                    },
                    cursor: { fill: "oklch(var(--muted) / 0.4)" }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Bar,
                  {
                    dataKey: "count",
                    name: "Students",
                    fill: "oklch(var(--chart-1))",
                    radius: [4, 4, 0, 0]
                  }
                )
              ]
            }
          ) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4", children: "Quick Actions" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3",
          "data-ocid": "dashboard.quickactions.section",
          children: quickActions.map((action, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: action.path,
              "data-ocid": `dashboard.quickaction.${i + 1}`,
              className: "card-elevated rounded-lg p-4 flex gap-3 items-start hover:bg-muted/30 transition-smooth group",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx(action.icon, { size: 18, className: "text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: action.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: action.desc })
                ] })
              ]
            },
            action.path
          ))
        }
      )
    ] }),
    students && students.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider", children: "Recent Students" }),
        isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/admin/students",
            className: "text-xs text-primary hover:underline",
            "data-ocid": "dashboard.view_all_students_link",
            children: "View all →"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-elevated rounded-lg divide-y divide-border overflow-hidden", children: students.slice(0, 5).map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/reports/$studentId",
          params: { studentId: s.id.toString() },
          className: "flex items-center gap-4 px-4 py-3 hover:bg-muted/20 transition-colors",
          "data-ocid": `dashboard.student.${i + 1}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary text-xs font-semibold", children: s.name.charAt(0) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: s.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                s.rollNumber,
                " · ",
                s.className
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: s.enrollmentStatus === "active" ? "success" : s.enrollmentStatus === "graduated" ? "default" : "muted",
                children: s.enrollmentStatus
              }
            )
          ]
        },
        s.id.toString()
      )) })
    ] }),
    students && students.length === 0 && !studentsLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "card-elevated rounded-lg p-12 text-center",
        "data-ocid": "dashboard.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            GraduationCap,
            {
              size: 40,
              className: "text-muted-foreground mx-auto mb-4"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-semibold mb-1", children: "No students yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-4", children: "Start by adding your first student record." }),
          isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/admin/students",
              className: "text-primary text-sm hover:underline",
              "data-ocid": "dashboard.add_students_link",
              children: "Add Students →"
            }
          )
        ]
      }
    )
  ] });
}
export {
  DashboardPage as default
};
