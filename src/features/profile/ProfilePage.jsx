import { useAuth } from '../../contexts/AuthContext';
import { useProfile } from "./hooks/useProfile";
import { ProfileField } from "./components/ProfileField";
import { ProfileSkeleton } from "./components/ProfileSkeleton";
import { ProfileError } from "./components/ProfileError";
import { formatDate, getInitials } from "./utils/formatters";
import DashboardNavbar from '../../components/post-auth-navbar';
import Footer from "../../components/footer";


export default function ProfilePage() {

    const { user } = useAuth();
    const { profile, loading, error, refetch } = useProfile(user?.user_id);

    return (
        <div>
            <DashboardNavbar />

            <div className="min-h-screen bg-gray-50 flex items-start justify-center px-4 py-12">
                <p>Hello</p>
                <div className="w-full max-w-lg">

                    {/* Page title */}
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>

                    {/* Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">

                        {loading && <ProfileSkeleton />}

                        {error && (
                            <ProfileError message={error} onRetry={refetch} />
                        )}

                        {!loading && !error && profile && (
                            <>
                                {/* Header */}
                                <div className="flex items-center gap-4 px-6 py-6 border-b border-gray-100">
                                    {/* Avatar */}
                                    <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                                        <span className="text-white text-xl font-semibold">
                                            {getInitials(profile.name)}
                                        </span>
                                    </div>

                                    {/* Name + status */}
                                    <div className="flex-1 min-w-0">
                                        <h2 className="text-lg font-semibold text-gray-900 truncate">
                                            {profile.name}
                                        </h2>
                                        <p className="text-sm text-gray-500 truncate">{profile.email}</p>
                                        <div className="flex items-center gap-2 mt-1.5">
                                            {profile.isActive && (
                                                <span className="inline-flex items-center gap-1 text-xs font-medium text-green-700 bg-green-50 border border-green-200 rounded-full px-2.5 py-0.5">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                                    Active
                                                </span>
                                            )}
                                            {profile.isEmailVerified && (
                                                <span className="text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-full px-2.5 py-0.5">
                                                    Email Verified
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Refresh button */}
                                    <button
                                        onClick={refetch}
                                        className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-2 transition-colors"
                                        title="Refresh"
                                    >
                                        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Fields */}
                                <ProfileField label="Full Name" value={profile.name} />
                                <ProfileField label="Gender" value={profile.gender} />
                                <ProfileField label="Email" value={profile.email} />
                                <ProfileField
                                    label="Email Verified"
                                    value={profile.isEmailVerified ? "Yes" : "No"}
                                />
                                <ProfileField label="Account Created" value={formatDate(profile.createdAt)} />
                                <ProfileField label="Last Modified" value={formatDate(profile.updatedAt)} />

                                {/* Footer */}
                                <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
                                    <p className="text-xs text-gray-400 font-mono truncate">
                                        ID: {profile.userId}
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}