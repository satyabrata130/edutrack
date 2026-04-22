import { Search, X } from "lucide-react";
import { cn } from "../../lib/utils";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  "data-ocid"?: string;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  className,
  "data-ocid": dataOcid,
}: SearchBarProps) {
  return (
    <div className={cn("relative", className)}>
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
      />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        data-ocid={dataOcid ?? "search_input"}
        className={cn(
          "h-9 w-full rounded-md border border-input bg-card pl-9 pr-9 py-2 text-sm text-foreground placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-ring",
          "transition-smooth",
        )}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Clear search"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}
