import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AnnounceService } from '../../Services/AnnounceService';
import { PlantService } from '../../Services/PlantService';
import { Announce } from '../../Interfaces/Announce';
import { Plant } from '../../Interfaces/Plant';
import { TabContent } from "../ProfilePageTab/ProfileTab";
import { User } from "../../Interfaces/User";

interface ProfilePageProps {
    userProfile: User | null
}

const ProfilePage: React.FC<ProfilePageProps> = ({ userProfile }) => {
    const { id } = useParams<{ id: string }>();
    const [announces, setAnnounces] = useState<Announce[]>([]);
    const [plants, setPlants] = useState<Plant[]>([]);
    const [isTabPost, setIsTabPost] = useState(false);

    useEffect(() => {
        if (userProfile) {
            AnnounceService.fetchAnnouncesByUserId(userProfile.id)
                .then((data: Announce[]) => setAnnounces(data));

            PlantService.fetchPlantByUserId(userProfile.id)
                .then((data: Plant[]) => setPlants(data));
        }
    }, [id, userProfile]);

    if (!userProfile) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{userProfile.firstName} {userProfile.lastName}</h1>
            <p>Username: {userProfile.username}</p>
            <p>Country: {userProfile.country}</p>
            <p>City: {userProfile.city}</p>
            <p>Zip Code: {userProfile.zipCode}</p>
            <p>Street: {userProfile.streetName} {userProfile.streetNumber}</p>
            <p>Birth Date: {userProfile.birthDate}</p>
            <button onClick={() => setIsTabPost(false)}>My Plants</button>
            <button onClick={() => setIsTabPost(true)}>My Announces</button>
            <TabContent isTabPost={isTabPost} plants={plants} announces={announces}/>
        </div>
    );
};

export default ProfilePage;