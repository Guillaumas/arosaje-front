import React, { useState, ChangeEvent, FormEvent } from 'react';

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
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: 20, borderRadius: 5 }}>
                <input type="text" name="plantName" placeholder="Plant Name" value={formData.plantName} onChange={handleInputChange} />
                <input type="text" name="species" placeholder="Species" value={formData.species} onChange={handleInputChange} required />
                <input type="file" name="images" onChange={handleImageChange} multiple required />
                {imagePreviews.map((preview, index) => <img key={index} src={preview} alt="Preview" />)}
                <input type="date" name="plantingDate" value={formData.plantingDate} onChange={handleInputChange} />
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} />
                <button type="submit">Submit</button>
                <button type="button" onClick={handleCancel}>Cancel</button>
                <button type="button" onClick={handleClearForm}>Clear</button>
            </form>
        </div>
    );
};

export default NewPost;




//todo affichage de la page de nouveau post
//todo affichage d'un formulaire a remplir pour ajouter une plante/post avec les criteres suivants:
//todo - nom de la plante (optionnel)
//todo - espece de la plante (obligatoire)
//todo - image de la plante (obligatoire) (au moins une image)
//todo - une previsualisation de la plante
//todo - date de plantation (optionnel)
//todo - description (optionnel)
//todo - bouton de validation
//todo - bouton d'annulation
//todo - bouton de vidage du formulaire
//todo le formulaire doit etre valide pour etre envoyé
//todo le formulaire doit etre en overlay au dessus de la page de profile