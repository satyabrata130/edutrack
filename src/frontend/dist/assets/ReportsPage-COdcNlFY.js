import { u as useStudents, c as useExams, r as reactExports, E as useListUploadedPerformance, H as useClassReport, j as jsxRuntimeExports, C as ChartNoAxesColumn, m as LoadingSpinner, L as Link, G as GraduationCap } from "./index-DPO0jM6g.js";
import { B as Badge } from "./Badge-Ct7Xi7OF.js";
import { S as Select } from "./Select-Bn2zkUoE.js";
import { R as ResponsiveContainer, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, L as Legend, B as Bar } from "./generateCategoricalChart-DpPC91G4.js";
import { B as BarChart } from "./BarChart-DTXAzE9L.js";
function ReportsPage() {
  var _a;
  const { data: students, isLoading: studentsLoading } = useStudents();
  const { data: exams } = useExams();
  const [selectedClass, setSelectedClass] = reactExports.useState("");
  const [selectedExamId, setSelectedExamId] = reactExports.useState("");
  const { data: uploadedRecords = [] } = useListUploadedPerformance();
  const classes = [...new Set((students ?? []).map((s) => s.className))].sort();
  const classOptions = classes.map((c) => ({ value: c, label: `Class ${c}` }));
  const examOptions = (exams ?? []).map((e) => ({
    value: e.id.toString(),
    label: e.name
  }));
  const examIdBigint = selectedExamId ? BigInt(selectedExamId) : BigInt(0);
  const { data: classReport, isLoading: reportLoading } = useClassReport(
    selectedClass,
    examIdBigint
  );
  const chartData = ((_a = classReport == null ? void 0 : classReport.subjectSummaries) == null ? void 0 : _a.map((s) => ({
    name: s.subjectName,
    average: Math.round(s.averageScore)
  }))) ?? [];
  const hasSelection = !!selectedClass && !!selectedExamId;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8 max-w-5xl", "data-ocid": "reports.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-bold text-foreground", children: "Reports" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Individual and class-level performance analysis." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "card-elevated rounded-lg overflow-hidden",
        "data-ocid": "reports.class_filter.section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 border-b border-border bg-muted/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { size: 15, className: "text-primary" }),
              "Class Performance Report"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Select a class and exam to view aggregated performance metrics." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Select,
                {
                  options: classOptions,
                  value: selectedClass,
                  onChange: (e) => setSelectedClass(e.target.value),
                  placeholder: "Select class…",
                  "data-ocid": "reports.class.select",
                  className: "sm:w-48"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Select,
                {
                  options: examOptions,
                  value: selectedExamId,
                  onChange: (e) => setSelectedExamId(e.target.value),
                  placeholder: "Select exam…",
                  "data-ocid": "reports.exam.select",
                  className: "sm:w-64"
                }
              )
            ] }),
            reportLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex items-center justify-center py-16",
                "data-ocid": "reports.loading_state",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "md" })
              }
            ),
            !hasSelection && !reportLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "text-center py-10 text-sm text-muted-foreground",
                "data-ocid": "reports.no_selection_state",
                children: "Select a class and exam above to generate the class report."
              }
            ),
            classReport && !reportLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
              chartData.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "Subject Average Scores" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 240, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  BarChart,
                  {
                    data: chartData,
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
                          tick: {
                            fontSize: 12,
                            fill: "oklch(var(--muted-foreground))"
                          },
                          tickLine: false,
                          axisLine: false
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        YAxis,
                        {
                          tick: {
                            fontSize: 12,
                            fill: "oklch(var(--muted-foreground))"
                          },
                          tickLine: false,
                          axisLine: false,
                          domain: [0, 100]
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
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Legend, { wrapperStyle: { fontSize: "12px" } }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Bar,
                        {
                          dataKey: "average",
                          name: "Class Avg Score",
                          fill: "oklch(var(--chart-1))",
                          radius: [4, 4, 0, 0]
                        }
                      )
                    ]
                  }
                ) })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "text-center py-8 text-sm text-muted-foreground",
                  "data-ocid": "reports.chart_empty_state",
                  children: "No subject data available for this selection."
                }
              ),
              classReport.subjectSummaries.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3", children: "Subject Summary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-border rounded-lg overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/40 border-b border-border", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Subject" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Avg Score" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell", children: "Top Student" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell", children: "Needs Attention" })
                  ] }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: classReport.subjectSummaries.map((sub, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "tr",
                    {
                      className: "bg-card hover:bg-muted/20 transition-colors",
                      "data-ocid": `reports.subject_summary.${i + 1}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-medium text-foreground", children: sub.subjectName }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right font-mono font-semibold", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          "span",
                          {
                            className: sub.averageScore >= 60 ? "text-chart-2" : sub.averageScore >= 40 ? "text-chart-4" : "text-chart-5",
                            children: [
                              sub.averageScore.toFixed(1),
                              "%"
                            ]
                          }
                        ) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground hidden sm:table-cell", children: sub.topStudent ?? "—" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-muted-foreground hidden sm:table-cell", children: sub.bottomStudent ?? "—" })
                      ]
                    },
                    sub.subjectId.toString()
                  )) })
                ] }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "p-4 bg-muted/30 rounded-lg",
                    "data-ocid": "reports.top_performers.section",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2", children: "Top Performers" }),
                      classReport.topPerformers.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5", children: classReport.topPerformers.map((name, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "li",
                        {
                          className: "flex items-center gap-2 text-sm",
                          "data-ocid": `reports.top_performer.${i + 1}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 rounded-full bg-chart-2/20 text-chart-2 flex items-center justify-center text-xs font-bold shrink-0", children: i + 1 }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: name })
                          ]
                        },
                        name
                      )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No data" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "p-4 bg-muted/30 rounded-lg",
                    "data-ocid": "reports.bottom_performers.section",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2", children: "Needs Attention" }),
                      classReport.bottomPerformers.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-1.5", children: classReport.bottomPerformers.map((name, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "li",
                        {
                          className: "flex items-center gap-2 text-sm",
                          "data-ocid": `reports.bottom_performer.${i + 1}`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-5 h-5 rounded-full bg-chart-5/20 text-chart-5 flex items-center justify-center text-xs font-bold shrink-0", children: i + 1 }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: name })
                          ]
                        },
                        name
                      )) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No data" })
                    ]
                  }
                )
              ] })
            ] }),
            hasSelection && !reportLoading && !classReport && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "text-center py-8 text-sm text-muted-foreground",
                "data-ocid": "reports.no_data_state",
                children: "No report data found for the selected class and exam."
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      uploadedRecords.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "card-elevated rounded-lg overflow-hidden mb-6",
          "data-ocid": "reports.uploaded_totals.section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 border-b border-border bg-muted/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { size: 15, className: "text-primary" }),
                "Uploaded Data — Total Marks"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Total = Midsem + Quiz + Assignment + Attendance (all CO sums)" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/30 border-b border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Student ID" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Subject" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Midsem" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Quiz" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Assignment" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Attendance" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-right text-xs font-semibold text-foreground uppercase tracking-wider", children: "Total Mark" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: uploadedRecords.map((rec, i) => {
                const mSum = rec.midsem.co1 + rec.midsem.co2 + rec.midsem.co3 + rec.midsem.co4 + rec.midsem.co5;
                const qSum = rec.quiz.co1 + rec.quiz.co2 + rec.quiz.co3 + rec.quiz.co4 + rec.quiz.co5;
                const aSum = rec.assignment.co1 + rec.assignment.co2 + rec.assignment.co3 + rec.assignment.co4 + rec.assignment.co5;
                const atSum = rec.attendance.co1 + rec.attendance.co2 + rec.attendance.co3 + rec.attendance.co4 + rec.attendance.co5;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "tr",
                  {
                    className: "bg-card hover:bg-muted/20 transition-colors",
                    "data-ocid": `reports.uploaded_total.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 font-mono text-foreground", children: rec.studentId }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 font-medium text-foreground", children: rec.subjectCode }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-right tabular-nums text-muted-foreground", children: mSum }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-right tabular-nums text-muted-foreground", children: qSum }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-right tabular-nums text-muted-foreground", children: aSum }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-right tabular-nums text-muted-foreground", children: atSum }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-right font-semibold font-mono text-foreground", children: rec.totalMark })
                    ]
                  },
                  rec.id
                );
              }) })
            ] }) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4", children: "Individual Student Reports" }),
      studentsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "flex items-center justify-center py-12",
          "data-ocid": "reports.students_loading_state",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "md" })
        }
      ) : students && students.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3",
          "data-ocid": "reports.students.list",
          children: students.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/reports/$studentId",
              params: { studentId: s.id.toString() },
              "data-ocid": `reports.student.${i + 1}`,
              className: "card-elevated rounded-lg p-4 flex items-center gap-3 hover:bg-muted/20 transition-smooth group",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary text-sm font-semibold", children: s.name.charAt(0) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors", children: s.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                    s.rollNumber,
                    " · ",
                    s.className
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: s.enrollmentStatus === "active" ? "success" : "muted",
                    className: "shrink-0",
                    children: s.enrollmentStatus
                  }
                )
              ]
            },
            s.id.toString()
          ))
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "text-center py-12 card-elevated rounded-lg",
          "data-ocid": "reports.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              GraduationCap,
              {
                size: 36,
                className: "text-muted-foreground mx-auto mb-3"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium", children: "No students found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Add students to generate individual reports." })
          ]
        }
      )
    ] })
  ] });
}
export {
  ReportsPage as default
};
