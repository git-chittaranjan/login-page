
import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { setAccessToken, clearAccessToken, isTokenExpired } from "../utils/tokenUtils";

const AuthContext = createContext(null);

// children is whatever JSX you put between the opening and closing <AuthProvider> tags
export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);



    const login = useCallback((authData) => {
        const { access_token, expires_at, user_id, email, name } = authData;
        setAccessToken(access_token, expires_at);
        setUser({ user_id, email, name });
        setIsAuthenticated(true);
        setIsLoggingOut(false);
    }, []);



    const logout = useCallback(() => {
        clearAccessToken();
        setUser(null);
        setIsAuthenticated(false);
        setIsLoggingOut(true);
    }, []);



    const checkAuth = useCallback(() => {
        if (isTokenExpired()) {
            logout();
            return false;
        }
        return true;
    }, [logout]);



    // When a backgrounded tab regains focus, silently check the token. This code listens for a custom event called token:expired 
    // on the browser window, and when that event fires, it logs the user out if they are currently logged in.
    useEffect(() => {
        const handleTokenExpired = () => {
            if (isAuthenticated) {
                logout();
            }
        };

        window.addEventListener("token:expired", handleTokenExpired);

        // This is the cleanup function. When the component unmounts or before the effect re-runs, it removes the event listener
        return () => window.removeEventListener("token:expired", handleTokenExpired);
    }, [isAuthenticated, logout]);



    // This code syncs logout across multiple browser tabs. If the user logs out in one tab, all other open tabs automatically log out too.
    useEffect(() => {
        let channel;
        try {
            channel = new BroadcastChannel("auth_session");
            channel.addEventListener("message", (e) => {
                if (e.data?.type === "LOGOUT") {
                    logout();
                }
            });
        } catch {
            // BroadcastChannel not supported by browser — degrade gracefully
        }
        return () => channel?.close();
    }, []);



    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            login,
            logout,
            checkAuth,
            isLoggingOut,
            setIsLoggingOut
        }}>
            {children}
        </AuthContext.Provider>
    );
}



// ── Consumer hook for clean consumption
export function useAuth() {

    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}