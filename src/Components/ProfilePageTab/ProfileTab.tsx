import React, {useState} from "react";
import NewPost from "../Pages/NewPostPage";
import {Plant} from "../../Interfaces/Plant";
import {Announce} from "../../Interfaces/Announce";
import {Link} from "react-router-dom";
import NewPlant from "../Pages/NewPlantPage";


interface TabContentProps {
    isTabPost: boolean;
    plants: Plant[];
    announces: Announce[];
}

export const TabContent: React.FC<TabContentProps> = ({isTabPost, plants, announces}) => {
    const [isAddingPost, setIsAddingPost] = useState(false);
    const [isAddingPlant, setIsAddingPlant] = useState(false);

    function handleOpenNewPostForm() {
        setIsAddingPost(true);
    }

    function handleCloseNewPostForm() {
        setIsAddingPost(false);
    }

    function handleOpenNewPlantForm() {
        setIsAddingPlant(true);
    }

    function handleCloseNewPlantForm() {
        setIsAddingPlant(false);
    }


    return (
    !isTabPost ?
        <div>
            <button onClick={handleOpenNewPostForm} className="addPlantButton">Add Plant</button>
            {isAddingPost && (
                <div className="newPlantFormContainer">
                    <NewPlant onClose={handleCloseNewPostForm}/>
                </div>
            )}
            {plants.map((plant: Plant) => (
                <div key={plant.id}>
                    <p>Owner ID: {plant.owner_id}</p>
                    <p>Current State: {plant.current_state}</p>
                    <p>Species ID: {plant.species_id}</p>
                </div>
            ))}
        </div> :
        <div>
            <button onClick={handleOpenNewPlantForm} className="addPostButton">Add Post</button>
            {isAddingPlant && (
                <div className="newPostFormContainer">
                    <NewPost onClose={handleCloseNewPlantForm}/>
                </div>
            )}
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