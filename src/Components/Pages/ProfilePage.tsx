import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AnnounceService } from '../../Services/AnnounceService';
import { SpeciesService } from '../../Services/SpeciesService';
import { AuthContext } from '../../Contexts/AuthContext';
import { Announce } from '../../Interfaces/Announce';
import { Species } from '../../Interfaces/Species';

const ProfilePage = () => {
    const [announces, setAnnounces] = useState<Announce[]>([]);
    const [species, setSpecies] = useState<Species[]>([]);

    const { user} = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            AnnounceService.fetchAnnounces()
                .then((data: Announce[]) => setAnnounces(data.filter(announce => announce.announcer_id === user.id)));

            SpeciesService.fetchSpecies()
                .then((data: Species[]) => setSpecies(data));
        }
    }, [user]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{user.first_name}</h1>
            <h2>My Announces</h2>
            {announces.map(post => (
                <Link to={`/announce/${post.id}`} key={post.id}>
                    <div>
                        <h3>{post.title}</h3>
                        <p>{post.body}</p>
                        <p>{species.find(species => species.id === post.plant_id)?.name}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default ProfilePage;


//todo affichage de la page du profil
//todo 1 afficher les dans une card generique les 10 derniers posts de plantes du profil selectionné de format instagram (image, titre, date, auteur, commentaire)
//todo 2 precharger les 10 posts suivants
//todo 3 afficher la navbar (accueil, profil, messages, parametres)
//todo 4 si le profil est le profil de l'utilisateur connecté, afficher un bouton pour ajouter un post
//todo 5 si le profil est le profil de l'utilisateur connecté, afficher un bouton pour modifier le profil