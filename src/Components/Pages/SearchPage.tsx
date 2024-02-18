import React, { useState } from 'react';
import { ANNOUNCES, generateSearchURL } from '../../routes';
import { Announce, AnnounceSearchCriteria } from '../../Interfaces/Announce';
import {Link} from "react-router-dom";

const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchCriteria, setSearchCriteria] = useState<AnnounceSearchCriteria>({});
    const [results, setResults] = useState<Announce[]>([]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    };

    const handleCriteriaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchCriteria({
            ...searchCriteria,
            [event.target.name]: event.target.value,
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
                <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search..." />
                <input type="text" name="startDate" value={searchCriteria.startDate} onChange={handleCriteriaChange} placeholder="Start Date..." />
                <input type="text" name="title" value={searchCriteria.title} onChange={handleCriteriaChange} placeholder="Title..." />
                <input type="number" name="announcerId" value={searchCriteria.announcerId} onChange={handleCriteriaChange} placeholder="Announcer ID..." />
                <input type="number" name="plantId" value={searchCriteria.plantId} onChange={handleCriteriaChange} placeholder="Plant ID..." />
                <input type="text" name="endDate" value={searchCriteria.endDate} onChange={handleCriteriaChange} placeholder="End Date..." />
                <button type="submit">Search</button>
            </form>
            {results.map(post => (
                <Link to={`/announce/${post.id}`} key={post.id}>
                    <div key={post.id}>
                        <h2>{post.title}</h2>
                        <p>{post.body}</p>
                        <p>Start Date: {post.start_date}</p>
                        <p>End Date: {post.end_date}</p>
                        <p>Announcer ID: {post.announcer_id}</p>
                        <p>Plant ID: {post.plant_id}</p>
                        <p>Created at: {post.created_at}</p>
                        <p>Updated at: {post.updated_at}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default SearchPage;