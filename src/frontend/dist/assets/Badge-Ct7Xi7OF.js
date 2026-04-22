import { j as jsxRuntimeExports, f as cn, N as cva } from "./index-DPO0jM6g.js";
const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary/10 text-primary",
        secondary: "bg-secondary text-secondary-foreground",
        success: "bg-chart-2/15 text-chart-2",
        warning: "bg-chart-4/15 text-chart-4",
        destructive: "bg-destructive/15 text-destructive",
        muted: "bg-muted text-muted-foreground",
        outline: "border border-border text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({ className, variant, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn(badgeVariants({ variant }), className), ...props });
}
export {
  Badge as B
};
