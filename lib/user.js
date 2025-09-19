import { fetchData } from "./api";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getUsers(filter = {}) {
  try {
    const params = new URLSearchParams();

    if (filter.roles && filter.roles.length > 0) {
      filter.roles.forEach(role => params.append("_role", role));
    }

    if (filter.categories && filter.categories.length > 0) {
      filter.categories.forEach(cat => params.append("_category", cat));
    }

    const query = params.toString() ? `?${params.toString()}` : "";

    const data = await fetchData(`/users${query}`, { method: "GET" });

    return data;

  } catch (error) {
    console.error("Erreur dans getUsers:", error);
    return null;
  }
}

export async function getUserById(id) {
  try {
    const res = await fetchData(`/users/${id}`, { method: "GET" });
    return res;
  } catch (error) {
    console.error("Erreur dans getUserById:", error);
    return null;
  }
}

export async function deleteUser(id) {
  try {
    const res = await fetchData(`/users/${id}`, { method: "DELETE" });
    return res;
  } catch (error) {
    console.error("Erreur dans deleteUser:", error);
    return null;
  }
}

export async function updateUserByAdmin(id, userData) {
  try {
    const res = await fetch(`${API_BASE_URL}/users/admin/${id}`, {
      method: "PATCH",
      body: userData,
      credentials: "include",
      headers: {
        "Accept": "application/json",
        "x-client-type": "web",
      },
    });
    return res.json();
  } catch (error) {
    console.error("Erreur dans updateUserByAdmin:", error);
    return null;
  }
}
