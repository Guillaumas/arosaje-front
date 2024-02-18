import React, { useState } from 'react';
import { ANNOUNCES, generateSearchURL } from '../../routes';
import { Announce, AnnounceSearchCriteria } from '../../Interfaces/Announce';
import {Link} from "react-router-dom";

const SearchPage = () => {
    const [searchCriteria, setSearchCriteria] = useState<AnnounceSearchCriteria>({});
    const [results, setResults] = useState<Announce[]>([]);

    const handleCriteriaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchCriteria({
            ...searchCriteria,
            [event.target.value]: event.target.value,
        });
    };

    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const searchURL = generateSearchURL(ANNOUNCES.URL, ANNOUNCES.SEARCH, searchCriteria);
        fetch(searchURL)
            .then(response => response.json())
            .then(data => setResults(data))
            .catch(error => console.error(error));
    };

    return (
        <div>
            <form onSubmit={handleSearchSubmit}>
                <select onChange={handleCriteriaChange}>
                    <option value="">Select a category...</option>
                    <option value="startDate">Start Date</option>
                    <option value="title">Title</option>
                    <option value="announcerId">Announcer ID</option>
                    <option value="plantId">Plant ID</option>
                    <option value="endDate">End Date</option>
                </select>
                <button type="submit">Search</button>
            </form>
            {results.map(post => (
                <Link to={`/announce/${post.id}`} key={post.id}>
                    <div key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                        <p>Start Date: {post.startDate}</p>
                        <p>End Date: {post.endDate}</p>
                        <p>Announcer ID: {post.announcerId}</p>
                        <p>Plant ID: {post.plantId}</p>
                        <p>Created at: {post.createdAt}</p>
                        <p>Updated at: {post.updatedAt}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default SearchPage;