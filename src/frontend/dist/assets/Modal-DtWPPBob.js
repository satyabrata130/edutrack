import { j as jsxRuntimeExports, f as cn, r as reactExports, X, l as Button } from "./index-DPO0jM6g.js";
function DataTable({
  columns,
  data,
  keyFn,
  className,
  "data-ocid": dataOcid,
  emptyState
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn(
        "w-full overflow-x-auto rounded-lg border border-border",
        className
      ),
      "data-ocid": dataOcid,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "bg-muted/40 border-b border-border", children: columns.map((col) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "th",
          {
            className: cn(
              "px-4 py-3 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider whitespace-nowrap",
              col.align === "right" && "text-right",
              col.align === "center" && "text-center",
              col.headerClassName
            ),
            children: col.header
          },
          col.key
        )) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-border", children: data.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "td",
          {
            colSpan: columns.length,
            className: "px-4 py-12 text-center text-muted-foreground",
            children: emptyState ?? "No records found."
          }
        ) }) : data.map((row, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "tr",
          {
            "data-ocid": `${dataOcid ?? "table"}.row.${index + 1}`,
            className: "bg-card hover:bg-muted/20 transition-colors",
            children: columns.map((col) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "td",
              {
                className: cn(
                  "px-4 py-3 text-foreground",
                  col.align === "right" && "text-right",
                  col.align === "center" && "text-center",
                  col.className
                ),
                children: col.cell(row, index)
              },
              col.key
            ))
          },
          keyFn(row, index)
        )) })
      ] })
    }
  );
}
function Modal({
  open,
  onClose,
  title,
  description,
  children,
  className,
  "data-ocid": dataOcid
}) {
  reactExports.useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (open) {
      document.addEventListener("keydown", handler);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);
  if (!open) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4",
      "data-ocid": dataOcid ?? "modal.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 bg-foreground/40 backdrop-blur-sm",
            role: "button",
            tabIndex: 0,
            "aria-label": "Close dialog",
            onClick: onClose,
            onKeyDown: (e) => e.key === "Escape" && onClose()
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "dialog",
          {
            open: true,
            className: cn(
              "relative z-10 w-full max-w-md bg-card border border-border rounded-lg shadow-lg m-0",
              "animate-in fade-in-0 zoom-in-95 duration-200",
              className
            ),
            "aria-labelledby": "modal-title",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between p-5 border-b border-border", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "h2",
                    {
                      id: "modal-title",
                      className: "text-base font-semibold text-foreground",
                      children: title
                    }
                  ),
                  description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: description })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    "data-ocid": "modal.close_button",
                    className: "ml-4 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0",
                    "aria-label": "Close dialog",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 18 })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5", children })
            ]
          }
        )
      ]
    }
  );
}
function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  loading,
  destructive
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Modal,
    {
      open,
      onClose,
      title,
      description,
      "data-ocid": "confirm.dialog",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            onClick: onClose,
            "data-ocid": "confirm.cancel_button",
            children: "Cancel"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: destructive ? "destructive" : "primary",
            onClick: onConfirm,
            loading,
            "data-ocid": "confirm.confirm_button",
            children: confirmLabel
          }
        )
      ] })
    }
  );
}
export {
  ConfirmModal as C,
  DataTable as D,
  Modal as M
};
