import fetchFromAPI from './ApiService';
import { Comment } from '../Interfaces/Comment';

export const CommentService = {
    fetchComments(): Promise<Comment[]> {
        return fetchFromAPI('comments')
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
                console.error('Error fetching comments:', error);
                return [];
            });
    },
    createComment(commentData: Comment): Promise<Comment> {
        return fetchFromAPI('comments', 'POST', commentData)
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
                console.error('Error creating comment:', error);
                return null;
            });
    },
    updateComment(commentData: Comment): Promise<Comment> {
        return fetchFromAPI(`comments/${commentData.id}`, 'PUT', commentData)
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
                console.error('Error updating comment:', error);
                return null;
            });
    },
    deleteComment(id: number): Promise<void> {
        return fetchFromAPI(`comments/${id}`, 'DELETE')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`API call failed: ${response.statusText}`);
                }
            })
            .catch(error => {
                console.error('Error deleting comment:', error);
            });
    },
};