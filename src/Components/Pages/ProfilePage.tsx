import React, {useEffect, useState, useContext} from 'react';
import {AnnounceService} from '../../Services/AnnounceService';
import {PlantService} from '../../Services/PlantService';
import {AuthContext} from '../../Contexts/AuthContext';
import {Announce} from '../../Interfaces/Announce';
import {Plant} from '../../Interfaces/Plant';
import {TabContent} from "../ProfilePageTab/ProfileTab";




const ProfilePage = () => {
    const [announces, setAnnounces] = useState<Announce[]>([]);
    const [plants, setPlants] = useState<Plant[]>([]);
    const [isTabPost, setIsTabPost] = useState(false);
    const {user} = useContext(AuthContext);

    useEffect(() => {
        if (user) {
            AnnounceService.fetchAnnouncesByUserId(user.id)
                .then((data: Announce[]) => setAnnounces(data));

            PlantService.fetchPlantByUserId(user.id)
                .then((data: Plant[]) => setPlants(data));

        }
    }, [user]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{user.first_name}</h1>
            <button onClick={() => setIsTabPost(false)}>My Plants</button>
            <button onClick={() => setIsTabPost(true)}>My Announces</button>
            <TabContent isTabPost={isTabPost} plants={plants} announces={announces}/>
        </div>
    );
};

export default ProfilePage;