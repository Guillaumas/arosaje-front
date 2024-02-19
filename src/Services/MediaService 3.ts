import fetchFromAPI from './ApiService';
import { Media } from '../Interfaces/Media';

export const MediaService = {
    fetchMedias(): Promise<Media[]> {
        return fetchFromAPI('medias')
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
                console.error('Error fetching medias:', error);
                return [];
            });
    },
    createMedia(mediaData: Media): Promise<Media> {
        return fetchFromAPI('medias', 'POST', mediaData)
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
                console.error('Error creating media:', error);
                return null;
            });
    },
    updateMedia(mediaData: Media): Promise<Media> {
        return fetchFromAPI(`medias/${mediaData.id}`, 'PUT', mediaData)
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
                console.error('Error updating media:', error);
                return null;
            });
    },
    deleteMedia(id: number): Promise<void> {
        return fetchFromAPI(`medias/${id}`, 'DELETE')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`API call failed: ${response.statusText}`);
                }
            })
            .catch(error => {
                console.error('Error deleting media:', error);
            });
    },
};