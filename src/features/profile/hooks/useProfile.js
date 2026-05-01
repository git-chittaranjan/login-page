import { useState, useEffect } from "react";
import { fetchUserProfile } from "../services/profileService";

export function useProfile(userId) {

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function loadProfile() {

        if (!userId) return;

        setLoading(true);
        setError(null);

        try {
            const data = await fetchUserProfile(userId);
            setProfile(data);

        } catch (err) {
            setError(err.message);

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadProfile();
    }, [userId]);

    return { profile, loading, error, refetch: loadProfile };
}