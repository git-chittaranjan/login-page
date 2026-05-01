import { useEffect, useState } from "react";

const styles = `
    @keyframes toast-shrink {
        from { width: 100%; }
        to   { width: 0%; }
    }
    .toast-progress {
        animation: toast-shrink linear forwards;
    }
`;

const VARIANTS = {
    success: { container: "border-emerald-500", icon: "✓", iconBg: "bg-emerald-50 text-emerald-600", title: "text-emerald-700" },
    error: { container: "border-red-500", icon: "✕", iconBg: "bg-red-50 text-red-600", title: "text-red-700" },
    info: { container: "border-blue-500", icon: "i", iconBg: "bg-blue-50 text-blue-600", title: "text-blue-700" },
};

const PROGRESS_COLOR = { success: "bg-emerald-400", error: "bg-red-400", info: "bg-blue-400" };
const TYPE_LABEL = { success: "Success", error: "Error", info: "Info" };

export default function ToastNotification({ message, type = "success", duration = 3000, visible, onDismiss }) {
    const [show, setShow] = useState(false);
    const [exiting, setExiting] = useState(false);

    useEffect(() => {
        if (!visible) return;
        setShow(true);
        setExiting(false);

        const exitTimer = setTimeout(() => setExiting(true), duration - 400);
        const hideTimer = setTimeout(() => { setShow(false); onDismiss?.(); }, duration);

        return () => { clearTimeout(exitTimer); clearTimeout(hideTimer); };
    }, [visible, duration, onDismiss]);

    if (!show) return null;

    const v = VARIANTS[type];

    return (
        <>
            <style>{styles}</style>
            <div
                role="status"
                aria-live="polite"
                aria-atomic="true"
                className={`fixed top-5 right-5 z-50 flex items-start gap-3 px-4 py-3 rounded-lg shadow-lg min-w-[300px] max-w-sm bg-white border-l-4 ${v.container} transition-all duration-300 ease-in-out ${exiting ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"}`}
            >
                <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${v.iconBg}`} aria-hidden="true">
                    {v.icon}
                </span>

                <div className="flex-1 min-w-0">
                    <p className={`text-sm font-semibold ${v.title}`}>{TYPE_LABEL[type]}</p>
                    <p className="text-sm text-gray-600 mt-0.5">{message}</p>
                </div>

                <div
                    className={`absolute bottom-0 left-0 h-0.5 rounded-b-lg toast-progress ${PROGRESS_COLOR[type]}`}
                    style={{ animationDuration: `${duration}ms` }}
                />
            </div>
        </>
    );
}