import { X } from "lucide-react";
import { useEffect } from "react";
import { cn } from "../../lib/utils";
import { Button } from "../Button";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  "data-ocid"?: string;
}

export function Modal({
  open,
  onClose,
  title,
  description,
  children,
  className,
  "data-ocid": dataOcid,
}: ModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      data-ocid={dataOcid ?? "modal.dialog"}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
        role="button"
        tabIndex={0}
        aria-label="Close dialog"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
      />

      {/* Panel */}
      <dialog
        open
        className={cn(
          "relative z-10 w-full max-w-md bg-card border border-border rounded-lg shadow-lg m-0",
          "animate-in fade-in-0 zoom-in-95 duration-200",
          className,
        )}
        aria-labelledby="modal-title"
      >
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b border-border">
          <div>
            <h2
              id="modal-title"
              className="text-base font-semibold text-foreground"
            >
              {title}
            </h2>
            {description && (
              <p className="text-sm text-muted-foreground mt-0.5">
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            data-ocid="modal.close_button"
            className="ml-4 p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">{children}</div>
      </dialog>
    </div>
  );
}

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  loading?: boolean;
  destructive?: boolean;
}

export function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = "Confirm",
  loading,
  destructive,
}: ConfirmModalProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      description={description}
      data-ocid="confirm.dialog"
    >
      <div className="flex justify-end gap-3">
        <Button
          variant="outline"
          onClick={onClose}
          data-ocid="confirm.cancel_button"
        >
          Cancel
        </Button>
        <Button
          variant={destructive ? "destructive" : "primary"}
          onClick={onConfirm}
          loading={loading}
          data-ocid="confirm.confirm_button"
        >
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}
