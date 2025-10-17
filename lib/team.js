import { fetchData } from "./api";

export async function getTeams() {
    try {
        const res = await fetchData("/teams", {
            method: "GET",
        });
        return res.data || null;
    } catch {
        return null;
    }
}

export async function deleteTeam(teamId) {
    try {
        const res = await fetchData(`/teams/${teamId}`, {
            method: "DELETE",
        });
        return res || null;
    } catch {
        return null;
    }
}

export async function createTeam(teamData) {
    try {
        const res = await fetchData("/teams/create", {
            method: "POST",
            body: JSON.stringify(teamData),
        });
        return res || null;
    } catch {
        return null;
    }
}

export async function updateTeam(teamId, teamData) {
    try {
        const res = await fetchData(`/teams/${teamId}`, {
            method: "PATCH",
            body: JSON.stringify(teamData),
        });
        return res || null;
    } catch {
        return null;
    }
}
