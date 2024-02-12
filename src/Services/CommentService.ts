import fetchFromAPI from './ApiService';
import { Comment } from '../Interfaces/Comment';

export const CommentService = {
    fetchComments(): Promise<Comment[]> {
        return fetchFromAPI('comments');
    },
    createComment(commentData: Comment): Promise<Comment> {
        return fetchFromAPI('comments', 'POST', commentData);
    },
    updateComment(commentData: Comment): Promise<Comment> {
        return fetchFromAPI(`comments/${commentData.id}`, 'PUT', commentData);
    },
    deleteComment(id: number): Promise<void> {
        return fetchFromAPI(`comments/${id}`, 'DELETE');
    }
};
