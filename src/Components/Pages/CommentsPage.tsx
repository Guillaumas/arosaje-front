import React, {useState, useEffect} from 'react';
import {COMMENTS} from '../../routes';

interface Comment {
    id: number;
    entity_type: string;
    entity_id: number;
    user_id: number;
    body: string;
    created_at: string;
    updated_at: string;
}

const CommentsPage = () => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [error, setError] = useState<Error | null>(null);
    const [newComment, setNewComment] = useState<string>('');

    useEffect(() => {
        const entityType = 'post';
        const entityId = 1;
        fetch(COMMENTS.SEARCH.findByEntityTypeAndEntityId(entityType, entityId), {
            method: COMMENTS.METHOD.GET,
        })
            .then(response => response.json())
            .then((data: Comment[]) => setComments(data))
            .catch((err: Error) => setError(err));
    }, []);

    /*const handleAddComment = () => {
        const newCommentObj = {
            entity_type: 'post',
            entity_id: 1,
            user_id: 1,
            body: newComment,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };


        fetch(COMMENTS.SELF.URL, {
            method: COMMENTS.METHOD.POST,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCommentObj),
        })
            .then(response => response.json())
            .then((data: Comment) => {
                setComments(prevComments => [...prevComments, data]);
                setNewComment('');
            })
            .catch((err: Error) => {
                console.error("An error occurred while adding the comment.", err);
                setError(err);
            });
    };*/

    if (error) {
        return <div>An error occurred: {error.message}</div>;
    }

    return (
        <div>
            {comments.map((comment) => (
                <div key={comment.id}>
                    <p>Comment: {comment.body}</p>
                    <p>Date: {comment.created_at}</p>
                </div>
            ))}
            <button onClick={() => setNewComment('')}>Add Comment</button>
            {newComment && (
                <div>
                    <textarea value={newComment} onChange={(e) => setNewComment(e.target.value)}/>
                    <button onClick={() => setNewComment('')}>Cancel</button>
                </div>
            )}
        </div>
    );
}//<button onClick={handleAddComment}>Submit</button>

export default CommentsPage;


//todo fonctionnalités de base pour la page de commentaires du post
//todo 1 affichage des 20 premiers commentaires avec les informations suivantes:
//todo - nom de l'utilisateur
//todo - date de publication
//todo - contenu du commentaire
//todo - image de profil de l'utilisateur
//todo prechargement des commentaires suivants
//todo 2 affichage d'un bouton pour ajouter un commentaire
//todo 3 si l'utilisateur appuis sur le bouton, une simple boite de texte apparait pour ecrire le commentaire et un bouton pour valider