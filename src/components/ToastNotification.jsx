import { useEffect, useState } from "react";

/**
 * ToastNotification
 * @param {string}  props.message     - Text to display
 * @param {"success"|"error"|"info"} props.type - Visual variant
 * @param {number}  props.duration    - Auto-dismiss in ms (default 3000)
 * @param {boolean} props.visible     - Controlled visibility
 * @param {()=>void} props.onDismiss  - Called after auto-dismiss or manual close
 */
export default function ToastNotification({
    message,
    type = "success",
    duration = 3000,
    visible,
    onDismiss,
}) {
    const [show, setShow] = useState(false);
    const [exiting, setExiting] = useState(false);

    useEffect(() => {
        if (!visible) return;

        setShow(true);
        setExiting(false);

        const dismissTimer = setTimeout(() => {
            setExiting(true);
        }, duration - 400); // start exit animation 400ms before done

        const hideTimer = setTimeout(() => {
            setShow(false);
            onDismiss?.();
        }, duration);

        return () => {
            clearTimeout(dismissTimer);
            clearTimeout(hideTimer);
        };
    }, [visible, duration, onDismiss]);

    if (!show) return null;

    const variants = {
        success: {
            container: "bg-white border-l-4 border-emerald-500",
            icon: "✓",
            iconBg: "bg-emerald-50 text-emerald-600",
            title: "text-emerald-700",
        },
        error: {
            container: "bg-white border-l-4 border-red-500",
            icon: "✕",
            iconBg: "bg-red-50 text-red-600",
            title: "text-red-700",
        },
        info: {
            container: "bg-white border-l-4 border-blue-500",
            icon: "i",
            iconBg: "bg-blue-50 text-blue-600",
            title: "text-blue-700",
        },
    };

    const v = variants[type];

    return (
        <div
            role="status"
            aria-live="polite"
            aria-atomic="true"
            className={`
        fixed top-5 right-5 z-50
        flex items-start gap-3 px-4 py-3
        rounded-lg shadow-lg min-w-[300px] max-w-sm
        ${v.container}
        transition-all duration-300 ease-in-out
        ${exiting ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"}
      `}
        >
            {/* Icon */}
            <span
                className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${v.iconBg}`}
                aria-hidden="true"
            >
                {v.icon}
            </span>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold ${v.title}`}>
                    {type === "success" ? "Success" : type === "error" ? "Error" : "Info"}
                </p>
                <p className="text-sm text-gray-600 mt-0.5">{message}</p>
            </div>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 h-0.5 bg-emerald-400 rounded-b-lg toast-progress"
                style={{ animationDuration: `${duration}ms` }}
            />
        </div>
    );
}