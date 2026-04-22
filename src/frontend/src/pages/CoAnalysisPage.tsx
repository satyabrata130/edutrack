import {
  BookOpen,
  LineChart as LineChartIcon,
  TrendingUp,
  Users,
} from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  useCoAttainmentAnalysis,
  useListUploadedPerformance,
} from "../hooks/useBackend";
import type { AttainmentLevel, CoMarks, PerformanceRecordView } from "../types";

// ─── Attainment badge ──────────────────────────────────────────────────────

function AttainmentBadge({ level }: { level: AttainmentLevel }) {
  const map = {
    level1: {
      label: "Level 1",
      className: "bg-chart-5/15 text-chart-5 border border-chart-5/30",
    },
    level2: {
      label: "Level 2",
      className: "bg-chart-4/15 text-chart-4 border border-chart-4/30",
    },
    level3: {
      label: "Level 3",
      className: "bg-chart-2/15 text-chart-2 border border-chart-2/30",
    },
  };
  const { label, className } = map[level];
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${className}`}
    >
      {label}
    </span>
  );
}

// ─── CO bar colours ────────────────────────────────────────────────────────

const CO_COLORS = [
  "oklch(var(--chart-1))",
  "oklch(var(--chart-2))",
  "oklch(var(--chart-3))",
  "oklch(var(--chart-4))",
  "oklch(var(--chart-5))",
];

// ─── Helpers ───────────────────────────────────────────────────────────────

function coSum(cm: CoMarks): number {
  return cm.co1 + cm.co2 + cm.co3 + cm.co4 + cm.co5;
}

function studentTotalByCo(
  rec: PerformanceRecordView,
  co: keyof CoMarks,
): number {
  return (
    rec.midsem[co] + rec.quiz[co] + rec.assignment[co] + rec.attendance[co]
  );
}

// ─── Subject selector ──────────────────────────────────────────────────────

function SubjectSelector({
  subjects,
  value,
  onChange,
}: {
  subjects: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border border-input rounded-md px-3 py-1.5 text-sm bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
      data-ocid="co_analysis.subject.select"
    >
      <option value="">Select subject…</option>
      {subjects.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}

// ─── CoAnalysis Page ───────────────────────────────────────────────────────

export default function CoAnalysisPage() {
  const { data: allRecords = [] } = useListUploadedPerformance();
  const subjects = [...new Set(allRecords.map((r) => r.subjectCode))].sort();
  const [selectedSubject, setSelectedSubject] = useState<string>("");

  const { data: analysis } = useCoAttainmentAnalysis(selectedSubject);
  const { data: subjectRecords = [] } = useListUploadedPerformance(
    selectedSubject || undefined,
  );

  const chartData =
    analysis?.coAttainments.map((ca, i) => ({
      co: ca.co,
      passPercentage: ca.passPercentage,
      fill: CO_COLORS[i % CO_COLORS.length],
    })) ?? [];

  const coKeys: (keyof CoMarks)[] = ["co1", "co2", "co3", "co4", "co5"];

  return (
    <div className="space-y-6 max-w-6xl" data-ocid="co_analysis.page">
      {/* Header */}
      <div>
        <h2 className="text-xl font-display font-bold text-foreground">
          CO Analysis
        </h2>
        <p className="text-sm text-muted-foreground">
          Course Outcome attainment analysis based on uploaded performance data.
        </p>
      </div>

      {/* Subject selector */}
      <div className="flex items-center gap-3 flex-wrap">
        <SubjectSelector
          subjects={subjects}
          value={selectedSubject}
          onChange={setSelectedSubject}
        />
        {analysis && (
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Users size={14} />
            <span>{analysis.totalStudents} students</span>
          </div>
        )}
      </div>

      {/* No data uploaded */}
      {allRecords.length === 0 && (
        <div
          className="text-center py-16 card-elevated rounded-lg"
          data-ocid="co_analysis.empty_state"
        >
          <BookOpen size={40} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-foreground font-medium">
            No performance data available
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            Upload student data from the{" "}
            <a href="/upload" className="text-primary hover:underline">
              Upload Data
            </a>{" "}
            page first.
          </p>
        </div>
      )}

      {/* Subject not selected */}
      {allRecords.length > 0 && !selectedSubject && (
        <div
          className="text-center py-12 text-sm text-muted-foreground"
          data-ocid="co_analysis.no_selection_state"
        >
          Select a subject above to view CO attainment analysis.
        </div>
      )}

      {/* Analysis content */}
      {selectedSubject && analysis && (
        <>
          {/* CO Attainment tiles */}
          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
            data-ocid="co_analysis.attainment_tiles"
          >
            {analysis.coAttainments.map((ca, i) => (
              <div
                key={ca.co}
                className="co-attainment-tile rounded-lg"
                data-ocid={`co_analysis.co_tile.${i + 1}`}
              >
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {ca.co}
                </p>
                <p
                  className="text-2xl font-display font-bold text-foreground tabular-nums"
                  style={{ color: CO_COLORS[i % CO_COLORS.length] }}
                >
                  {ca.passPercentage.toFixed(1)}%
                </p>
                <AttainmentBadge level={ca.attainmentLevel} />
              </div>
            ))}
          </div>

          {/* Chart + Attainment Table side-by-side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Bar chart */}
            <div
              className="card-elevated rounded-lg overflow-hidden"
              data-ocid="co_analysis.chart.section"
            >
              <div className="px-5 py-3.5 border-b border-border bg-muted/20">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <TrendingUp size={14} className="text-primary" />
                  Pass % per Course Outcome
                </h3>
              </div>
              <div className="p-4">
                <ResponsiveContainer width="100%" height={240}>
                  <BarChart
                    data={chartData}
                    margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="oklch(var(--border))"
                    />
                    <XAxis
                      dataKey="co"
                      tick={{
                        fontSize: 12,
                        fill: "oklch(var(--muted-foreground))",
                      }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      tick={{
                        fontSize: 12,
                        fill: "oklch(var(--muted-foreground))",
                      }}
                      tickLine={false}
                      axisLine={false}
                      domain={[0, 100]}
                      tickFormatter={(v) => `${v}%`}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "oklch(var(--card))",
                        border: "1px solid oklch(var(--border))",
                        borderRadius: "6px",
                        fontSize: "12px",
                        color: "oklch(var(--foreground))",
                      }}
                      formatter={(value: number) => [`${value}%`, "Pass %"]}
                      cursor={{ fill: "oklch(var(--muted) / 0.4)" }}
                    />
                    <Bar dataKey="passPercentage" radius={[4, 4, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell
                          key={entry.co}
                          fill={CO_COLORS[index % CO_COLORS.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Attainment table */}
            <div
              className="card-elevated rounded-lg overflow-hidden"
              data-ocid="co_analysis.attainment_table.section"
            >
              <div className="px-5 py-3.5 border-b border-border bg-muted/20">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <LineChartIcon size={14} className="text-primary" />
                  CO-wise Attainment Summary
                </h3>
              </div>
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/30 border-b border-border">
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      CO
                    </th>
                    <th className="px-4 py-2.5 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Pass %
                    </th>
                    <th className="px-4 py-2.5 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Attainment
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {analysis.coAttainments.map((ca, i) => (
                    <tr
                      key={ca.co}
                      className="table-hover-row bg-card"
                      data-ocid={`co_analysis.attainment_row.${i + 1}`}
                    >
                      <td className="px-4 py-3 font-semibold text-foreground">
                        {ca.co}
                      </td>
                      <td className="px-4 py-3 text-right tabular-nums font-mono">
                        <span
                          style={{ color: CO_COLORS[i % CO_COLORS.length] }}
                          className="font-semibold"
                        >
                          {ca.passPercentage.toFixed(1)}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <AttainmentBadge level={ca.attainmentLevel} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Individual student breakdown */}
          {subjectRecords.length > 0 && (
            <div
              className="card-elevated rounded-lg overflow-hidden"
              data-ocid="co_analysis.student_table.section"
            >
              <div className="px-5 py-3.5 border-b border-border bg-muted/20">
                <h3 className="text-sm font-semibold text-foreground">
                  Individual Student CO Breakdown
                  <span className="ml-2 text-xs font-normal text-muted-foreground">
                    ({subjectRecords.length} students)
                  </span>
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-muted/30 border-b border-border">
                      <th className="px-4 py-2.5 text-left font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                        Student ID
                      </th>
                      {coKeys.map((co) => (
                        <th
                          key={co}
                          className="px-4 py-2.5 text-right font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap"
                        >
                          {co.toUpperCase()}
                        </th>
                      ))}
                      <th className="px-4 py-2.5 text-right font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                        Midsem
                      </th>
                      <th className="px-4 py-2.5 text-right font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                        Quiz
                      </th>
                      <th className="px-4 py-2.5 text-right font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                        Assignment
                      </th>
                      <th className="px-4 py-2.5 text-right font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                        Attendance
                      </th>
                      <th className="px-4 py-2.5 text-right font-semibold text-foreground uppercase tracking-wider whitespace-nowrap">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {subjectRecords.map((rec, i) => (
                      <tr
                        key={rec.id}
                        className="table-hover-row bg-card"
                        data-ocid={`co_analysis.student_row.${i + 1}`}
                      >
                        <td className="px-4 py-2.5 font-mono text-foreground">
                          {rec.studentId}
                        </td>
                        {coKeys.map((co) => (
                          <td
                            key={co}
                            className="px-4 py-2.5 text-right tabular-nums text-muted-foreground"
                          >
                            {studentTotalByCo(rec, co)}
                          </td>
                        ))}
                        <td className="px-4 py-2.5 text-right tabular-nums text-muted-foreground">
                          {coSum(rec.midsem)}
                        </td>
                        <td className="px-4 py-2.5 text-right tabular-nums text-muted-foreground">
                          {coSum(rec.quiz)}
                        </td>
                        <td className="px-4 py-2.5 text-right tabular-nums text-muted-foreground">
                          {coSum(rec.assignment)}
                        </td>
                        <td className="px-4 py-2.5 text-right tabular-nums text-muted-foreground">
                          {coSum(rec.attendance)}
                        </td>
                        <td className="px-4 py-2.5 text-right font-semibold font-mono text-foreground">
                          {rec.totalMark}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* Selected subject but no data */}
      {selectedSubject && !analysis && (
        <div
          className="text-center py-10 text-sm text-muted-foreground"
          data-ocid="co_analysis.no_data_state"
        >
          No records found for subject <strong>{selectedSubject}</strong>.
        </div>
      )}
    </div>
  );
}
