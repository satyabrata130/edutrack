import { Link } from "@tanstack/react-router";
import { BarChart2, GraduationCap } from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "../components/Badge";
import { Select } from "../components/Select";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import {
  useClassReport,
  useExams,
  useListUploadedPerformance,
  useStudents,
} from "../hooks/useBackend";
import type { ExamId } from "../types";

export default function ReportsPage() {
  const { data: students, isLoading: studentsLoading } = useStudents();
  const { data: exams } = useExams();
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedExamId, setSelectedExamId] = useState<string>("");
  const { data: uploadedRecords = [] } = useListUploadedPerformance();

  const classes = [...new Set((students ?? []).map((s) => s.className))].sort();
  const classOptions = classes.map((c) => ({ value: c, label: `Class ${c}` }));
  const examOptions = (exams ?? []).map((e) => ({
    value: e.id.toString(),
    label: e.name,
  }));

  const examIdBigint = selectedExamId
    ? (BigInt(selectedExamId) as ExamId)
    : (BigInt(0) as ExamId);
  const { data: classReport, isLoading: reportLoading } = useClassReport(
    selectedClass,
    examIdBigint,
  );

  const chartData =
    classReport?.subjectSummaries?.map((s) => ({
      name: s.subjectName,
      average: Math.round(s.averageScore),
    })) ?? [];

  const hasSelection = !!selectedClass && !!selectedExamId;

  return (
    <div className="space-y-8 max-w-5xl" data-ocid="reports.page">
      <div>
        <h2 className="text-xl font-display font-bold text-foreground">
          Reports
        </h2>
        <p className="text-sm text-muted-foreground">
          Individual and class-level performance analysis.
        </p>
      </div>

      {/* Class Report Section */}
      <div
        className="card-elevated rounded-lg overflow-hidden"
        data-ocid="reports.class_filter.section"
      >
        <div className="px-6 py-4 border-b border-border bg-muted/20">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <BarChart2 size={15} className="text-primary" />
            Class Performance Report
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            Select a class and exam to view aggregated performance metrics.
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Select
              options={classOptions}
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              placeholder="Select class…"
              data-ocid="reports.class.select"
              className="sm:w-48"
            />
            <Select
              options={examOptions}
              value={selectedExamId}
              onChange={(e) => setSelectedExamId(e.target.value)}
              placeholder="Select exam…"
              data-ocid="reports.exam.select"
              className="sm:w-64"
            />
          </div>

          {/* Loading */}
          {reportLoading && (
            <div
              className="flex items-center justify-center py-16"
              data-ocid="reports.loading_state"
            >
              <LoadingSpinner size="md" />
            </div>
          )}

          {/* No selection prompt */}
          {!hasSelection && !reportLoading && (
            <div
              className="text-center py-10 text-sm text-muted-foreground"
              data-ocid="reports.no_selection_state"
            >
              Select a class and exam above to generate the class report.
            </div>
          )}

          {/* Report content */}
          {classReport && !reportLoading && (
            <div className="space-y-6">
              {/* Bar chart */}
              {chartData.length > 0 ? (
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Subject Average Scores
                  </p>
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
                        dataKey="name"
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
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "oklch(var(--card))",
                          border: "1px solid oklch(var(--border))",
                          borderRadius: "6px",
                          fontSize: "12px",
                          color: "oklch(var(--foreground))",
                        }}
                        cursor={{ fill: "oklch(var(--muted) / 0.4)" }}
                      />
                      <Legend wrapperStyle={{ fontSize: "12px" }} />
                      <Bar
                        dataKey="average"
                        name="Class Avg Score"
                        fill="oklch(var(--chart-1))"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div
                  className="text-center py-8 text-sm text-muted-foreground"
                  data-ocid="reports.chart_empty_state"
                >
                  No subject data available for this selection.
                </div>
              )}

              {/* Subject summary table */}
              {classReport.subjectSummaries.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Subject Summary
                  </p>
                  <div className="border border-border rounded-lg overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-muted/40 border-b border-border">
                          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Subject
                          </th>
                          <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                            Avg Score
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">
                            Top Student
                          </th>
                          <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden sm:table-cell">
                            Needs Attention
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {classReport.subjectSummaries.map((sub, i) => (
                          <tr
                            key={sub.subjectId.toString()}
                            className="bg-card hover:bg-muted/20 transition-colors"
                            data-ocid={`reports.subject_summary.${i + 1}`}
                          >
                            <td className="px-4 py-3 font-medium text-foreground">
                              {sub.subjectName}
                            </td>
                            <td className="px-4 py-3 text-right font-mono font-semibold">
                              <span
                                className={
                                  sub.averageScore >= 60
                                    ? "text-chart-2"
                                    : sub.averageScore >= 40
                                      ? "text-chart-4"
                                      : "text-chart-5"
                                }
                              >
                                {sub.averageScore.toFixed(1)}%
                              </span>
                            </td>
                            <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                              {sub.topStudent ?? "—"}
                            </td>
                            <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                              {sub.bottomStudent ?? "—"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Top & bottom performers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  className="p-4 bg-muted/30 rounded-lg"
                  data-ocid="reports.top_performers.section"
                >
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Top Performers
                  </p>
                  {classReport.topPerformers.length > 0 ? (
                    <ul className="space-y-1.5">
                      {classReport.topPerformers.map((name, i) => (
                        <li
                          key={name}
                          className="flex items-center gap-2 text-sm"
                          data-ocid={`reports.top_performer.${i + 1}`}
                        >
                          <span className="w-5 h-5 rounded-full bg-chart-2/20 text-chart-2 flex items-center justify-center text-xs font-bold shrink-0">
                            {i + 1}
                          </span>
                          <span className="text-foreground">{name}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">No data</p>
                  )}
                </div>

                <div
                  className="p-4 bg-muted/30 rounded-lg"
                  data-ocid="reports.bottom_performers.section"
                >
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    Needs Attention
                  </p>
                  {classReport.bottomPerformers.length > 0 ? (
                    <ul className="space-y-1.5">
                      {classReport.bottomPerformers.map((name, i) => (
                        <li
                          key={name}
                          className="flex items-center gap-2 text-sm"
                          data-ocid={`reports.bottom_performer.${i + 1}`}
                        >
                          <span className="w-5 h-5 rounded-full bg-chart-5/20 text-chart-5 flex items-center justify-center text-xs font-bold shrink-0">
                            {i + 1}
                          </span>
                          <span className="text-foreground">{name}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-muted-foreground">No data</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Selection made but no data returned */}
          {hasSelection && !reportLoading && !classReport && (
            <div
              className="text-center py-8 text-sm text-muted-foreground"
              data-ocid="reports.no_data_state"
            >
              No report data found for the selected class and exam.
            </div>
          )}
        </div>
      </div>

      {/* Individual student reports */}
      <div>
        {/* Uploaded data total marks */}
        {uploadedRecords.length > 0 && (
          <div
            className="card-elevated rounded-lg overflow-hidden mb-6"
            data-ocid="reports.uploaded_totals.section"
          >
            <div className="px-6 py-4 border-b border-border bg-muted/20">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <BarChart2 size={15} className="text-primary" />
                Uploaded Data — Total Marks
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Total = Midsem + Quiz + Assignment + Attendance (all CO sums)
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-muted/30 border-b border-border">
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Student ID
                    </th>
                    <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-4 py-2.5 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Midsem
                    </th>
                    <th className="px-4 py-2.5 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Quiz
                    </th>
                    <th className="px-4 py-2.5 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Assignment
                    </th>
                    <th className="px-4 py-2.5 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                      Attendance
                    </th>
                    <th className="px-4 py-2.5 text-right text-xs font-semibold text-foreground uppercase tracking-wider">
                      Total Mark
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {uploadedRecords.map((rec, i) => {
                    const mSum =
                      rec.midsem.co1 +
                      rec.midsem.co2 +
                      rec.midsem.co3 +
                      rec.midsem.co4 +
                      rec.midsem.co5;
                    const qSum =
                      rec.quiz.co1 +
                      rec.quiz.co2 +
                      rec.quiz.co3 +
                      rec.quiz.co4 +
                      rec.quiz.co5;
                    const aSum =
                      rec.assignment.co1 +
                      rec.assignment.co2 +
                      rec.assignment.co3 +
                      rec.assignment.co4 +
                      rec.assignment.co5;
                    const atSum =
                      rec.attendance.co1 +
                      rec.attendance.co2 +
                      rec.attendance.co3 +
                      rec.attendance.co4 +
                      rec.attendance.co5;
                    return (
                      <tr
                        key={rec.id}
                        className="bg-card hover:bg-muted/20 transition-colors"
                        data-ocid={`reports.uploaded_total.${i + 1}`}
                      >
                        <td className="px-4 py-2.5 font-mono text-foreground">
                          {rec.studentId}
                        </td>
                        <td className="px-4 py-2.5 font-medium text-foreground">
                          {rec.subjectCode}
                        </td>
                        <td className="px-4 py-2.5 text-right tabular-nums text-muted-foreground">
                          {mSum}
                        </td>
                        <td className="px-4 py-2.5 text-right tabular-nums text-muted-foreground">
                          {qSum}
                        </td>
                        <td className="px-4 py-2.5 text-right tabular-nums text-muted-foreground">
                          {aSum}
                        </td>
                        <td className="px-4 py-2.5 text-right tabular-nums text-muted-foreground">
                          {atSum}
                        </td>
                        <td className="px-4 py-2.5 text-right font-semibold font-mono text-foreground">
                          {rec.totalMark}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
          Individual Student Reports
        </h3>
        {studentsLoading ? (
          <div
            className="flex items-center justify-center py-12"
            data-ocid="reports.students_loading_state"
          >
            <LoadingSpinner size="md" />
          </div>
        ) : students && students.length > 0 ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
            data-ocid="reports.students.list"
          >
            {students.map((s, i) => (
              <Link
                key={s.id.toString()}
                to="/reports/$studentId"
                params={{ studentId: s.id.toString() }}
                data-ocid={`reports.student.${i + 1}`}
                className="card-elevated rounded-lg p-4 flex items-center gap-3 hover:bg-muted/20 transition-smooth group"
              >
                <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <span className="text-primary text-sm font-semibold">
                    {s.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                    {s.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {s.rollNumber} · {s.className}
                  </p>
                </div>
                <Badge
                  variant={
                    s.enrollmentStatus === "active" ? "success" : "muted"
                  }
                  className="shrink-0"
                >
                  {s.enrollmentStatus}
                </Badge>
              </Link>
            ))}
          </div>
        ) : (
          <div
            className="text-center py-12 card-elevated rounded-lg"
            data-ocid="reports.empty_state"
          >
            <GraduationCap
              size={36}
              className="text-muted-foreground mx-auto mb-3"
            />
            <p className="text-foreground font-medium">No students found</p>
            <p className="text-sm text-muted-foreground mt-1">
              Add students to generate individual reports.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
