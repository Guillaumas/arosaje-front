import fetchFromAPI from './ApiService';
import {Species} from '../Interfaces/Species';

export const SpeciesService = {
    async getAllSpecies(): Promise<Species[]> {
        return fetchFromAPI('species');
    },
    async getSpecies(id: number): Promise<Species> {
        return fetchFromAPI(`species/${id}`);
    },
    async createSpecies(species: Species): Promise<Species> {
        return fetchFromAPI('species', 'POST', species);
    },
    async updateSpecies(species: Species): Promise<Species> {
        return fetchFromAPI(`species/${species.id}`, 'PUT', species);
    },
    async deleteSpecies(id: number): Promise<void> {
        return fetchFromAPI(`species/${id}`, 'DELETE');
    }
}