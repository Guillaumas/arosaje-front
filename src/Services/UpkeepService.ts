// services/UpkeepService.ts
import fetchFromAPI from './ApiService';
import { Upkeep } from '../Interfaces/Upkeep';

export const UpkeepService = {
    fetchUpkeeps(): Promise<Upkeep[]> {
        return fetchFromAPI('upkeeps');
    },
    fetchUpkeepById(id: number): Promise<Upkeep> {
        return fetchFromAPI(`upkeeps/${id}`);
    },
    createUpkeep(upkeep: Upkeep): Promise<Upkeep> {
        return fetchFromAPI('upkeeps', 'POST', upkeep);
    },
    updateUpkeep(upkeep: Upkeep): Promise<Upkeep> {
        return fetchFromAPI(`upkeeps/${upkeep.id}`, 'PUT', upkeep);
    },
    deleteUpkeep(id: number): Promise<void> {
        return fetchFromAPI(`upkeeps/${id}`, 'DELETE');
    }
};
