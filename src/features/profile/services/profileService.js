import API_ENDPOINTS from "../../../constants/apiEndpoints";
import httpClient from "../../../services/httpClient";

export async function fetchUserProfile(userId) {

    const envelope = await httpClient.get(API_ENDPOINTS.USERS.GET_USER_BY_ID(userId), {
        requiresAuth: true,
    });

    const data = envelope.data;

    return {
        userId: data.user_id,
        name: data.name,
        gender: data.gender === 1 ? "Male" : data.gender === 2 ? "Female" : "Other",
        email: data.email,
        isEmailVerified: data.is_email_verified,
        isActive: data.is_active,
        createdAt: data.created_at ? new Date(data.created_at) : null,
        updatedAt: data.updated_at ? new Date(data.updated_at) : null,
    };
}