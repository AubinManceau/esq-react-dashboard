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

