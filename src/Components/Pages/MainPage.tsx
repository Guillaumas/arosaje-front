import React, {useState, useEffect, useRef, useCallback} from 'react';
import {ANNOUNCES} from '../../routes';
import {Link} from 'react-router-dom';
import styled from "styled-components";
import NewPost from "./NewPostPage";

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
    const [isAddingPost, setIsAddingPost] = useState(false); // State to control NewPost form visibility
    const observer = useRef<IntersectionObserver | null>(null);

    const fetchPosts = () => {
        console.log('Fetching posts...')

        fetch(`${ANNOUNCES.URL}?page=0&size=10`, {
            method: ANNOUNCES.METHOD.GET,
        })
            .then(response => response.json())
            .then(data => {
                if (data._embedded && Array.isArray(data._embedded.announces)) {
                    setPosts(data._embedded.announces);
                } else {
                    console.log('No announces found or data is not in the expected format', data);
                }
            })
            .catch((err) => {
                console.error("An error occurred while fetching the posts data.", err);
                setError(err);
            }).finally(() => setLoading(false));
        console.log('Posts fetched!', posts)
    };


    const handleOpenNewPostForm = () => {
        setIsAddingPost(true); // Open the NewPost form
    };

    const handleCloseNewPostForm = () => {
        setIsAddingPost(false); // Close the NewPost form
    };

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
        fetchPosts();

        const interval = setInterval(fetchPosts, 5000);

        return () => clearInterval(interval);
    }, []);


    if (error) {
        return <StyledDiv>An error occurred: {error.message}</StyledDiv>;
    }

    if (loading) {
        return <StyledDiv>Loading...</StyledDiv>;
    }

    if (posts.length === 0) {
        return <StyledDiv>No posts available.</StyledDiv>;
    }

    return (
        <div>
            <button onClick={handleOpenNewPostForm}>Add Post</button>
            {isAddingPost && (
                <div>
                    <button onClick={handleCloseNewPostForm}>Cancel</button>
                </div>
            )}

            {posts.map((post, index) => (
                <Link to={`/announce/${post.id}`} key={post.id}>
                    <Card key={post.id} ref={posts.length === index + 1 ? lastPostElementRef : null}>
                        <img src={post.image} alt={post.title}/>
                        <h2>{post.title}</h2>
                        <p>Date: {post.start_date}</p>
                        <p>Author: {post.announcer_id}</p>
                        <p>Comment: {post.body}</p>
                        <Link to={`/post/${post.id}`}>View Post</Link>
                        <Link to={`/post/${post.id}/comments`}>View Comments</Link>
                    </Card>
                </Link>
            ))}
            {isAddingPost && <NewPost onClose={handleCloseNewPostForm}/>}
        </div>
    );
};

export default MainPage;


//todo fonctionnalités de base de la page d'accueil
//todo style card responsive
//todo 2 precharger les 10 posts suivants -- pas obligatoire
//todo 5 si l'utilisateur appuie sur les commentaires d'un post, afficher la page des commentaires de ce post