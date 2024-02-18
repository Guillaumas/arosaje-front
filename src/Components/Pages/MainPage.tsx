import React, {useState, useEffect, useRef, useCallback} from 'react';
import {Link} from 'react-router-dom';
import NewPost from "./NewPostPage";
import '../../Styles/MainPage.css'
import { ConversationService } from "../../Services/ConversationService";
import { Announce } from "../../Interfaces/Announce";
import {ANNOUNCES} from "../../routes";


const MainPage = () => {
    const [posts, setPosts] = useState<Announce[]>([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [isAddingPost, setIsAddingPost] = useState(false);
    const observer = useRef<IntersectionObserver | null>(null);
    const currentUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string).id : null;

    const fetchPosts = () => {
        console.log('Fetching posts...')

        fetch(`${ANNOUNCES.URL}?page=0&size=10`, {
            method: ANNOUNCES.METHOD.GET,
        })
            .then(response => response.json())
            .then(data => {
                if (data && Array.isArray(data)) {
                    setPosts(data);
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
    const handleContactPostOwner = async (ownerId: number) => {
        const user1id = currentUser

        const newConversation = {
            id: 0,
            user1_id: user1id,
            user2_id: ownerId
        };
        await ConversationService.createConversation(newConversation);
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
            <button onClick={handleOpenNewPostForm} className="addPostButton">
                <p>Create post :</p>
                <span className='fa-solid fa-plus'></span>
            </button>
            {isAddingPost && (
                <div className="newPostFormContainer">
                    <button onClick={handleCloseNewPostForm} className="cancelButton">Cancel</button>
                </div>
            )}

            {posts.map((post, index) => (
                <Link to={`/announce/${post.id}`} key={post.id} className="postLink">
                    <div key={post.id} ref={posts.length === index + 1 ? lastPostElementRef : null}
                         className="postCard">
                        <div className="header">
                            <p className="postAuthor">{post.announcerId}</p>
                            <p className="postDate">{post.startDate} - {post.endDate}</p>
                        </div>
                        <div className="content">
                            <div className="text">
                                <h2 className="postTitle">{post.title}</h2>
                                <p className="postBody">Description :</p>
                                <p className="postBody">{post.body}</p>
                                {currentUser && <button onClick={() => handleContactPostOwner(post.announcerId)} className='postContact'>Contact</button>}
                            </div>
                            <img src={post.image} alt={post.title} className="postImage"/>
                        </div>
                        {/* <Link to={`/post/${post.id}/comments`} className="viewCommentsLink">View Comments</Link> */}
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