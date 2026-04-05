
/* 
* This module serves as a centralized HTTP client—a reusable wrapper over the native fetch API. 
* All API interactions are routed through this client instead of calling fetch directly
* Ensuring consistent handling of headers, authentication, timeouts, and error management in a single place.
*/



import { CONFIG } from "../config/env";
import { getAccessToken, isTokenExpired, clearAccessToken } from "../utils/tokenUtils";



function buildHeaders(requiresAuth = false) {
    const headers = { "Content-Type": "application/json" };

    if (CONFIG.API_KEY) {
        headers["x-api-key"] = CONFIG.API_KEY;
    }

    if (requiresAuth) {
        const token = getAccessToken();

        if (!token || isTokenExpired()) {

            clearAccessToken(); // Ensure state is clean

            throw {
                success: false,
                status_code: "TOKEN_EXPIRED",
                description: "Session expired. Please login again.",
            };
        }

        headers["Authorization"] = `Bearer ${token}`;
    }

    return headers;
}



async function parseResponse(response) {

    const contentType = response.headers.get("Content-Type") ?? "";

    if (!contentType.includes("application/json")) {
        throw {
            success: false,
            status_code: "INVALID_RESPONSE",
            description: "Server returned a non-JSON response.",
        };
    }

    return response.json();
}



async function request(endpoint, options = {}) {

    // Destructures the options parameter (if not passed, default will be {} empty object and default values will be assigned e.g. method = "GET", body = null, etc.)
    const {
        method = "GET",
        body = null,
        requiresAuth = false,
        timeoutMs = CONFIG.REQUEST_TIMEOUT_MS,
    } = options;

    // Build headers BEFORE starting the timer to ensure token expiry is checked immediately and not after the timeout duration.
    const headers = buildHeaders(requiresAuth);

    // Creates a controller object used to abort a HTTP request
    const controller = new AbortController();

    // Starts a timer, After timeoutMs milliseconds: Calls controller.abort() Cancels the request
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
        const response = await fetch(`${CONFIG.API_BASE_URL}${endpoint}`, {
            method,
            headers,
            body: body ? JSON.stringify(body) : null,
            signal: controller.signal,
        });

        clearTimeout(timeoutId);


        // Check status BEFORE parsing, because 401 will not have JSON response body
        if (response.status === 401) {

            clearAccessToken();

            throw {
                success: false,
                status_code: "UNAUTHORIZED",
                description: "Session expired. Please login again.",
            };
        }

        const data = await parseResponse(response);

        // Non-2xx HTTP status OR business-level failure from envelope
        if (!response.ok || !data.success) {
            throw data;
        }

        return data;

    } catch (error) {

        clearTimeout(timeoutId);

        if (error.name === "AbortError") {
            throw {
                success: false,
                status_code: "REQUEST_TIMEOUT",
                description: "The request timed out. Please try again.",
            };
        }

        if (error instanceof TypeError) {
            throw {
                success: false,
                status_code: "NETWORK_ERROR",
                description: "Unable to reach the server.",
            };
        }

        throw error;
    }
}



//Just a thin convenience layer so callers write httpClient.post(...) instead of request(endpoint, { method: 'POST', body }). Clean and readable
const httpClient = {
    get: (endpoint, options = {}) => request(endpoint, { ...options, method: "GET" }),
    post: (endpoint, body, options = {}) => request(endpoint, { ...options, method: "POST", body }),
    put: (endpoint, body, options = {}) => request(endpoint, { ...options, method: "PUT", body }),
    patch: (endpoint, body, options = {}) => request(endpoint, { ...options, method: "PATCH", body }),
    delete: (endpoint, options = {}) => request(endpoint, { ...options, method: "DELETE" }),
};

export default httpClient;