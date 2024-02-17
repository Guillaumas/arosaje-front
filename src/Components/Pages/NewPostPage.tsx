import React, { useState, ChangeEvent, FormEvent } from 'react';
import '../../Styles/NewPostPage.css';

const NewPost = ({ onClose }: { onClose?: () => void }) => {
    const [formData, setFormData] = useState({
        plantName: '',
        species: '',
        images: [] as File[],
        plantingDate: '',
        description: ''
    });
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files ? Array.from(e.target.files) : [];
        if (files.length > 0) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                images: files
            }));
            setImagePreviews(files.map(file => URL.createObjectURL(file)));
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validateForm()) {
            alert('Please fill in all required fields.');
            return;
        }

        console.log('Form data ready to be submitted:', formData);

        setFormData({
            plantName: '',
            species: '',
            images: [],
            plantingDate: '',
            description: ''
        });
        setImagePreviews([]);

        if (onClose) onClose();
    };

    const validateForm = (): boolean => {
        return formData.species.trim() !== '' && formData.images.length > 0;
    };

    const handleCancel = () => {
        if (onClose) onClose();
    };

    const handleClearForm = () => {
        setFormData({
            plantName: '',
            species: '',
            images: [],
            plantingDate: '',
            description: ''
        });
        setImagePreviews([]);
    };

    return (
        <div className="newPostContainer">
            <form onSubmit={handleSubmit} className="newPostForm">
                <input type="text" name="plantName" placeholder="Plant Name" value={formData.plantName} onChange={handleInputChange} className="newPostInput" />
                <input type="text" name="species" placeholder="Species" value={formData.species} onChange={handleInputChange} required className="newPostInput" />
                <input type="file" name="images" onChange={handleImageChange} multiple required className="newPostInput" />
                {imagePreviews.map((preview, index) => <img key={index} src={preview} alt="Preview" className="newPostImagePreview" />)}
                <input type="date" name="plantingDate" value={formData.plantingDate} onChange={handleInputChange} className="newPostInput" />
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} className="newPostTextarea" />
                <button type="submit" className="newPostButton">Submit</button>
                <button type="button" onClick={handleCancel} className="newPostButton">Cancel</button>
                <button type="button" onClick={handleClearForm} className="newPostButton">Clear</button>
            </form>
        </div>
    );
};

export default NewPost;