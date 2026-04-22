import { E as useListUploadedPerformance, r as reactExports, W as useCoAttainmentAnalysis, j as jsxRuntimeExports, U as Users, B as BookOpen, Y as ChartLine } from "./index-DPO0jM6g.js";
import { T as TrendingUp } from "./trending-up-Noa0hL3t.js";
import { R as ResponsiveContainer, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, B as Bar, o as Cell } from "./generateCategoricalChart-DpPC91G4.js";
import { B as BarChart } from "./BarChart-DTXAzE9L.js";
function AttainmentBadge({ level }) {
  const map = {
    level1: {
      label: "Level 1",
      className: "bg-chart-5/15 text-chart-5 border border-chart-5/30"
    },
    level2: {
      label: "Level 2",
      className: "bg-chart-4/15 text-chart-4 border border-chart-4/30"
    },
    level3: {
      label: "Level 3",
      className: "bg-chart-2/15 text-chart-2 border border-chart-2/30"
    }
  };
  const { label, className } = map[level];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${className}`,
      children: label
    }
  );
}
const CO_COLORS = [
  "oklch(var(--chart-1))",
  "oklch(var(--chart-2))",
  "oklch(var(--chart-3))",
  "oklch(var(--chart-4))",
  "oklch(var(--chart-5))"
];
function coSum(cm) {
  return cm.co1 + cm.co2 + cm.co3 + cm.co4 + cm.co5;
}
function studentTotalByCo(rec, co) {
  return rec.midsem[co] + rec.quiz[co] + rec.assignment[co] + rec.attendance[co];
}
function SubjectSelector({
  subjects,
  value,
  onChange
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "select",
    {
      value,
      onChange: (e) => onChange(e.target.value),
      className: "border border-input rounded-md px-3 py-1.5 text-sm bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring",
      "data-ocid": "co_analysis.subject.select",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "Select subject…" }),
        subjects.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s, children: s }, s))
      ]
    }
  );
}
function CoAnalysisPage() {
  const { data: allRecords = [] } = useListUploadedPerformance();
  const subjects = [...new Set(allRecords.map((r) => r.subjectCode))].sort();
  const [selectedSubject, setSelectedSubject] = reactExports.useState("");
  const { data: analysis } = useCoAttainmentAnalysis(selectedSubject);
  const { data: subjectRecords = [] } = useListUploadedPerformance(
    selectedSubject || void 0
  );
  const chartData = (analysis == null ? void 0 : analysis.coAttainments.map((ca, i) => ({
    co: ca.co,
    passPercentage: ca.passPercentage,
    fill: CO_COLORS[i % CO_COLORS.length]
  }))) ?? [];
  const coKeys = ["co1", "co2", "co3", "co4", "co5"];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 max-w-6xl", "data-ocid": "co_analysis.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-bold text-foreground", children: "CO Analysis" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Course Outcome attainment analysis based on uploaded performance data." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SubjectSelector,
        {
          subjects,
          value: selectedSubject,
          onChange: setSelectedSubject
        }
      ),
      analysis && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { size: 14 }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          analysis.totalStudents,
          " students"
        ] })
      ] })
    ] }),
    allRecords.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-16 card-elevated rounded-lg",
        "data-ocid": "co_analysis.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { size: 40, className: "text-muted-foreground mx-auto mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground font-medium", children: "No performance data available" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
            "Upload student data from the",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "/upload", className: "text-primary hover:underline", children: "Upload Data" }),
            " ",
            "page first."
          ] })
        ]
      }
    ),
    allRecords.length > 0 && !selectedSubject && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "text-center py-12 text-sm text-muted-foreground",
        "data-ocid": "co_analysis.no_selection_state",
        children: "Select a subject above to view CO attainment analysis."
      }
    ),
    selectedSubject && analysis && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3",
          "data-ocid": "co_analysis.attainment_tiles",
          children: analysis.coAttainments.map((ca, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "co-attainment-tile rounded-lg",
              "data-ocid": `co_analysis.co_tile.${i + 1}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: ca.co }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "p",
                  {
                    className: "text-2xl font-display font-bold text-foreground tabular-nums",
                    style: { color: CO_COLORS[i % CO_COLORS.length] },
                    children: [
                      ca.passPercentage.toFixed(1),
                      "%"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AttainmentBadge, { level: ca.attainmentLevel })
              ]
            },
            ca.co
          ))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "card-elevated rounded-lg overflow-hidden",
            "data-ocid": "co_analysis.chart.section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-3.5 border-b border-border bg-muted/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 14, className: "text-primary" }),
                "Pass % per Course Outcome"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 240, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
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
                        dataKey: "co",
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
                        domain: [0, 100],
                        tickFormatter: (v) => `${v}%`
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
                        formatter: (value) => [`${value}%`, "Pass %"],
                        cursor: { fill: "oklch(var(--muted) / 0.4)" }
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "passPercentage", radius: [4, 4, 0, 0], children: chartData.map((entry, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Cell,
                      {
                        fill: CO_COLORS[index % CO_COLORS.length]
                      },
                      entry.co
                    )) })
                  ]
                }
              ) }) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "card-elevated rounded-lg overflow-hidden",
            "data-ocid": "co_analysis.attainment_table.section",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-3.5 border-b border-border bg-muted/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChartLine, { size: 14, className: "text-primary" }),
                "CO-wise Attainment Summary"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/30 border-b border-border", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "CO" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Pass %" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Attainment" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: analysis.coAttainments.map((ca, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "tr",
                  {
                    className: "table-hover-row bg-card",
                    "data-ocid": `co_analysis.attainment_row.${i + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 font-semibold text-foreground", children: ca.co }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right tabular-nums font-mono", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "span",
                        {
                          style: { color: CO_COLORS[i % CO_COLORS.length] },
                          className: "font-semibold",
                          children: [
                            ca.passPercentage.toFixed(1),
                            "%"
                          ]
                        }
                      ) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AttainmentBadge, { level: ca.attainmentLevel }) })
                    ]
                  },
                  ca.co
                )) })
              ] })
            ]
          }
        )
      ] }),
      subjectRecords.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "card-elevated rounded-lg overflow-hidden",
          "data-ocid": "co_analysis.student_table.section",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-3.5 border-b border-border bg-muted/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-sm font-semibold text-foreground", children: [
              "Individual Student CO Breakdown",
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-xs font-normal text-muted-foreground", children: [
                "(",
                subjectRecords.length,
                " students)"
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-xs", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-muted/30 border-b border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-left font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap", children: "Student ID" }),
                coKeys.map((co) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "th",
                  {
                    className: "px-4 py-2.5 text-right font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap",
                    children: co.toUpperCase()
                  },
                  co
                )),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-right font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap", children: "Midsem" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-right font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap", children: "Quiz" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-right font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap", children: "Assignment" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-right font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap", children: "Attendance" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-2.5 text-right font-semibold text-foreground uppercase tracking-wider whitespace-nowrap", children: "Total" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: subjectRecords.map((rec, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: "table-hover-row bg-card",
                  "data-ocid": `co_analysis.student_row.${i + 1}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 font-mono text-foreground", children: rec.studentId }),
                    coKeys.map((co) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "td",
                      {
                        className: "px-4 py-2.5 text-right tabular-nums text-muted-foreground",
                        children: studentTotalByCo(rec, co)
                      },
                      co
                    )),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-right tabular-nums text-muted-foreground", children: coSum(rec.midsem) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-right tabular-nums text-muted-foreground", children: coSum(rec.quiz) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-right tabular-nums text-muted-foreground", children: coSum(rec.assignment) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-right tabular-nums text-muted-foreground", children: coSum(rec.attendance) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-right font-semibold font-mono text-foreground", children: rec.totalMark })
                  ]
                },
                rec.id
              )) })
            ] }) })
          ]
        }
      )
    ] }),
    selectedSubject && !analysis && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center py-10 text-sm text-muted-foreground",
        "data-ocid": "co_analysis.no_data_state",
        children: [
          "No records found for subject ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: selectedSubject }),
          "."
        ]
      }
    )
  ] });
}
export {
  CoAnalysisPage as default
};
