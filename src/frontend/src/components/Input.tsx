import { forwardRef } from "react";
import { cn } from "../lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, id, ...props }, ref) => {
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-foreground"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "h-9 w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-ring",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "transition-smooth",
            error && "border-destructive focus-visible:ring-destructive",
            className,
          )}
          {...props}
        />
        {error && (
          <p
            className="text-xs text-destructive"
            data-ocid={`${inputId}.field_error`}
          >
            {error}
          </p>
        )}
        {hint && !error && (
          <p className="text-xs text-muted-foreground">{hint}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
