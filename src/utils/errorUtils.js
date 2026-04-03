

import { BACKEND_ERROR_MAP, ERROR_MESSAGES } from "../constants/errorMessages";

// Resolves a user-facing error message from a backend error response.]
export const resolveErrorMessage = (errorData, fallback = ERROR_MESSAGES.NETWORK.UNEXPECTED) => {
    if (!errorData?.status_code) return fallback;
    return BACKEND_ERROR_MAP[errorData.status_code] ?? fallback;
};