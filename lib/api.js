const API_BASE_URL = "http://localhost:3000/api/v1";

export async function fetchData(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "x-client-type": "web",
      },
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(`Erreur HTTP! Statut: ${res.status}`);
    }

    return res.json();
  } catch (error) {
    return null;
  }
}