import fetchFromAPI from "./ApiService";

export const UserService = {
    async fetchUserById(id: number): Promise<any> {
        return fetchFromAPI(`users/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`API call failed: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                if (data === null) {
                    throw new Error('No data returned from API');
                }
                return data;
            })
            .catch(error => {
                console.error(`Error fetching user with id ${id}:`, error);
            });
    }
}