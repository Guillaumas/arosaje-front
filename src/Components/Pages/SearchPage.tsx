import React, { useState } from 'react';
import { ANNOUNCES, generateSearchURL } from '../../routes';
import { Announce, AnnounceSearchCriteria } from '../../Interfaces/Announce';
import {Link} from "react-router-dom";
import "../../Styles/SearchPage.css";

const SearchPage = () => {
    const [searchCriteria, setSearchCriteria] = useState<AnnounceSearchCriteria>({});
    const [results, setResults] = useState<Announce[]>([]);
    const [searchText, setSearchText] = useState<string>('');

    const handleCriteriaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSearchCriteria({
            ...searchCriteria,
            [event.target.value]: event.target.value,
        });
    };

    const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const searchURL = generateSearchURL(ANNOUNCES.URL, ANNOUNCES.SEARCH, {...searchCriteria, searchText});
        fetch(searchURL)
            .then(response => response.json())
            .then(data => setResults(data))
            .catch(error => console.error(error));
    };

    return (
        <div className='searchPage'>
            <form onSubmit={handleSearchSubmit} className='formSearch'>
                <input type="text" value={searchText} onChange={handleSearchTextChange} placeholder="Search..." className='formSearchInput'/>
                <select onChange={handleCriteriaChange} className='formSearchSelect'>
                    <option value="">Select a category...</option>
                    <option value="startDate">Start Date</option>
                    <option value="title">Title</option>
                    <option value="announcerId">Announcer ID</option>
                    <option value="plantId">Plant ID</option>
                    <option value="endDate">End Date</option>
                </select>
                <button type="submit" className='formSearchButton'>Search</button>
            </form>
            <div className="container">
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
        </div>
    );
};

export default SearchPage;