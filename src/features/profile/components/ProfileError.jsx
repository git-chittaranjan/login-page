export function ProfileError({ message, onRetry }) {
    return (
        <div className="flex flex-col items-center justify-center py-16 gap-3 text-center px-6">
            <span className="text-4xl">⚠️</span>
            <p className="text-sm text-gray-500">{message}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="mt-2 text-sm font-medium text-blue-600 border border-blue-300 rounded-lg px-4 py-2 hover:bg-blue-50 transition-colors"
                >
                    Try again
                </button>
            )}
        </div>
    );
}