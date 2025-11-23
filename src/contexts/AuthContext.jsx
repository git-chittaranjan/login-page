import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Create AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);               // Logged-in user info
    const [accessToken, setAccessToken] = useState(null); // JWT access token

    // Call this after successful login or OTP verification
    const login = (newUser, token) => {
        setUser(newUser);
        setAccessToken(token);
    };

    // Logout: clear auth state and tell backend to clear refresh token
    const logout = async () => {
        await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
        setUser(null);
        setAccessToken(null);
    };

    // Refresh the access token by calling backend. Backend should read refresh cookie.
    const refreshToken = useCallback(async () => {
        try {
            const res = await fetch('/api/auth/refresh', { method: 'POST', credentials: 'include' });
            if (res.ok) {
                const data = await res.json();
                setAccessToken(data.accessToken);
            } else {
                // Refresh failed (e.g. cookie expired) – force logout
                logout();
            }
        } catch {
            logout();
        }
    }, []);

    // Auto-refresh: schedule a refresh shortly before token expiry
    useEffect(() => {
        if (!accessToken) return;
        const payload = JSON.parse(atob(accessToken.split('.')[1] || ''));
        const expiresAt = payload.exp * 1000; // JWT exp is in seconds
        const timeout = expiresAt - Date.now() - 60 * 1000; // refresh 1 min before expiry
        if (timeout > 0) {
            const timer = setTimeout(refreshToken, timeout);
            return () => clearTimeout(timer);
        }
    }, [accessToken, refreshToken]);

    const value = { user, accessToken, login, logout, refreshToken };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
