import fetchFromAPI from './ApiService';
import { Media } from '../Interfaces/Media';

export const MediaService = {
    fetchMedias(): Promise<Media[]> {
        return fetchFromAPI('medias');
    },
    createMedia(mediaData: FormData): Promise<Media> { // Assuming media upload involves FormData for file handling
        return fetchFromAPI('medias', 'POST', mediaData);
    },
    updateMedia(mediaData: Media): Promise<Media> {
        return fetchFromAPI(`medias/${mediaData.id}`, 'PUT', mediaData);
    },
    deleteMedia(id: number): Promise<void> {
        return fetchFromAPI(`medias/${id}`, 'DELETE');
    }
};
