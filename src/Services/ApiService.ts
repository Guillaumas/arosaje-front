const API_BASE_URL = "http://localhost:8080/api";

async function fetchFromAPI(endpoint: string, method: string = 'GET', body?: any): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`);
    }

    const data = await response.json();

    if (data === null || data === undefined) {
        throw new Error('No data returned from API');
    }

    return data;
}

export default fetchFromAPI;