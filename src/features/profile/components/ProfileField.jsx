export function ProfileField({ label, value }) {
    return (
        <div className="flex flex-col gap-1 py-4 px-6 border-b border-gray-100 last:border-b-0">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                {label}
            </span>
            <span className="text-sm text-gray-800">{value || "—"}</span>
        </div>
    );
}