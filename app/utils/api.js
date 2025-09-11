const API_BASE_URL = "http://localhost:3000/api/v1";

export async function fetchData(endpoint, options = {}) {
  try {
    console.log(`${API_BASE_URL}${endpoint}`);
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
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