import React, {useState, ChangeEvent, FormEvent} from 'react';
import '../../Styles/NewPostPage.css';

const NewPost = ({onClose}: { onClose?: () => void }) => {
    const [formData, setFormData] = useState({
        plantName: '',
        species: '',
        images: [] as File[],
        plantingDate: '',
        description: '',
        image: null as File | null
    });
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({
                ...formData,
                image: e.target.files[0],
            });

            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreviews(prevImagePreviews => [...prevImagePreviews, reader.result as string]);
            };
            reader.readAsDataURL(e.target.files[0]);
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
            description: '',
            image: null as File | null

        });
        setImagePreviews([]);

        if (onClose) onClose();
    };

    const validateForm = (): boolean => {
        // return formData.species.trim() !== '' && formData.images.length > 0;
        return true;
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
            description: '',
            image: null as File | null
        });
        setImagePreviews([]);
    };

    return (
        <div className="newPostContainer">
            <form onSubmit={handleSubmit} className="newPostForm">
                <input type="text" name="plantName" placeholder="Plant Name" value={formData.plantName}
                       onChange={handleInputChange} className="newPostInput"/>
                <input type="text" name="species" placeholder="Species" value={formData.species}
                       onChange={handleInputChange} required className="newPostInput"/>
                <input type="file" name="images" accept="image/*" onChange={handleImageChange} multiple required
                       className="newPostInput"/>
                {imagePreviews.map((preview, index) => <img key={index} src={preview} alt="Preview"
                                                            className="newPostImagePreview"/>)}
                <input type="date" name="plantingDate" value={formData.plantingDate} onChange={handleInputChange}
                       className="newPostInput"/>
                <textarea name="description" placeholder="Description" value={formData.description}
                          onChange={handleInputChange} className="newPostTextarea"/>
                <button type="submit" className="newPostButton">Submit</button>
                <button type="button" onClick={handleCancel} className="newPostButton">Cancel</button>
                <button type="button" onClick={handleClearForm} className="newPostButton">Clear</button>
            </form>
        </div>
    );
};

export default NewPost;