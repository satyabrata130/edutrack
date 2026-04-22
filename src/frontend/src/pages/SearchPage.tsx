import { Link } from "@tanstack/react-router";
import { GraduationCap, Search, TrendingUp, X } from "lucide-react";
import { useState } from "react";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import { Select } from "../components/Select";
import { Skeleton } from "../components/ui/skeleton";
import { useSearchStudents, useStudents } from "../hooks/useBackend";
import { EnrollmentStatus, type StudentView } from "../types";

const STATUS_LABELS: Record<EnrollmentStatus, string> = {
  [EnrollmentStatus.active]: "Active",
  [EnrollmentStatus.inactive]: "Inactive",
  [EnrollmentStatus.graduated]: "Graduated",
  [EnrollmentStatus.suspended]: "Suspended",
};

const STATUS_VARIANTS: Record<
  EnrollmentStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  [EnrollmentStatus.active]: "default",
  [EnrollmentStatus.inactive]: "secondary",
  [EnrollmentStatus.graduated]: "outline",
  [EnrollmentStatus.suspended]: "destructive",
};

const STATUS_DOT: Record<EnrollmentStatus, string> = {
  [EnrollmentStatus.active]: "bg-primary",
  [EnrollmentStatus.inactive]: "bg-muted-foreground",
  [EnrollmentStatus.graduated]: "bg-accent-foreground",
  [EnrollmentStatus.suspended]: "bg-destructive",
};

function StudentCard({
  student,
  index,
}: { student: StudentView; index: number }) {
  const initials = student.name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <Link
      to="/reports/$studentId"
      params={{ studentId: student.id.toString() }}
      data-ocid={`search.result.${index}`}
      className="flex items-center gap-4 p-4 card-elevated rounded-lg hover:shadow-md hover:border-primary/30 transition-smooth group"
    >
      {/* Avatar */}
      <div className="h-11 w-11 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
        <span className="text-primary font-bold text-sm">{initials}</span>
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
            {student.name}
          </p>
          <Badge
            variant={STATUS_VARIANTS[student.enrollmentStatus]}
            className="shrink-0 flex items-center gap-1"
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[student.enrollmentStatus]}`}
            />
            {STATUS_LABELS[student.enrollmentStatus]}
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5">
          Roll: <span className="font-mono">{student.rollNumber}</span>
          <span className="mx-1.5">·</span>
          Class <span className="font-medium">{student.className}</span>
          {student.contact && (
            <>
              <span className="mx-1.5">·</span>
              {student.contact}
            </>
          )}
        </p>
      </div>

      {/* CTA */}
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground group-hover:text-primary transition-colors shrink-0">
        <TrendingUp size={14} />
        <span className="hidden sm:block">View Report</span>
      </div>
    </Link>
  );
}

export default function SearchPage() {
  const [term, setTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Use backend search when term is present, otherwise use full list for display
  const { data: searchResults, isLoading: searchLoading } =
    useSearchStudents(term);
  const { data: allStudents, isLoading: allLoading } = useStudents();

  const isLoading = term.trim() ? searchLoading : allLoading;
  const baseResults: StudentView[] = term.trim()
    ? (searchResults ?? [])
    : (allStudents ?? []);

  const filtered = baseResults.filter(
    (s) => statusFilter === "all" || s.enrollmentStatus === statusFilter,
  );

  const statusCounts = (allStudents ?? []).reduce<Record<string, number>>(
    (acc, s) => {
      acc[s.enrollmentStatus] = (acc[s.enrollmentStatus] ?? 0) + 1;
      return acc;
    },
    {},
  );

  function clearFilters() {
    setTerm("");
    setStatusFilter("all");
  }

  const hasFilters = term.trim() || statusFilter !== "all";

  return (
    <div className="space-y-6 max-w-3xl" data-ocid="search.page">
      {/* Page header */}
      <div>
        <h2 className="text-xl font-display font-bold text-foreground">
          Search Students
        </h2>
        <p className="text-sm text-muted-foreground">
          Find students by name, roll number, or class. Click any card to view
          their performance report.
        </p>
      </div>

      {/* Search bar + filter row */}
      <div className="flex gap-3 flex-wrap items-end">
        <div className="relative flex-1 min-w-48">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
          <input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Type a name, roll number, or class…"
            data-ocid="search.search_input"
            className="h-9 w-full rounded-md border border-input bg-card pl-9 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-ring transition-smooth"
          />
        </div>

        <div className="w-44">
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              {
                value: "all",
                label: `All statuses${allStudents ? ` (${allStudents.length})` : ""}`,
              },
              ...Object.values(EnrollmentStatus).map((s) => ({
                value: s,
                label: `${STATUS_LABELS[s]}${statusCounts[s] !== undefined ? ` (${statusCounts[s]})` : ""}`,
              })),
            ]}
            data-ocid="search.status.select"
          />
        </div>

        {hasFilters && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            data-ocid="search.clear_button"
            className="text-muted-foreground hover:text-foreground h-10"
          >
            <X size={14} className="mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* Results count */}
      {!isLoading && filtered.length > 0 && (
        <p
          className="text-xs text-muted-foreground"
          data-ocid="search.results.count"
        >
          {filtered.length} student{filtered.length !== 1 ? "s" : ""} found
          {statusFilter !== "all" &&
            ` · filtered by ${STATUS_LABELS[statusFilter as EnrollmentStatus]}`}
        </p>
      )}

      {/* Loading skeleton */}
      {isLoading && (
        <div className="space-y-2" data-ocid="search.loading_state">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20 rounded-lg" />
          ))}
        </div>
      )}

      {/* No-term empty state */}
      {!isLoading &&
        !term.trim() &&
        filtered.length === 0 &&
        statusFilter === "all" && (
          <div
            className="flex flex-col items-center py-20 text-center"
            data-ocid="search.empty_state"
          >
            <div className="h-16 w-16 rounded-full bg-muted/60 flex items-center justify-center mb-4">
              <Search size={28} className="text-muted-foreground" />
            </div>
            <p className="font-semibold text-foreground">Search for students</p>
            <p className="text-sm text-muted-foreground mt-1 max-w-xs">
              Enter a name, roll number, or class above to find students. Or use
              the status filter to browse.
            </p>
          </div>
        )}

      {/* No results after search */}
      {!isLoading &&
        (term.trim() || statusFilter !== "all") &&
        filtered.length === 0 && (
          <div
            className="flex flex-col items-center py-16 text-center"
            data-ocid="search.no_results.empty_state"
          >
            <div className="h-16 w-16 rounded-full bg-muted/60 flex items-center justify-center mb-4">
              <GraduationCap size={28} className="text-muted-foreground" />
            </div>
            <p className="font-semibold text-foreground">No students found</p>
            <p className="text-sm text-muted-foreground mt-1">
              Try a different search term or change the status filter.
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="mt-4"
              data-ocid="search.clear_filters_button"
            >
              Clear filters
            </Button>
          </div>
        )}

      {/* Results list */}
      {!isLoading && filtered.length > 0 && (
        <div className="space-y-2" data-ocid="search.results.list">
          {filtered.map((s, i) => (
            <StudentCard key={s.id.toString()} student={s} index={i + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
