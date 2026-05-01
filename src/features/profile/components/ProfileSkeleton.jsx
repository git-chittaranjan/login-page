export function ProfileSkeleton() {
    return (
        <div className="animate-pulse p-6 space-y-6">
            {/* Avatar + name */}
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gray-200" />
                <div className="space-y-2 flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/3" />
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                </div>
            </div>

            {/* Fields */}
            {[...Array(5)].map((_, i) => (
                <div key={i} className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-1/4" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
            ))}
        </div>
    );
}