
/*
 * @param {string} size    - "sm" | "md" | "lg" (default: "md")
 * @param {string} variant - "primary" | "white" | "muted" (default: "primary")
 * @param {string} label   - screen reader text (default: "Loading...")
 * @param {string} className - additional Tailwind classes
 */


const SIZES = {
    sm: "w-4 h-4 border-2",
    md: "w-7 h-7 border-2",
    lg: "w-12 h-12 border-4",
};

const VARIANTS = {
    primary: "border-emerald-700 border-t-transparent",
    white: "border-white border-t-transparent",
    muted: "border-gray-500 border-t-transparent",
};

const Spinner = ({ size = "md", variant = "primary", label = "Loading...", className = "" }) => {
    return (
        <div
            role="status"
            aria-label={label}
            className={`inline-flex items-center justify-center ${className}`}
        >
            <div
                aria-hidden="true"
                className={`rounded-full animate-spin ${SIZES[size] ?? SIZES.md} ${VARIANTS[variant] ?? VARIANTS.primary}`}
            />
            <span className="sr-only">{label}</span>
        </div>
    );
};

export default Spinner;