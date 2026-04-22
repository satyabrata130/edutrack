import { cn } from "../lib/utils";

interface Column<T> {
  key: string;
  header: string;
  cell: (row: T, index: number) => React.ReactNode;
  className?: string;
  headerClassName?: string;
  align?: "left" | "right" | "center";
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyFn: (row: T, index: number) => string;
  className?: string;
  "data-ocid"?: string;
  emptyState?: React.ReactNode;
}

export function DataTable<T>({
  columns,
  data,
  keyFn,
  className,
  "data-ocid": dataOcid,
  emptyState,
}: DataTableProps<T>) {
  return (
    <div
      className={cn(
        "w-full overflow-x-auto rounded-lg border border-border",
        className,
      )}
      data-ocid={dataOcid}
    >
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted/40 border-b border-border">
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap",
                  col.align === "right" && "text-right",
                  col.align === "center" && "text-center",
                  col.headerClassName,
                )}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-4 py-12 text-center text-muted-foreground"
              >
                {emptyState ?? "No records found."}
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr
                key={keyFn(row, index)}
                data-ocid={`${dataOcid ?? "table"}.row.${index + 1}`}
                className="bg-card hover:bg-muted/20 transition-colors"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn(
                      "px-4 py-3 text-foreground",
                      col.align === "right" && "text-right",
                      col.align === "center" && "text-center",
                      col.className,
                    )}
                  >
                    {col.cell(row, index)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
