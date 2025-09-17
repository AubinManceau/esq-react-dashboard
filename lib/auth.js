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

