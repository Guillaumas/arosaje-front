// services/ApiService.ts
const API_BASE_URL = "http://localhost:8080/api";

async function fetchFromAPI(endpoint: string, method: string = 'GET', body?: any): Promise<any> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const config: RequestInit = {
        method: method,
        headers: headers,
        body: method !== 'GET' && body ? JSON.stringify(body) : null,
    };

    const response = await fetch(`${API_BASE_URL}/${endpoint}`, config);
    if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`);
    }
    return response.json();
}

export default fetchFromAPI;
