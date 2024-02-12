// AnnounceService.ts
import { ANNOUNCES, generateSearchURL } from '../routes';
import { Announce, AnnounceSearchCriteria } from '../Interfaces/Announce';

const fetchAnnounces = (): Promise<Announce[]> => {
    return fetch(ANNOUNCES.URL, {
        method: ANNOUNCES.METHOD.GET,
    }).then(response => response.json())
        .then(data => data._embedded.announces as Announce[]);
};

const fetchAnnounceById = (id: number): Promise<Announce> => {
    return fetch(ANNOUNCES.ID(id), {
        method: ANNOUNCES.METHOD.GET,
    }).then(response => response.json());
};

const createAnnounce = (announceData: Announce): Promise<Announce> => {
    return fetch(ANNOUNCES.URL, {
        method: ANNOUNCES.METHOD.POST,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(announceData),
    }).then(response => response.json());
};

const updateAnnounce = (id: number, announceData: Partial<Announce>): Promise<Announce> => {
    return fetch(ANNOUNCES.ID(id), {
        method: ANNOUNCES.METHOD.PUT,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(announceData),
    }).then(response => response.json());
};

const deleteAnnounce = (id: number): Promise<boolean> => {
    return fetch(ANNOUNCES.ID(id), {
        method: ANNOUNCES.METHOD.DELETE,
    }).then(response => response.ok);
};

const searchAnnounces = (criteria: AnnounceSearchCriteria): Promise<Announce[]> => {
    // Implement based on criteria; example for title search
    if (criteria.title) {
        return fetch(ANNOUNCES.SEARCH.findByTitle(criteria.title))
            .then(response => response.json())
            .then(data => data._embedded.announces as Announce[]);
    }
    // Implement other criteria searches similarly
    throw new Error("Search criteria not implemented.");
};

export const AnnounceService = {
    fetchAnnounces,
    fetchAnnounceById,
    createAnnounce,
    updateAnnounce,
    deleteAnnounce,
    searchAnnounces,
};
