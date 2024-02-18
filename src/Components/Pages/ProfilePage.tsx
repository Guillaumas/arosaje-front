import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AnnounceService } from '../../Services/AnnounceService';
import { PlantService } from '../../Services/PlantService';
import { SpeciesService } from '../../Services/SpeciesService';
import { AuthContext } from '../../Contexts/AuthContext';
import { Announce } from '../../Interfaces/Announce';
import { Plant } from '../../Interfaces/Plant';
import { Species } from '../../Interfaces/Species';


interface TabContentProps {
    selectedTab: string;
    plants: Plant[];
    announces: Announce[];
}

const TabContent: React.FC<TabContentProps> = ({ selectedTab, plants, announces }) => {
    if (selectedTab === 'plants') {
        return (
            <div>
                {plants.map((plant: Plant) => (
                    <div key={plant.id}>
                        <p>Owner ID: {plant.owner_id}</p>
                        <p>Current State: {plant.current_state}</p>
                        <p>Species ID: {plant.species_id}</p>
                    </div>
                ))}
            </div>
        );
    } else {
        return (
            <div>
                {announces.map((announce: Announce) => (
                    <Link to={`/announce/${announce.id}`} key={announce.id}>
                        <div>
                            <p>Announcer ID: {announce.announcer_id}</p>
                            <p>Plant ID: {announce.plant_id}</p>
                            <p>Title: {announce.title}</p>
                            <p>Body: {announce.body}</p>
                            <p>Start Date: {announce.start_date}</p>
                            <p>End Date: {announce.end_date}</p>
                        </div>
                    </Link>
                ))}
            </div>
        );
    }
};

const ProfilePage = () => {
    const [announces, setAnnounces] = useState<Announce[]>([]);
    const [plants, setPlants] = useState<Plant[]>([]);
    const [selectedTab, setSelectedTab] = useState('plants');

    const { user } = useContext(AuthContext);

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
            <button onClick={() => setSelectedTab('plants')}>My Plants</button>
            <button onClick={() => setSelectedTab('announces')}>My Announces</button>
            <TabContent selectedTab={selectedTab} plants={plants} announces={announces} />
        </div>
    );
};

export default ProfilePage;