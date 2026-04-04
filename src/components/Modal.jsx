
import { X } from "lucide-react";
import Button from "./Button";

/*
 * Handles confirm, alert, and info dialogs across the app.
 *
 * @param {boolean}  isOpen       - controls visibility
 * @param {string}   title        - modal heading
 * @param {string}   variant      - "info" | "danger" (default: "info")
 * @param {boolean}  loading      - disables buttons during async action
 * @param {function} onClose      - called on cancel / backdrop click / X button
 * @param {function} onConfirm    - called on confirm button click (optional)
 * @param {string}   confirmLabel - confirm button label (default: "Confirm")
 * @param {string}   cancelLabel  - cancel button label (default: "Cancel")
 * @param {node}     children     - modal body content
 */

const Modal = ({ isOpen, title, variant = "info", loading = false, onClose, onConfirm, confirmLabel = "Confirm", cancelLabel = "Cancel", children }) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={onClose}
        >
            {/* Modal panel — stop click propagating to backdrop */}
            <div
                className="relative w-full max-w-md bg-gray-900 rounded-lg p-6 shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <h2 id="modal-title" className="text-lg font-bold text-white">
                        {title}
                    </h2>
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close modal"
                        className="text-gray-400 hover:text-white focus:outline-none"
                    >
                        <X size={18} aria-hidden="true" />
                    </button>
                </div>

                {/* Body */}
                <div className="text-gray-300 text-sm mb-6">
                    {children}
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3">
                    <Button variant="ghost" onClick={onClose} disabled={loading}>
                        {cancelLabel}
                    </Button>
                    {onConfirm && (
                        <Button
                            variant={variant === "danger" ? "danger" : "primary"}
                            onClick={onConfirm}
                            loading={loading}
                        >
                            {confirmLabel}
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Modal;