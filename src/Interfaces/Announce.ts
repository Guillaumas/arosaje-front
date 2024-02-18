export interface Announce {
    id: number;
    announcerId: number;
    plantId: number;
    title: string;
    body: string;
    startDate: string;
    endDate: string;
    createdAt: string;
    updatedAt: string;
    image: string;
}

export interface AnnounceSearchCriteria {
    startDate?: string;
    title?: string;
    announcerId?: number;
    plantId?: number;
    endDate?: string;
}
