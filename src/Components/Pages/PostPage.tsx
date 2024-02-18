import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AnnounceService } from '../../Services/AnnounceService';
import { UserService } from '../../Services/UserService';
import { Announce } from '../../Interfaces/Announce';

const PostPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Announce | null>(null);
    const [ownerName, setOwnerName] = useState<string | null>(null);
    const [status, setStatus] = useState<string | null>(null);

    useEffect(() => {
        AnnounceService.fetchAnnounceById(Number(id))
            .then((announce) => {
                setPost(announce);
                UserService.fetchUserById(announce.announcer_id)
                    .then((user) => setOwnerName(user.name))
                    .catch((error) => console.error(error));
            })
            .catch((error) => console.error(error));
    }, [id]);

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{post.title}</h1>
            <h2>{ownerName}</h2>
            <p>{post.body}</p>
            <img src={post.image} alt={post.title} />
            <h2>Plant Information</h2>
            <p>Plant ID: {post.plant_id}</p>
            <h2>Comments</h2>
            <p>Owner: {ownerName}</p>
            <p>Date: {post.created_at}</p>
            <p>Status: {status}</p>
            <button>Contact Owner</button>
        </div>
    );
};

export default PostPage;



//todo fonctionnalités de base pour la page de details de post
//todo 1 affichage du post au dessus de la page par laquelle elle a été appelée (profile ou feed) en overlay
//todo 2 affichage en format carte info de la plante dans le quel on peut voir:
//todo - nom de la plante
//todo - espece de la plante
//todo - image de la plante
//todo - les boutons de defilement des images
//todo - un bouton de contact d'un botaniste (si la plante est celle de l'utilisateur)
//todo 3 affichage des commentaires
//todo 4 affichage du nom du proprietaire du post
//todo 5 affichage de la date de publication
//todo 6 affichage du statut
//todo 7 affichage d'un bouton de contact du proprietaire (posteur de l'annonce)