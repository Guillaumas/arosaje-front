import React, { useState } from 'react';
import { ANNOUNCES, generateSearchURL } from '../../routes';
import { Announce, AnnounceSearchCriteria } from '../../Interfaces/Announce';

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
            {results.map(result => (
                <div key={result.id}>
                    <h2>{result.title}</h2>
                    <p>{result.body}</p>
                    <p>Start Date: {result.start_date}</p>
                    <p>End Date: {result.end_date}</p>
                    <img src={result.image} alt={result.title} />
                    <p>Announcer ID: {result.announcer_id}</p>
                    <p>Plant ID: {result.plant_id}</p>
                    <p>Created at: {result.created_at}</p>
                    <p>Updated at: {result.updated_at}</p>
                </div>
            ))}
        </div>
    );
};

export default SearchPage;