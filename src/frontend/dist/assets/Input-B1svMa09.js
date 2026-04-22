import { e as createLucideIcon, r as reactExports, j as jsxRuntimeExports, f as cn } from "./index-DPO0jM6g.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode);
const Input = reactExports.forwardRef(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id ?? (label == null ? void 0 : label.toLowerCase().replace(/\s+/g, "-"));
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
      label && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "label",
        {
          htmlFor: inputId,
          className: "text-sm font-medium text-foreground",
          children: label
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          ref,
          id: inputId,
          className: cn(
            "h-9 w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-ring",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "transition-smooth",
            error && "border-destructive focus-visible:ring-destructive",
            className
          ),
          ...props
        }
      ),
      error && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: "text-xs text-destructive",
          "data-ocid": `${inputId}.field_error`,
          children: error
        }
      ),
      hint && !error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: hint })
    ] });
  }
);
Input.displayName = "Input";
export {
  Input as I,
  Plus as P
};
