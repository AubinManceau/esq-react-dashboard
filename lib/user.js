import { fetchData } from "./api";

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
    const res = await fetchData(`/users/admin/${id}`, {
      method: "PATCH",
      body: JSON.stringify(userData),
    });
    return res;
  } catch (error) {
    console.error("Erreur dans updateUserByAdmin:", error);
    return null;
  }
}
