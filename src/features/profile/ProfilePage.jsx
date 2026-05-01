import { useAuth } from '../../contexts/AuthContext';
import { useProfile } from "./hooks/useProfile";
import { ProfileSkeleton } from "./components/ProfileSkeleton";
import { ProfileError } from "./components/ProfileError";
import { formatDate, getInitials } from "./utils/formatters";
import DashboardNavbar from '../../components/post-auth-navbar';
import Footer from "../../components/footer";

export default function ProfilePage() {

    const { user } = useAuth();
    const { profile, loading, error, refetch } = useProfile(user?.user_id);

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden">

            <DashboardNavbar />

            <div className="relative min-h-screen mx-auto max-w-6xl px-4 pt-28 pb-16 sm:px-6 lg:px-8">

                {/* Top Header */}
                <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                    <div>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
                            User Dashboard
                        </p>

                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
                            Profile Overview
                        </h1>

                        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                            Manage your account information and review your profile details securely.
                        </p>
                    </div>

                    {!loading && !error && profile && (
                        <div className="flex items-center gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">

                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-600 text-xl font-bold text-white shadow-lg shadow-cyan-500/20">
                                {getInitials(profile.name)}
                            </div>

                            <div className="min-w-0">
                                <h2 className="truncate text-lg font-semibold text-white">
                                    {profile.name}
                                </h2>

                                <p className="truncate text-sm text-slate-400">
                                    {profile.email}
                                </p>

                                <div className="mt-2 flex flex-wrap gap-2">

                                    {profile.isActive && (
                                        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                                            <span className="h-2 w-2 rounded-full bg-emerald-400" />
                                            Active
                                        </span>
                                    )}

                                    {profile.isEmailVerified && (
                                        <span className="rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
                                            Verified
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Main Card */}
                <div className="overflow-hidden rounded-4xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-2xl">

                    {/* Top Action Bar */}
                    <div className="flex items-center justify-between border-b border-white/10 px-6 py-5 sm:px-8">

                        <div>
                            <h2 className="text-xl font-semibold text-white">
                                Account Details
                            </h2>

                            <p className="mt-1 text-sm text-slate-400">
                                Personal information associated with your account.
                            </p>
                        </div>

                        <button
                            onClick={refetch}
                            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-300 transition-all duration-200 hover:border-cyan-400/30 hover:bg-cyan-500/10 hover:text-cyan-300"
                        >
                            <svg
                                className="h-4 w-4"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                                    clipRule="evenodd"
                                />
                            </svg>

                            Refresh
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-8">

                        {loading && <ProfileSkeleton />}

                        {error && (
                            <ProfileError
                                message={error}
                                onRetry={refetch}
                            />
                        )}

                        {!loading && !error && profile && (

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                                {[
                                    { label: "Full Name", value: profile.name },
                                    { label: "Gender", value: profile.gender },
                                    { label: "Email Address", value: profile.email },
                                    { label: "Email Verified", value: profile.isEmailVerified ? "Yes" : "No" },
                                    { label: "Account Created", value: formatDate(profile.createdAt) },
                                    { label: "Last Modified", value: formatDate(profile.updatedAt) },
                                    { label: "User ID", value: profile.userId },
                                ].map(({ label, value }) => (

                                    <div
                                        key={label}
                                        className="group rounded-2xl border border-white/10 bg-black/30 p-5 transition-all duration-300 hover:border-cyan-400/20 hover:bg-cyan-500/5"
                                    >
                                        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                                            {label}
                                        </p>

                                        <p className="wrap-break-word text-sm font-medium text-white sm:text-base">
                                            {value || "—"}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}