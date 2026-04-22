import {
  AlertCircle,
  CheckCircle2,
  FileSpreadsheet,
  Trash2,
  Upload,
  XCircle,
} from "lucide-react";
import Papa from "papaparse";
import { useCallback, useRef, useState } from "react";
import * as XLSX from "xlsx";
import {
  useDeleteUploadedRecord,
  useIsAdmin,
  useListUploadedPerformance,
  useUpdateUploadedRecord,
  useUploadPerformance,
} from "../hooks/useBackend";
import { cn } from "../lib/utils";
import type {
  CoMarks,
  PerformanceRecordView,
  UploadRecordRequest,
} from "../types";

// ─── CSV/XLSX parsing helpers ──────────────────────────────────────────────

function parseCo(row: Record<string, string>, prefix: string): CoMarks {
  return {
    co1: Number(row[`${prefix}_CO1`] ?? row[`${prefix}_co1`] ?? 0),
    co2: Number(row[`${prefix}_CO2`] ?? row[`${prefix}_co2`] ?? 0),
    co3: Number(row[`${prefix}_CO3`] ?? row[`${prefix}_co3`] ?? 0),
    co4: Number(row[`${prefix}_CO4`] ?? row[`${prefix}_co4`] ?? 0),
    co5: Number(row[`${prefix}_CO5`] ?? row[`${prefix}_co5`] ?? 0),
  };
}

function rowToRequest(row: Record<string, string>): UploadRecordRequest | null {
  const studentId = Number(row.StudentId ?? row.studentId ?? row.student_id);
  const subjectCode = String(
    row.SubjectCode ?? row.subjectCode ?? row.subject_code ?? "",
  ).trim();
  if (!studentId || !subjectCode) return null;
  return {
    studentId,
    subjectCode,
    midsem: parseCo(row, "Midsem"),
    quiz: parseCo(row, "Quiz"),
    assignment: parseCo(row, "Assignment"),
    attendance: parseCo(row, "Attendance"),
  };
}

function parseCSV(text: string): UploadRecordRequest[] {
  const { data } = Papa.parse<Record<string, string>>(text, {
    header: true,
    skipEmptyLines: true,
  });
  return data.flatMap((r) => {
    const req = rowToRequest(r);
    return req ? [req] : [];
  });
}

function parseExcel(buffer: ArrayBuffer): UploadRecordRequest[] {
  const wb = XLSX.read(buffer, { type: "array" });
  const ws = wb.Sheets[wb.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json<Record<string, string>>(ws, {
    defval: "0",
    raw: false,
  });
  return data.flatMap((r) => {
    const req = rowToRequest(r);
    return req ? [req] : [];
  });
}

// ─── EditableCell ──────────────────────────────────────────────────────────

function EditableCell({
  value,
  onSave,
}: {
  value: number;
  onSave: (v: number) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(String(value));

  const commit = () => {
    const n = Number(draft);
    if (!Number.isNaN(n)) onSave(n);
    setEditing(false);
  };

  if (editing) {
    return (
      <input
        type="number"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => e.key === "Enter" && commit()}
        className="w-14 border border-input rounded px-1 py-0.5 text-xs bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        ref={(el) => el?.focus()}
      />
    );
  }
  return (
    <button
      type="button"
      onClick={() => setEditing(true)}
      className="cursor-pointer hover:text-primary underline-offset-2 hover:underline tabular-nums bg-transparent border-none p-0"
    >
      {value}
    </button>
  );
}

// ─── Upload Page ───────────────────────────────────────────────────────────

export default function UploadPage() {
  const [dragActive, setDragActive] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);
  const [lastFileName, setLastFileName] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutateAsync: uploadPerformance, isPending } = useUploadPerformance();
  const { data: records = [] } = useListUploadedPerformance();
  const { mutate: deleteRecord } = useDeleteUploadedRecord();
  const { mutate: updateRecord } = useUpdateUploadedRecord();
  const { data: isAdmin } = useIsAdmin();

  const processFile = useCallback(
    async (file: File) => {
      setParseError(null);
      setUploadSuccess(false);
      setLastFileName(file.name);
      try {
        let requests: UploadRecordRequest[];
        if (file.name.endsWith(".csv") || file.type === "text/csv") {
          const text = await file.text();
          requests = parseCSV(text);
        } else {
          const buffer = await file.arrayBuffer();
          requests = parseExcel(buffer);
        }
        if (requests.length === 0) {
          setParseError(
            "No valid rows found. Ensure columns: StudentId, SubjectCode, Midsem_CO1…CO5, Quiz_CO1…CO5, Assignment_CO1…CO5, Attendance_CO1…CO5",
          );
          return;
        }
        await uploadPerformance(requests);
        setUploadSuccess(true);
      } catch (err) {
        setParseError(
          err instanceof Error ? err.message : "Failed to parse file.",
        );
      }
    },
    [uploadPerformance],
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile],
  );

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    e.target.value = "";
  };

  // Group records by subjectCode for display
  const subjects = [...new Set(records.map((r) => r.subjectCode))].sort();
  const [filterSubject, setFilterSubject] = useState<string>("all");
  const displayed =
    filterSubject === "all"
      ? records
      : records.filter((r) => r.subjectCode === filterSubject);

  const handleComponentEdit = (
    record: PerformanceRecordView,
    component: keyof Pick<
      PerformanceRecordView,
      "midsem" | "quiz" | "assignment" | "attendance"
    >,
    co: keyof CoMarks,
    newVal: number,
  ) => {
    updateRecord({
      id: record.id,
      updates: {
        [component]: { ...record[component], [co]: newVal },
      },
    });
  };

  return (
    <div className="space-y-6 max-w-6xl" data-ocid="upload.page">
      <div>
        <h2 className="text-xl font-display font-bold text-foreground">
          Upload Data
        </h2>
        <p className="text-sm text-muted-foreground">
          Import student performance data from Excel (.xlsx) or CSV files. Data
          is added to existing records.
        </p>
      </div>

      {/* Drop zone */}
      <button
        type="button"
        className={cn(
          "upload-zone w-full flex flex-col items-center justify-center gap-3 cursor-pointer text-left",
          dragActive && "upload-zone-active",
          parseError && "upload-zone-error",
        )}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        aria-label="Upload file drop zone"
        data-ocid="upload.dropzone"
        disabled={isPending}
      >
        <Upload
          size={40}
          className={cn(
            "transition-smooth",
            dragActive ? "text-primary" : "text-muted-foreground",
          )}
        />
        <div className="text-center">
          <p className="font-medium text-foreground text-sm">
            Drag &amp; drop Excel or CSV file
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            or click to browse
          </p>
        </div>
        <span
          className="px-4 py-1.5 rounded-md border border-border bg-card text-sm font-medium text-foreground hover:bg-muted transition-smooth pointer-events-none"
          data-ocid="upload.browse_button"
        >
          {isPending ? "Processing…" : "Browse Files"}
        </span>
        <input
          ref={inputRef}
          type="file"
          accept=".csv,.xlsx,.xls"
          className="hidden"
          onChange={onFileChange}
          data-ocid="upload.file_input"
        />
      </button>

      {/* Status row */}
      {lastFileName && (
        <div className="flex items-center gap-2">
          <FileSpreadsheet
            size={14}
            className="text-muted-foreground shrink-0"
          />
          <span className="text-sm text-muted-foreground truncate">
            {lastFileName}
          </span>
          {uploadSuccess && !parseError && (
            <span
              className="import-status-badge import-success ml-auto shrink-0"
              data-ocid="upload.success_state"
            >
              <CheckCircle2 size={13} />
              Uploaded successfully
            </span>
          )}
          {parseError && (
            <span
              className="import-status-badge import-error ml-auto shrink-0"
              data-ocid="upload.error_state"
            >
              <XCircle size={13} />
              Error
            </span>
          )}
        </div>
      )}

      {parseError && (
        <div
          className="flex items-start gap-2 p-3 rounded-md bg-destructive/8 border border-destructive/30 text-destructive text-sm"
          data-ocid="upload.parse_error"
        >
          <AlertCircle size={15} className="mt-0.5 shrink-0" />
          {parseError}
        </div>
      )}

      {/* Template hint */}
      <div className="p-3 bg-muted/40 rounded-md border border-border text-xs text-muted-foreground">
        <strong className="text-foreground">Expected columns:</strong>{" "}
        StudentId, SubjectCode, Midsem_CO1–CO5, Quiz_CO1–CO5,
        Assignment_CO1–CO5, Attendance_CO1–CO5
      </div>

      {/* Records table */}
      {records.length > 0 && (
        <div
          className="card-elevated rounded-lg overflow-hidden"
          data-ocid="upload.records.section"
        >
          <div className="px-5 py-3.5 border-b border-border bg-muted/20 flex items-center gap-3 flex-wrap">
            <h3 className="text-sm font-semibold text-foreground flex-1">
              Imported Student Records
              <span className="ml-2 text-xs font-normal text-muted-foreground">
                ({records.length} records)
              </span>
            </h3>
            {subjects.length > 1 && (
              <select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="text-xs border border-input rounded-md px-2 py-1.5 bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                data-ocid="upload.subject_filter.select"
              >
                <option value="all">All subjects</option>
                {subjects.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="bg-muted/30 border-b border-border">
                  <th className="px-4 py-2.5 text-left font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                    Student ID
                  </th>
                  <th className="px-4 py-2.5 text-left font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                    Subject
                  </th>
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
                  <th className="px-4 py-2.5" />
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {displayed.map((rec, i) => (
                  <tr
                    key={rec.id}
                    className="table-hover-row bg-card"
                    data-ocid={`upload.record.${i + 1}`}
                  >
                    <td className="px-4 py-2.5 font-mono text-foreground">
                      {rec.studentId}
                    </td>
                    <td className="px-4 py-2.5 font-medium text-foreground">
                      {rec.subjectCode}
                    </td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-muted-foreground">
                      <CoEditor
                        record={rec}
                        component="midsem"
                        onEdit={handleComponentEdit}
                      />
                    </td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-muted-foreground">
                      <CoEditor
                        record={rec}
                        component="quiz"
                        onEdit={handleComponentEdit}
                      />
                    </td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-muted-foreground">
                      <CoEditor
                        record={rec}
                        component="assignment"
                        onEdit={handleComponentEdit}
                      />
                    </td>
                    <td className="px-4 py-2.5 text-right tabular-nums text-muted-foreground">
                      <CoEditor
                        record={rec}
                        component="attendance"
                        onEdit={handleComponentEdit}
                      />
                    </td>
                    <td className="px-4 py-2.5 text-right font-semibold font-mono text-foreground">
                      {rec.totalMark}
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      {isAdmin && (
                        <button
                          type="button"
                          onClick={() => deleteRecord(rec.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                          aria-label="Delete record"
                          data-ocid={`upload.delete_button.${i + 1}`}
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {displayed.length === 0 && (
            <div
              className="py-10 text-center text-sm text-muted-foreground"
              data-ocid="upload.records.empty_state"
            >
              No records match this filter.
            </div>
          )}

          {/* Summary row */}
          <div className="px-5 py-3 border-t border-border bg-muted/10 flex items-center gap-6 text-xs text-muted-foreground">
            <span>
              Showing {displayed.length} of {records.length} records
            </span>
            {displayed.length > 0 && (
              <span className="ml-auto text-foreground font-medium">
                Avg Total:{" "}
                {Math.round(
                  displayed.reduce((s, r) => s + r.totalMark, 0) /
                    displayed.length,
                )}
              </span>
            )}
          </div>
        </div>
      )}

      {records.length === 0 && !isPending && (
        <div
          className="text-center py-14 card-elevated rounded-lg"
          data-ocid="upload.empty_state"
        >
          <FileSpreadsheet
            size={40}
            className="text-muted-foreground mx-auto mb-3"
          />
          <p className="text-foreground font-medium">No data uploaded yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Upload an Excel or CSV file to import student performance records.
          </p>
        </div>
      )}
    </div>
  );
}

// ─── CoEditor — inline display + expand on click ───────────────────────────

function CoEditor({
  record,
  component,
  onEdit,
}: {
  record: PerformanceRecordView;
  component: keyof Pick<
    PerformanceRecordView,
    "midsem" | "quiz" | "assignment" | "attendance"
  >;
  onEdit: (
    rec: PerformanceRecordView,
    comp: keyof Pick<
      PerformanceRecordView,
      "midsem" | "quiz" | "assignment" | "attendance"
    >,
    co: keyof CoMarks,
    val: number,
  ) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const cm = record[component];
  const total = cm.co1 + cm.co2 + cm.co3 + cm.co4 + cm.co5;
  const cos: (keyof CoMarks)[] = ["co1", "co2", "co3", "co4", "co5"];

  if (!expanded) {
    return (
      <button
        type="button"
        onClick={() => setExpanded(true)}
        className="cursor-pointer hover:text-primary tabular-nums bg-transparent border-none p-0 text-inherit"
        title="Click to edit CO breakdown"
      >
        {total}
      </button>
    );
  }

  return (
    <span className="inline-flex flex-col gap-0.5 items-end">
      {cos.map((co) => (
        <span key={co} className="inline-flex items-center gap-1">
          <span className="text-muted-foreground">{co.toUpperCase()}:</span>
          <EditableCell
            value={cm[co]}
            onSave={(v) => onEdit(record, component, co, v)}
          />
        </span>
      ))}
      <button
        type="button"
        onClick={() => setExpanded(false)}
        className="text-muted-foreground text-xs hover:text-foreground mt-0.5"
      >
        collapse
      </button>
    </span>
  );
}
