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
        console.log(results)
    }

    return (
        <>
            <div className="home-container">
                <div className="nav-bar-container">
                    <h1>SCAM?</h1>
                    <ul>
                        <li>HOME</li>
                        <li>ABOUT</li>
                        <li>ARTICLES</li>
                    </ul>
                </div>
                <div className="search-bar-container">
                    <div className="search-bar">
                        <h1>SEARCH TO FIND THE SCAM</h1>
                        <div className="search-bar-content">
                            <input type="text" value={searchTerm} onChange={handleSearchTermChange} />
                            <button onClick={handleGoogleSearch}>Search Google</button>
                        </div>
                    </div>
                </div>
            </div>
            <section>
                <div className="result-container">
                    <div className="cards-container">
                        <div className="card">
                            <h1>Sentiment</h1>
                            <div className="thermometer">
                                <p>Confidence percentage: {confidencePercentage}%</p>
                            </div>
                        </div>
                    </div>
                    <div className="tweets-newspapers">
                        {searchResults.map((post) => (
                            <div className="tweets-newspapers-grid">
                                <div className="tweets-newspaper-info" key={post.id}>
                                    <h3>{post.title}</h3>
                                    <p>{post.selftext?.split(' ').slice(0, 100).join(' ')}</p>
                                    <a href={post.url} target="_blank" rel="noopener noreferrer">Read more</a>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </section>
        </>
    )
}

export default Home
