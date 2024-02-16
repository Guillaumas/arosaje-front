import fetchFromAPI from './ApiService';
import {Species} from '../Interfaces/Species';

export const SpeciesService = {
    fetchSpecies(): Promise<Species[]> {
        return fetchFromAPI('species')
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
                console.error('Error fetching species:', error);
                return [];
            });
    },
    createSpecies(speciesData: Species): Promise<Species> {
        return fetchFromAPI('species', 'POST', speciesData)
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
                console.error('Error creating species:', error);
                return null;
            });
    },
    updateSpecies(speciesData: Species): Promise<Species> {
        return fetchFromAPI(`species/${speciesData.id}`, 'PUT', speciesData)
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
                console.error('Error updating species:', error);
                return null;
            });
    },
    deleteSpecies(id: number): Promise<void> {
        return fetchFromAPI(`species/${id}`, 'DELETE')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`API call failed: ${response.statusText}`);
                }
            })
            .catch(error => {
                console.error('Error deleting species:', error);
            });
    }
}