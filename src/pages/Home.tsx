import { useEffect, useState } from 'react';
import '../pages/Home.css'
import { searchGoogle, searchReddit } from '../apiCalls';
import Post from '../interfaces/redditInterface';



function Home() {

    const [searchTerm, setSearchTerm] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    /* Confidence number */
    const [confidencePercentage, setConfidencePercentage] = useState<number>();
    /* Reddit */
    const [searchResults, setSearchResults] = useState<Post[]>([]);
    /* Search boolean */
    const [showConfidence, setShowConfidence] = useState(false);


    useEffect(() => {
        if (searchQuery) {
            searchGoogle(searchQuery)
                .then((confidence) => {
                    setConfidencePercentage(confidence);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    }, [searchQuery]);

    const handleSearchTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleGoogleSearch = async () => {
        setSearchQuery(searchTerm);
        /* Reddit posts */
        setSearchTerm(searchTerm);
        const results = await searchReddit(searchTerm);
        setSearchResults(results);
        setShowConfidence(true);
        }

    return (
        <>
            <div className="home-container">
                <div className="nav-bar-container">
                    <h1>SCAM SEARCH</h1>
                    <ul>
                        <li>HOME</li>
                        <li>ABOUT</li>
                        <li>ARTICLES</li>
                    </ul>
                </div>
                <div className="search-bar-container">
                    <div className="search-bar">
                        <h1>Find out if it's a scam</h1>
                        <div className="search-bar-content">
                            <input type="text" value={searchTerm} onChange={handleSearchTermChange} />
                            <button onClick={handleGoogleSearch}>Search</button>
                        </div>
                    </div>
                </div>
            </div>
            <section>
                <div className="result-container">
                    {showConfidence && (
                        <div className="confidence-container">
                            <h1>Scam sentiment</h1>
                            <div className="confidence-thermometer">
                                <div className="thermometer-bar" style={{ height: '100%', width: `${confidencePercentage}%` }}></div>
                            </div>
                            <div className="confidence-text">
                                <h2>{confidencePercentage}% scammy</h2>
                                <span>This is obtained based on google search, more than 50% consider as a scam</span>
                            </div>
                        </div>
                    )}

                    {searchResults.map((post) => (
                        <div className="result-card" key={post.id}>
                            <div className = "result-card-information">
                                <h3>{post.title}</h3>
                                <p>{post.selftext?.split(' ').slice(0, 100).join(' ')}</p>
                                <a href={post.url} target="_blank" rel="noopener noreferrer">Read more</a>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}

export default Home
