
const criteria = [
    (p) => p.length >= 8,
    (p) => /[A-Z]/.test(p),
    (p) => /[a-z]/.test(p),
    (p) => /\d/.test(p),
    (p) => /[@$!%*?&#^()_\-+=]/.test(p),
];

const getStrength = (password) => {
    if (!password) return 0;
    return criteria.filter((test) => test(password)).length;
};

const getColor = (strength) => {
    switch (strength) {
        case 1: return "bg-red-600";
        case 2: return "bg-orange-500";
        case 3: return "bg-yellow-400";
        case 4: return "bg-emerald-500";
        case 5: return "bg-emerald-400";
        default: return "bg-gray-700";
    }
};

const PasswordStrengthMeter = ({ password }) => {
    if (!password) return null;

    const strength = getStrength(password);
    const pct = (strength / criteria.length) * 100;

    return (
        <div className="mt-1 mb-3">
            <div className="h-1 w-full rounded-full bg-gray-700 overflow-hidden">
                <div
                    className={`h-full rounded-full transition-all duration-500 ${getColor(strength)}`}
                    style={{ width: `${pct}%` }}
                />
            </div>
        </div>
    );
};

export default PasswordStrengthMeter;