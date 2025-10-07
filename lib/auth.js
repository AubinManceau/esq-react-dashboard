import { fetchData } from "./api";

export async function login(email, password) {
    try {
        const res = await fetchData("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: email, password: password }),
        });

        return await res;
    } catch (error) {
        return null;
    }
}

export async function signup(userData) {
    try {
        const res = await fetchData("/auth/signup", {
        method: "POST",
        body: JSON.stringify(userData),
        });

        return await res;
    } catch (error) {
        return null;
    }
}

export async function bulkSignup(users) {
    try {
        const res = await fetchData("/auth/bulk-signup", {
        method: "POST",
        body: JSON.stringify({ users }),
        });

        return await res;
    } catch (error) {
        return null;
    }
}

export async function logout() {
    try {
        const res = await fetchData("/auth/logout", {
        method: "POST",
        });

        return await res;
    } catch (error) {
        return null;
    }
}

export async function getUserInformations() {
    try {
        const res = await fetchData("/auth/profile", {
            method: "GET",
        });
        return res.data || null;
    } catch {
        return null;
    }
}

export async function resendConfirmationEmail(id) {
    try {
        const res = await fetchData(`/auth/resend-confirmation/${id}`, {
            method: "POST",
        });

        return await res;
    } catch (error) {
        return null;
    }
}
