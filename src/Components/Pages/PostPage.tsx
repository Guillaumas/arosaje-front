import React, { useEffect, useState } from 'react';
import {Link, useParams} from 'react-router-dom';
import { AnnounceService } from '../../Services/AnnounceService';
import { UserService } from '../../Services/UserService';
import { Announce } from '../../Interfaces/Announce';
import {PlantService} from "../../Services/PlantService";
import {Plant} from "../../Interfaces/Plant";

const PostPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<Announce | null>(null);
    const [ownerName, setOwnerName] = useState<string | null>(null);
    const [plant, setPlant] = useState<Plant | null>(null);


    useEffect(() => {
        AnnounceService.fetchAnnounceById(Number(id))
            .then((announce) => {
                setPost(announce);
                UserService.fetchUserById(announce.announcerId)
                    .then((user) => setOwnerName(user.username))
                    .catch((error) => console.error(error));
                PlantService.fetchPlantById(announce.plantId)
                    .then((plant) => setPlant(plant))
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
            <h2>Plant Information</h2>
            <p>Plant ID: {post.plantId}</p>
            <h2>Comments</h2>
            <p>Owner: {ownerName}</p>
            <p>Date: {post.createdAt}</p>
            <p>Status: {plant?.currentState}</p>
            <button>Contact Owner</button>
            <Link to={`/plants/${plant?.id}`}>View Plant</Link>
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