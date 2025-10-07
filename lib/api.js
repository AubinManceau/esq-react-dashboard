const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchData(endpoint, options = {}) {
  try {
    const headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "x-client-type": "web",
      ...options.headers,
    };

    const url = `${API_BASE_URL}${endpoint}`;

    const res = await fetch(url, {
      ...options,
      headers,
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(`Erreur HTTP! Statut: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    return null;
  }
}
