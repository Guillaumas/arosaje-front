import fetchFromAPI from './ApiService';
import { Upkeep } from '../Interfaces/Upkeep';

export const UpkeepService = {
    fetchUpkeeps(): Promise<Upkeep[]> {
        return fetchFromAPI('upkeeps')
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
                console.error('Error fetching upkeeps:', error);
                return [];
            });
    },
    createUpkeep(upkeepData: Upkeep): Promise<Upkeep> {
        return fetchFromAPI('upkeeps', 'POST', upkeepData)
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
                console.error('Error creating upkeep:', error);
                return null;
            });
    },
    updateUpkeep(upkeepData: Upkeep): Promise<Upkeep> {
        return fetchFromAPI(`upkeeps/${upkeepData.id}`, 'PUT', upkeepData)
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
                console.error('Error updating upkeep:', error);
                return null;
            });
    },
    deleteUpkeep(id: number): Promise<void> {
        return fetchFromAPI(`upkeeps/${id}`, 'DELETE')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`API call failed: ${response.statusText}`);
                }
            })
            .catch(error => {
                console.error('Error deleting upkeep:', error);
            });
    },
};