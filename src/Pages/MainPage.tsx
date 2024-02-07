import {useEffect, useState} from "react";
import {ANNOUNCES} from "../routes";
import { Link } from 'react-router-dom';
import styled from "styled-components";

interface Post {
    id: number;
    announcer_id: number;
    plant_id: number;
    title: string;
    body: string;
    start_date: string;
    end_date: string;
    created_at: string;
    updated_at: string;
    image: string;
}

const StyledDiv = styled.div`
    padding-top: 72px; //c'est la taille de la navbar si jamais t'a besoin de le savoir sale trou de balle (jme parle a moi meme)
    color: #61dafb;
`;

const MainPage = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        fetch(ANNOUNCES.SELF.URL, {
            method: ANNOUNCES.SELF.METHOD,
        })
            .then(response => {
                if (!response.ok) {
                    throw response
                }
                return response.json()
            })
            .then((data: Post[]) => setPosts(data.slice(0, 10))) //changer la route de get pour avoir les 10 premiers posts sans data slice
            .catch((err: Error) => {
                console.error("An error occurred while fetching the posts data.", err);
                setError(err);
            })
            .catch((err: Error) => {
                console.error("A network error occurred.", err);
                setError(new Error("Network error: " + err.message));
            });
    }, []);

    if (error) {
        return <StyledDiv>An error occurred: {error.message}</StyledDiv>;
    }

    return (
        <div>
            {posts.map((post) => (
                <div key={post.id}>
                    <img src={post.image} alt={post.title} />
                    <h2>{post.title}</h2>
                    <p>Date: {post.start_date}</p>
                    <p>Author: {post.announcer_id}</p>
                    <p>Comment: {post.body}</p>
                    <Link to={`/post/${post.id}`}>View Post</Link>
                    <Link to={`/post/${post.id}/comments`}>View Comments</Link>
                </div>
            ))}
        </div>
    );
}

export default MainPage;


//todo fonctionnalités de base de la page d'accueil
//todo style card responsive
//todo 2 precharger les 10 posts suivants -- pas obligatoire
//todo 5 si l'utilisateur appuie sur les commentaires d'un post, afficher la page des commentaires de ce post