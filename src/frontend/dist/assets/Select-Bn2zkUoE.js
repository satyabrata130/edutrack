import { r as reactExports, j as jsxRuntimeExports, f as cn, I as ChevronDown } from "./index-DPO0jM6g.js";
const Select = reactExports.forwardRef(
  ({ className, label, error, options, placeholder, id, ...props }, ref) => {
    const selectId = id ?? (label == null ? void 0 : label.toLowerCase().replace(/\s+/g, "-"));
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
      label && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: selectId,
          className: "text-sm font-medium text-foreground",
          children: label
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "select",
          {
            ref,
            id: selectId,
            className: cn(
              "h-9 w-full appearance-none rounded-md border border-input bg-card px-3 pr-8 py-2 text-sm text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-ring",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "transition-smooth",
              error && "border-destructive focus-visible:ring-destructive",
              className
            ),
            ...props,
            children: [
              placeholder && /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", disabled: true, children: placeholder }),
              options.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: opt.value, children: opt.label }, opt.value))
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          ChevronDown,
          {
            size: 14,
            className: "pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
          }
        )
      ] }),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-xs text-destructive",
          "data-ocid": `${selectId}.field_error`,
          children: error
        }
      )
    ] });
  }
);
Select.displayName = "Select";
export {
  Select as S
};
