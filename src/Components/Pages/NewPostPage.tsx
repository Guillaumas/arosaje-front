import React, {useState, ChangeEvent, FormEvent} from 'react';
import '../../Styles/NewPostPage.css';

const NewPost = ({onClose}: { onClose?: () => void }) => {
    const [formData, setFormData] = useState({
        plantId: '',
        startDate: '',
        endDate: '',
        description: '',
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) {
            alert('Please fill in all required fields.');
            return;
        }

        console.log('Form data ready to be submitted:', formData);

        setFormData({
            plantId: '',
            startDate: '',
            endDate: '',
            description: '',
        });

        if (onClose) onClose();
    };

    const validateForm = (): boolean => {
        return formData.plantId !== '' && formData.startDate !== '' && formData.endDate !== '';
    };

    const handleCancel = () => {
        if (onClose) onClose();
    };

    const handleClearForm = () => {
        setFormData({
            plantId: '',
            startDate: '',
            endDate: '',
            description: '',
        });
    };

    return (
        <div className="newPostContainer">
            <form onSubmit={handleSubmit} className="newPostForm">
                <input type="text" name="plantId" placeholder="Plant ID" value={formData.plantId} onChange={handleInputChange} className="newPostInput" required/>
                <input type="date" name="startDate" value={formData.startDate} onChange={handleInputChange} className="newPostInput" required/>
                <input type="date" name="endDate" value={formData.endDate} onChange={handleInputChange} className="newPostInput" required/>
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} className="newPostTextarea"/>
                <button type="submit" className="newPostButton">Submit</button>
                <button type="button" onClick={handleCancel} className="newPostButton">Cancel</button>
                <button type="button" onClick={handleClearForm} className="newPostButton">Clear</button>
            </form>
        </div>
    );
};

export default NewPost;