import { Link } from "@tanstack/react-router";
import {
  BarChart2,
  BookOpen,
  FileText,
  GraduationCap,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "../components/Badge";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import {
  useExams,
  useIsAdmin,
  useStudents,
  useSubjects,
  useTeachers,
} from "../hooks/useBackend";

interface StatCardProps {
  label: string;
  value: number | string;
  icon: React.ElementType;
  colorClass: string;
  ocid: string;
}

function StatCard({
  label,
  value,
  icon: Icon,
  colorClass,
  ocid,
}: StatCardProps) {
  return (
    <div className="card-elevated rounded-lg p-5" data-ocid={ocid}>
      <div className="flex items-start justify-between mb-3">
        <span className="text-xs font-medium text-muted-foreground">
          {label}
        </span>
        <Icon size={16} className={colorClass} />
      </div>
      <p className="text-2xl font-bold font-mono text-foreground">{value}</p>
    </div>
  );
}

export default function DashboardPage() {
  const { data: students, isLoading: studentsLoading } = useStudents();
  const { data: teachers, isLoading: teachersLoading } = useTeachers();
  const { data: subjects, isLoading: subjectsLoading } = useSubjects();
  const { data: exams, isLoading: examsLoading } = useExams();
  const { data: isAdmin } = useIsAdmin();

  const isLoading =
    studentsLoading || teachersLoading || subjectsLoading || examsLoading;

  // Students per class for bar chart
  const classCounts: Record<string, number> = {};
  for (const s of students ?? []) {
    classCounts[s.className] = (classCounts[s.className] ?? 0) + 1;
  }
  const classChartData = Object.entries(classCounts)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([name, count]) => ({ name, count }));

  const summaryStats = [
    {
      label: "Total Students",
      value: students?.length ?? 0,
      icon: GraduationCap,
      colorClass: "text-chart-1",
      ocid: "dashboard.stat.1",
    },
    {
      label: "Total Teachers",
      value: teachers?.length ?? 0,
      icon: Users,
      colorClass: "text-chart-2",
      ocid: "dashboard.stat.2",
    },
    {
      label: "Subjects",
      value: subjects?.length ?? 0,
      icon: BookOpen,
      colorClass: "text-chart-3",
      ocid: "dashboard.stat.3",
    },
    {
      label: "Exams",
      value: exams?.length ?? 0,
      icon: FileText,
      colorClass: "text-chart-4",
      ocid: "dashboard.stat.4",
    },
  ];

  const quickActions = [
    {
      label: "Enter Marks",
      desc: "Record student marks for exams",
      path: "/marks",
      icon: FileText,
    },
    {
      label: "Search Students",
      desc: "Find students by name or roll number",
      path: "/search",
      icon: GraduationCap,
    },
    {
      label: "View Reports",
      desc: "Individual and class performance reports",
      path: "/reports",
      icon: BarChart2,
    },
    ...(isAdmin
      ? [
          {
            label: "Manage Students",
            desc: "Add, edit, or remove student records",
            path: "/admin/students",
            icon: Users,
          },
          {
            label: "Manage Subjects",
            desc: "Configure subjects for your school",
            path: "/admin/subjects",
            icon: BookOpen,
          },
          {
            label: "Manage Exams",
            desc: "Create and schedule examinations",
            path: "/admin/exams",
            icon: FileText,
          },
        ]
      : []),
  ];

  return (
    <div data-ocid="dashboard.page" className="space-y-8 max-w-5xl">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-display font-bold text-foreground mb-1">
          Dashboard
        </h2>
        <p className="text-muted-foreground text-sm">
          {isAdmin
            ? "Admin view — full access to all features."
            : "Teacher view — manage marks and reports."}
        </p>
      </div>

      {/* Summary stat cards */}
      <div
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        data-ocid="dashboard.stats.section"
      >
        {isLoading
          ? Array.from({ length: 4 }, (_, i) => (
              <div
                key={`skeleton-stat-${i + 1}`}
                className="card-elevated rounded-lg p-5 animate-pulse h-24 bg-muted/30"
              />
            ))
          : summaryStats.map((stat) => <StatCard key={stat.label} {...stat} />)}
      </div>

      {/* Students per class bar chart */}
      {!studentsLoading && classChartData.length > 0 && (
        <div
          className="card-elevated rounded-lg p-6"
          data-ocid="dashboard.class_chart.section"
        >
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp size={16} className="text-primary" />
            <h3 className="text-sm font-semibold text-foreground">
              Students per Class
            </h3>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={classChartData}
              margin={{ top: 4, right: 8, left: -20, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="oklch(var(--border))"
              />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 12, fill: "oklch(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "oklch(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
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
              <Bar
                dataKey="count"
                name="Students"
                fill="oklch(var(--chart-1))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Quick actions */}
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
          Quick Actions
        </h3>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
          data-ocid="dashboard.quickactions.section"
        >
          {quickActions.map((action, i) => (
            <Link
              key={action.path}
              to={action.path}
              data-ocid={`dashboard.quickaction.${i + 1}`}
              className="card-elevated rounded-lg p-4 flex gap-3 items-start hover:bg-muted/30 transition-smooth group"
            >
              <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <action.icon size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {action.label}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {action.desc}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent students */}
      {students && students.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
              Recent Students
            </h3>
            {isAdmin && (
              <Link
                to="/admin/students"
                className="text-xs text-primary hover:underline"
                data-ocid="dashboard.view_all_students_link"
              >
                View all →
              </Link>
            )}
          </div>
          <div className="card-elevated rounded-lg divide-y divide-border overflow-hidden">
            {students.slice(0, 5).map((s, i) => (
              <Link
                key={s.id.toString()}
                to="/reports/$studentId"
                params={{ studentId: s.id.toString() }}
                className="flex items-center gap-4 px-4 py-3 hover:bg-muted/20 transition-colors"
                data-ocid={`dashboard.student.${i + 1}`}
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-primary text-xs font-semibold">
                    {s.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {s.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {s.rollNumber} · {s.className}
                  </p>
                </div>
                <Badge
                  variant={
                    s.enrollmentStatus === "active"
                      ? "success"
                      : s.enrollmentStatus === "graduated"
                        ? "default"
                        : "muted"
                  }
                >
                  {s.enrollmentStatus}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Empty state */}
      {students && students.length === 0 && !studentsLoading && (
        <div
          className="card-elevated rounded-lg p-12 text-center"
          data-ocid="dashboard.empty_state"
        >
          <GraduationCap
            size={40}
            className="text-muted-foreground mx-auto mb-4"
          />
          <p className="text-foreground font-semibold mb-1">No students yet</p>
          <p className="text-sm text-muted-foreground mb-4">
            Start by adding your first student record.
          </p>
          {isAdmin && (
            <Link
              to="/admin/students"
              className="text-primary text-sm hover:underline"
              data-ocid="dashboard.add_students_link"
            >
              Add Students →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
