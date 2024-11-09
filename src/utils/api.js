export async function fetchLogs(token) {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/logs`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
}
