import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  TrendingUp,
  User,
  XCircle,
} from "lucide-react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "../components/Badge";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useStudentReport } from "../hooks/useBackend";
import type { StudentId } from "../types";

const CHART_COLORS = [
  "oklch(var(--chart-1))",
  "oklch(var(--chart-2))",
  "oklch(var(--chart-3))",
  "oklch(var(--chart-4))",
  "oklch(var(--chart-5))",
];

export default function StudentReportPage() {
  const { studentId } = useParams({ from: "/reports/$studentId" });
  const id = BigInt(studentId) as StudentId;
  const { data: report, isLoading } = useStudentReport(id);

  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center py-24"
        data-ocid="student_report.loading_state"
      >
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!report) {
    return (
      <div className="text-center py-24" data-ocid="student_report.error_state">
        <User size={40} className="text-muted-foreground mx-auto mb-3" />
        <p className="text-foreground font-semibold">Report not found</p>
        <p className="text-sm text-muted-foreground mt-1 mb-4">
          This student's report could not be loaded.
        </p>
        <Link
          to="/reports"
          className="text-primary text-sm hover:underline"
          data-ocid="student_report.back_link"
        >
          ← Back to Reports
        </Link>
      </div>
    );
  }

  // Unique exam names and subject names
  const examNames = [...new Set(report.performances.map((p) => p.examName))];
  const subjectNames = [
    ...new Set(report.performances.map((p) => p.subjectName)),
  ];

  // Build chart data: one row per exam, one key per subject
  const chartData = examNames.map((examName) => {
    const entry: Record<string, string | number> = { exam: examName };
    for (const sub of subjectNames) {
      const perf = report.performances.find(
        (p) => p.examName === examName && p.subjectName === sub,
      );
      if (perf) {
        entry[sub] = Number(perf.marksObtained);
      }
    }
    return entry;
  });

  const totalExams = examNames.length;
  const passedCount = report.performances.filter((p) => p.passed).length;
  const totalPerformances = report.performances.length;

  return (
    <div className="space-y-6 max-w-4xl" data-ocid="student_report.page">
      {/* Back nav */}
      <Link
        to="/reports"
        data-ocid="student_report.back_link"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft size={14} /> Back to Reports
      </Link>

      {/* Student info card */}
      <div
        className="card-elevated rounded-lg p-6"
        data-ocid="student_report.info.card"
      >
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <span className="text-primary text-xl font-bold">
              {report.studentName.charAt(0)}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-xl font-display font-bold text-foreground">
              {report.studentName}
            </h2>
            <p className="text-muted-foreground text-sm mt-0.5">
              Roll: {report.rollNumber} · Class {report.className}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-2xl font-bold font-mono text-foreground">
              {report.averageScore.toFixed(1)}%
            </p>
            <Badge
              variant={report.overallPassed ? "success" : "destructive"}
              className="mt-1"
            >
              {report.overallPassed ? "Overall Pass" : "Overall Fail"}
            </Badge>
          </div>
        </div>
      </div>

      {/* Summary cards */}
      <div
        className="grid grid-cols-3 gap-4"
        data-ocid="student_report.summary.section"
      >
        <div
          className="card-elevated rounded-lg p-4"
          data-ocid="student_report.summary.exams_taken"
        >
          <p className="text-xs font-medium text-muted-foreground mb-1">
            Exams Taken
          </p>
          <p className="text-2xl font-bold font-mono text-foreground">
            {totalExams}
          </p>
        </div>
        <div
          className="card-elevated rounded-lg p-4"
          data-ocid="student_report.summary.average_score"
        >
          <p className="text-xs font-medium text-muted-foreground mb-1">
            Average Score
          </p>
          <p className="text-2xl font-bold font-mono text-foreground">
            {report.averageScore.toFixed(1)}%
          </p>
        </div>
        <div
          className="card-elevated rounded-lg p-4"
          data-ocid="student_report.summary.pass_rate"
        >
          <p className="text-xs font-medium text-muted-foreground mb-1">
            Pass Rate
          </p>
          <p className="text-2xl font-bold font-mono text-foreground">
            {totalPerformances > 0
              ? Math.round((passedCount / totalPerformances) * 100)
              : 0}
            %
          </p>
        </div>
      </div>

      {/* Performance trend chart */}
      {chartData.length > 0 ? (
        <div
          className="card-elevated rounded-lg p-6"
          data-ocid="student_report.chart.section"
        >
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <TrendingUp size={16} className="text-primary" />
            Performance Trend Across Exams
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart
              data={chartData}
              margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(var(--border))"
              />
              <XAxis
                dataKey="exam"
                tick={{ fontSize: 12, fill: "oklch(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "oklch(var(--muted-foreground))" }}
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
              />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              {subjectNames.map((sub, i) => (
                <Line
                  key={sub}
                  type="monotone"
                  dataKey={sub}
                  stroke={CHART_COLORS[i % CHART_COLORS.length]}
                  strokeWidth={2.5}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div
          className="card-elevated rounded-lg p-10 text-center"
          data-ocid="student_report.chart.empty_state"
        >
          <TrendingUp
            size={36}
            className="text-muted-foreground mx-auto mb-3"
          />
          <p className="text-foreground font-medium">No performance data yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Marks will appear here once recorded for this student.
          </p>
        </div>
      )}

      {/* Detailed results table */}
      <div
        className="card-elevated rounded-lg overflow-hidden"
        data-ocid="student_report.results.table"
      >
        <div className="px-5 py-4 border-b border-border flex items-center gap-2 bg-muted/20">
          <BookOpen size={15} className="text-muted-foreground" />
          <h3 className="text-sm font-semibold text-foreground">
            Detailed Results
          </h3>
          {totalPerformances > 0 && (
            <span className="ml-auto text-xs text-muted-foreground">
              {passedCount}/{totalPerformances} passed
            </span>
          )}
        </div>

        {report.performances.length === 0 ? (
          <div
            className="p-10 text-center text-muted-foreground text-sm"
            data-ocid="student_report.empty_state"
          >
            No performance records available for this student.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/40 border-b border-border">
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Exam
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Marks
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Max
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  %
                </th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Result
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {report.performances.map((p, i) => {
                const pct =
                  Number(p.maxMarks) > 0
                    ? Math.round(
                        (Number(p.marksObtained) / Number(p.maxMarks)) * 100,
                      )
                    : 0;
                return (
                  <tr
                    key={`${p.examName}-${p.subjectName}`}
                    className="bg-card hover:bg-muted/20 transition-colors"
                    data-ocid={`student_report.result.${i + 1}`}
                  >
                    <td className="px-4 py-3 text-foreground">{p.examName}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {p.subjectName}
                    </td>
                    <td className="px-4 py-3 text-right font-mono font-semibold text-foreground">
                      {p.marksObtained.toString()}
                    </td>
                    <td className="px-4 py-3 text-right font-mono text-muted-foreground">
                      {p.maxMarks.toString()}
                    </td>
                    <td className="px-4 py-3 text-right font-mono">
                      <span
                        className={
                          pct >= 60
                            ? "text-chart-2"
                            : pct >= 40
                              ? "text-chart-4"
                              : "text-chart-5"
                        }
                      >
                        {pct}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      {p.passed ? (
                        <span className="inline-flex items-center gap-1 text-chart-2 text-xs font-semibold">
                          <CheckCircle2 size={13} />
                          Pass
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-chart-5 text-xs font-semibold">
                          <XCircle size={13} />
                          Fail
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
