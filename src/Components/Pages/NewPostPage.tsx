import React, {useState, ChangeEvent, FormEvent, useEffect} from 'react';
import '../../Styles/NewPostPage.css';
import { PlantService } from '../../Services/PlantService';
import { AnnounceService } from '../../Services/AnnounceService';
import { Announce } from '../../Interfaces/Announce';
import { Plant } from '../../Interfaces/Plant';

const NewPost = ({onClose}: { onClose?: () => void }) => {
    const [formData, setFormData] = useState({
        plantId: '',
        title: '',
        startDate: '',
        endDate: '',
        description: '',
    });
    const [plants, setPlants] = useState<Plant[]>([]);

    useEffect(() => {
        PlantService.fetchPlantByUserId(JSON.parse(localStorage.getItem('user') as string).id)
            .then(fetchedPlants => setPlants(fetchedPlants))
            .catch(error => console.error('Error fetching plants:', error));
    }, []);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) {
            alert('Please fill in all required fields.');
            return;
        }

        const newAnnounce: Announce = {
            id: 0,
            announcer_id: JSON.parse(localStorage.getItem('user') as string).id,
            plant_id: Number(formData.plantId),
            title: formData.title,
            body: formData.description,
            start_date: formData.startDate,
            end_date: formData.endDate,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        try {
            const createdAnnounce = await AnnounceService.createAnnounce(newAnnounce);
            console.log('Created announce:', createdAnnounce);
        } catch (error) {
            console.error('Error creating announce:', error);
        }

        setFormData({
            title: '',
            plantId: '',
            startDate: '',
            endDate: '',
            description: '',
        });

        if (onClose) onClose();
    };

    const validateForm = (): boolean => {
        return formData.plantId !== '' && formData.startDate !== '' && formData.endDate !== '' && formData.title !== '';
    };

    const handleCancel = () => {
        if (onClose) onClose();
    };

    const handleClearForm = () => {
        setFormData({
            title: '',
            plantId: '',
            startDate: '',
            endDate: '',
            description: '',
        });
    };

    return (
        <div className="newPostContainer">
            <form onSubmit={handleSubmit} className="newPostForm">
                <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleInputChange} className="newPostInput" required/>
                <select name="plantId" onChange={handleInputChange} required className="newPostInput">
                    {plants.map(plant => (
                        <option key={plant.id} value={plant.id}>{plant.current_state}</option>
                    ))}
                </select>
                <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} className="newPostInput" required/>
                <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} className="newPostInput" required/>
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} className="newPostTextarea" required/>
                <button type="submit" className="newPostButton">Submit</button>
                <button type="button" onClick={handleCancel} className="newPostButton">Cancel</button>
                <button type="button" onClick={handleClearForm} className="newPostButton">Clear</button>
            </form>
        </div>
    );
};

export default NewPost;