import React, {useState, useEffect, useRef, useCallback} from 'react';
import {Link} from 'react-router-dom';
import NewPost from "./NewPostPage";
import '../../Styles/MainPage.css'
import {AnnounceService} from "../../Services/AnnounceService";

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

const MainPage = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [isAddingPost, setIsAddingPost] = useState(false); // State to control NewPost form visibility
    const observer = useRef<IntersectionObserver | null>(null);

    const fetchPosts = async () => {
        console.log('Fetching posts...')
        try {
            const data = await AnnounceService.fetchAnnounces();

            if (Array.isArray(data)) {
                setPosts(data);
            } else {
                console.log('No announces found or data is not in the expected format', data);
            }
        } catch (err) {
            console.error("An error occurred while fetching the posts data.", err);
            setError(err as Error);
        } finally {
            setLoading(false);
        }
        console.log('Posts fetched!', posts)
    };


    const handleOpenNewPostForm = () => {
        setIsAddingPost(true);
    };

    const handleCloseNewPostForm = () => {
        setIsAddingPost(false);
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
        return <div className="error">An error occurred: {error.message}</div>;
    }

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (posts.length === 0) {
        return <div className="noPosts">No posts available.</div>;
    }

    return (
        <div className="mainPage">
            <button onClick={handleOpenNewPostForm} className="addPostButton">Add Post</button>
            {isAddingPost && (
                <div className="newPostFormContainer">
                    <button onClick={handleCloseNewPostForm} className="cancelButton">Cancel</button>
                </div>
            )}

            {posts.map((post, index) => (
                <Link to={`/announce/${post.id}`} key={post.id} className="postLink">
                    <div key={post.id} ref={posts.length === index + 1 ? lastPostElementRef : null} className="postCard">
                        <img src={post.image} alt={post.title} className="postImage"/>
                        <h2 className="postTitle">{post.title}</h2>
                        <p className="postDate">Date: {post.start_date}</p>
                        <p className="postAuthor">Author: {post.announcer_id}</p>
                        <p className="postComment">Comment: {post.body}</p>
                        <Link to={`/post/${post.id}`} className="viewPostLink">View Post</Link>
                        <Link to={`/post/${post.id}/comments`} className="viewCommentsLink">View Comments</Link>
                    </div>
                </Link>
            ))}
            {isAddingPost && <NewPost onClose={handleCloseNewPostForm}/>}
        </div>
    );
};

export default MainPage;


//todo style card responsive
//todo 2 precharger les 10 posts suivants -- pas obligatoire
//todo 5 si l'utilisateur appuie sur les commentaires d'un post, afficher la page des commentaires de ce post