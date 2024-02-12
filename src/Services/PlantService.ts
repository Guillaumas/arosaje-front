import fetchFromAPI from './ApiService';
import { Plant } from '../Interfaces/Plant';

export const PlantService = {
    fetchPlants(): Promise<Plant[]> {
        return fetchFromAPI('plants');
    },
    createPlant(plantData: Plant): Promise<Plant> {
        return fetchFromAPI('plants', 'POST', plantData);
    },
    updatePlant(plantData: Plant): Promise<Plant> {
        return fetchFromAPI(`plants/${plantData.id}`, 'PUT', plantData);
    },
    deletePlant(id: number): Promise<void> {
        return fetchFromAPI(`plants/${id}`, 'DELETE');
    }
};
