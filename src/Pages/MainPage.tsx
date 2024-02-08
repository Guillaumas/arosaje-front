import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ANNOUNCES } from '../routes';
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
    padding-top: 72px;
    color: #61dafb;
`;

const Card = styled.div`
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 10px;
    margin: 10px;
`;

const MainPage = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const observer = useRef<IntersectionObserver | null>(null);
    const lastPostElementRef = useCallback((node: HTMLElement | null) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                setPage(prevPage => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    }, [loading]);

    useEffect(() => {
        setLoading(true);
        fetch(`${ANNOUNCES.URL}?page=${page}&size=10`, {
            method: ANNOUNCES.METHOD.GET,
        })
            .then(response => response.json())
            .then((data: Post[]) => {
                setPosts(prevPosts => [...prevPosts, ...data]);
                setLoading(false);
            })
            .catch((err: Error) => {
                console.error("An error occurred while fetching the posts data.", err);
                setError(err);
            });
    }, [page]);
    if (error) {
        return <StyledDiv>An error occurred: {error.message}</StyledDiv>;
    }

    return (
        <div>
            {posts.map((post) => (
                <Card key={post.id}>
                    <img src={post.image} alt={post.title}/>
                    <h2>{post.title}</h2>
                    <p>Date: {post.start_date}</p>
                    <p>Author: {post.announcer_id}</p>
                    <p>Comment: {post.body}</p>
                    <Link to={`/post/${post.id}`}>View Post</Link>
                    <Link to={`/post/${post.id}/comments`}>View Comments</Link>
                </Card>
            ))}
        </div>
    );
}

export default MainPage;


//todo fonctionnalités de base de la page d'accueil
//todo style card responsive
//todo 2 precharger les 10 posts suivants -- pas obligatoire
//todo 5 si l'utilisateur appuie sur les commentaires d'un post, afficher la page des commentaires de ce post