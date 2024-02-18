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
                <Link to={`/plant/${plant.id}`}>
                <div key={plant.id}>
                    <p>Owner ID: {plant.ownerId}</p>
                    <p>Current State: {plant.currentState}</p>
                    <p>Species ID: {plant.speciesId}</p>
                </div>
                </Link>
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
                        <p>Announcer ID: {announce.announcerId}</p>
                        <p>Plant ID: {announce.plantId}</p>
                        <p>Title: {announce.title}</p>
                        <p>Body: {announce.body}</p>
                        <p>Start Date: {announce.startDate}</p>
                        <p>End Date: {announce.endDate}</p>
                    </div>
                </Link>
            ))}
        </div>
);
}