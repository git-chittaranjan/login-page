export function formatDate(date) {
    if (!date) return "—";
    return date.toLocaleString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
}

export function getInitials(name) {
    if (!name) return "?";
    return name
        .trim()
        .split(" ")
        .slice(0, 2)
        .map((word) => word[0].toUpperCase())
        .join("");
}