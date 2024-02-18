import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PlantService } from '../../Services/PlantService';
import { Plant } from '../../Interfaces/Plant';
import {UserService} from "../../Services/UserService";
import {SpeciesService} from "../../Services/SpeciesService";

interface PlantPageProps {
  plantProfile?: Plant;
}

const PlantPage: React.FC<PlantPageProps> = ({ plantProfile }) => {
    const { id } = useParams<{ id: string }>();
    const [plant, setPlant] = useState<Plant | null>(null);
    const [user, setUser] = useState<any>(null);
    const [species, setSpecies] = useState<any>(null);

    useEffect(() => {
    if (!plantProfile) {
        PlantService.fetchPlantByUserId(parseInt(id || ''))
            .then(fetchedPlant => {
                setPlant(fetchedPlant[0]);
                return UserService.fetchUserById(fetchedPlant[0].ownerId);
            })
            .then(user => setUser(user))
            .catch(error => console.error(error));
    } else {
        setPlant(plantProfile);
        UserService.fetchUserById(plantProfile.ownerId)
            .then(user => setUser(user))
            .catch(error => console.error(error));
    }
    SpeciesService.fetchSpeciesById(plantProfile?.speciesId || 0)
        .then(data => setSpecies(data))
        .catch(error => console.error(error));
}, [id, plantProfile]);

    if (!plant) {
        return <div>Loading...</div>;
    }

    return (
    <div>
        <h1>Plant Information</h1>
        <p>ID: {plant.id}</p>
        <p>Owner : {user.username}</p>
        <p>Current State: {plant.currentState}</p>
        <p>Species : {species.name}</p>
    </div>
);
};

export default PlantPage;