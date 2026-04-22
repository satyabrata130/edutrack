import { ChevronDown } from "lucide-react";
import { forwardRef } from "react";
import { cn } from "../lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, placeholder, id, ...props }, ref) => {
    const selectId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={selectId}
            className="text-sm font-medium text-foreground"
          >
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={cn(
              "h-9 w-full appearance-none rounded-md border border-input bg-card px-3 pr-8 py-2 text-sm text-foreground",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-ring",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "transition-smooth",
              error && "border-destructive focus-visible:ring-destructive",
              className,
            )}
            {...props}
          >
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
        </div>
        {error && (
          <p
            className="text-xs text-destructive"
            data-ocid={`${selectId}.field_error`}
          >
            {error}
          </p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";

export { Select };
