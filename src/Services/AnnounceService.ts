import { ANNOUNCES, generateSearchURL } from '../routes';
import { Announce, AnnounceSearchCriteria } from '../Interfaces/Announce';

const fetchAnnounces = (): Promise<Announce[]> => {
    return fetch(ANNOUNCES.URL)
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
            console.error('Error fetching announces:', error);
            return [];
        });
};

const fetchAnnounceById = (id: number): Promise<Announce> => {
    return fetch(`${ANNOUNCES.URL}/${id}`)
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
            console.error(`Error fetching announce with id ${id}:`, error);
            return null;
        });
};

const createAnnounce = (announceData: Announce): Promise<Announce> => {
    return fetch(ANNOUNCES.URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(announceData),
    })
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
            console.error('Error creating announce:', error);
            return null;
        });
};

const updateAnnounce = (id: number, announceData: Partial<Announce>): Promise<Announce> => {
    return fetch(`${ANNOUNCES.URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(announceData),
    })
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
            console.error(`Error updating announce with id ${id}:`, error);
            return null;
        });
};

const deleteAnnounce = (id: number): Promise<boolean> => {
    return fetch(`${ANNOUNCES.URL}/${id}`, {
        method: 'DELETE',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`API call failed: ${response.statusText}`);
            }
            return true;
        })
        .catch(error => {
            console.error(`Error deleting announce with id ${id}:`, error);
            return false;
        });
};

const searchAnnounces = (criteria: AnnounceSearchCriteria): Promise<Announce[]> => {
    const searchURL = generateSearchURL(criteria);
    return fetch(searchURL)
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
            console.error('Error searching announces:', error);
            return [];
        });
};

export const AnnounceService = {
    fetchAnnounces,
    fetchAnnounceById,
    createAnnounce,
    updateAnnounce,
    deleteAnnounce,
    searchAnnounces,
};