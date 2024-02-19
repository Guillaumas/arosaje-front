import fetchFromAPI from "./ApiService";

export const UserService = {
    async fetchUserById(id: number): Promise<any> {
        return fetchFromAPI(`user/${id}`)
            .then(data => {
                if (data === null) {
                    throw new Error('No data returned from API');
                }
                return data;
            })
            .catch(error => {
                console.error(`Error fetching user with id ${id}:`, error);
                return null;
            });
    }
}