import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {AnnounceService} from '../../Services/AnnounceService';
import {UserService} from '../../Services/UserService';
import {Announce} from '../../Interfaces/Announce';
import '../../Styles/PostPage.css';
import {PlantService} from '../../Services/PlantService';
import {Plant} from "../../Interfaces/Plant";
import {ConversationService} from "../../Services/ConversationService";

const PostPage: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const [post, setPost] = useState<Announce | null>(null);
    const [ownerName, setOwnerName] = useState<string | null>(null);
    const [plant, setPlant] = useState<Plant | null>(null);
    const [user, setUser] = useState<any | null>(null);

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

    const handleContactPostOwner = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (!post) return;

        const ownerId = post.announcerId;
        const user = localStorage.getItem('user');
        console.log('user:', user);
        const currentUser = JSON.parse(user || '{}');
        const currentUserId = currentUser.id;
        console.log('user1id:', currentUserId);
        console.log('ownerId:', ownerId);

        if ((ownerId == currentUserId)) {
            alert('You cannot contact yourself');
            return;
        }


        const newConversation = {
            id: 0,
            user1Id: currentUserId,
            user2Id: ownerId
        };
        await ConversationService.createConversation(newConversation);
    };

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className="body">
            <div className='postPage'>
                <h2>Plant Information</h2>
                <div className="postCard">
                    <div className="header">
                        <h2>{ownerName}</h2>
                        <p className="postDate">{post.startDate} - {post.endDate}</p>
                        <p>{plant?.currentState}</p>
                    </div>
                    <div className="content">
                        <div className="text">
                            <h1 className='postTitle'>{post.title}</h1>
                            <p>{post.body}</p>
                            <button onClick={handleContactPostOwner} className='postContact'>Contact Owner</button>
                            {/* <Link to={`/plants/${plant?.id}`}>View Plant</Link> */}
                        </div>
                        {/* <img src={post.image} alt={post.title} className="postImage"/> */}
                    </div>
                    <div className="comment">
                        <h2>Comments</h2>
                    </div>
                </div>
            </div>
            <div className="text-login footer">
                <span>
                    All rights reserved, Arosaje©
                </span>
            </div>
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