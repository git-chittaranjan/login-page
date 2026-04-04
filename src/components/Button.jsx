
/* 
 * @param {string}   variant   - "primary" | "secondary" | "danger" | "ghost" (default: "primary")
 * @param {string}   type      - "button" | "submit" | "reset" (default: "button")
 * @param {boolean}  loading   - shows spinner and disables button during API calls (default: false)
 * @param {boolean}  disabled  - explicitly disables button (default: false)
 * @param {string}   className - additional Tailwind classes for customization (e.g. "w-full mt-2")
 * @param {function} onClick   - click handler function
 * @param {ReactNode} children - content inside <Button>...</Button> becomes {children} property
 */


import { Loader2 } from "lucide-react";

const VARIANTS = {
    primary: "bg-emerald-700 hover:bg-emerald-600 text-white",
    secondary: "bg-gray-700 hover:bg-gray-600 text-white",
    danger: "bg-red-700 hover:bg-red-600 text-white",
    ghost: "bg-transparent hover:bg-gray-800 text-gray-300 border border-gray-600",
};

const Button = ({ variant = "primary", type = "button", loading = false, disabled = false, className = "", onClick, children }) => (
    <button
        type={type}
        onClick={onClick}
        disabled={disabled || loading}
        aria-busy={loading}
        className={`inline-flex items-center justify-center gap-2 px-4 py-2 rounded font-bold text-sm transition-colors duration-150
                    focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed
                    ${VARIANTS[variant] ?? VARIANTS.primary} ${className}`}
    >
        {loading && <Loader2 size={16} className="animate-spin" aria-hidden="true" />}
        {children}
    </button>
);

export default Button;