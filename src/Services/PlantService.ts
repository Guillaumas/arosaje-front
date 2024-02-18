import fetchFromAPI from './ApiService';
import { Plant } from '../Interfaces/Plant';

export const PlantService = {
    fetchPlants(): Promise<Plant[]> {
        return fetchFromAPI('plants')
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
                console.error('Error fetching plants:', error);
                return [];
            });
    },
    createPlant(plantData: Plant): Promise<Plant> {
        return fetchFromAPI('plants', 'POST', plantData)
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
                console.error('Error creating plant:', error);
                return null;
            });
    },
    updatePlant(plantData: Plant): Promise<Plant> {
        return fetchFromAPI(`plants/${plantData.id}`, 'PUT', plantData)
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
                console.error('Error updating plant:', error);
                return null;
            });
    },
    deletePlant(id: number): Promise<void> {
        return fetchFromAPI(`plants/${id}`, 'DELETE')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`API call failed: ${response.statusText}`);
                }
            })
            .catch(error => {
                console.error('Error deleting plant:', error);
            });
    },
    fetchPlantByUserId(userId: number): Promise<Plant[]> {
        return fetchFromAPI(`plants/search/findByOwnerId?ownerId=${userId}`)
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
                console.error('Error fetching plants:', error);
                return [];
            });
    }
};