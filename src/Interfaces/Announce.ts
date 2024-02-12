// Announce.ts
export interface Announce {
    id: number;
    announcer_id: number;
    plant_id: number;
    title: string;
    body: string;
    start_date: string;
    end_date: string;
    created_at: string;
    updated_at: string;
    image: string;
}

export interface AnnounceSearchCriteria {
    startDate?: string;
    title?: string;
    announcerId?: number;
    plantId?: number;
    endDate?: string;
}
