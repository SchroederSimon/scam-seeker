import { useEffect, useState } from 'react';
import '../pages/Home.css'
import { searchGoogle, searchReddit } from '../apiCalls';



function Home() {

    const [searchTerm, setSearchTerm] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [confidencePercentage, setConfidencePercentage] = useState<number | null>(null);
    
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

    const handleGoogleSearch = () => {
        setSearchQuery(searchTerm);
        searchReddit(searchTerm);
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
                        <div className="tweets-newspapers-grid">
                            <div className="tweets-newspaper-info">
                                <img src="/vite.svg" alt="" />
                                <div className="tweets-newspaper-description">
                                    <h1>Juan Carlos</h1>
                                    <p>No se unan a inter-gold parece ser una estafa piramidal
                                        estan involucrados personajes que ya estuvieron en otra
                                        llamada Generacion Zoe
                                    </p>
                                </div>
                            </div>
                            <div className="tweets-newspaper-info">
                                <p>El tuit del que sea</p>
                            </div>
                            <div className="tweets-newspaper-info">
                                <p>Noticia</p>
                            </div>
                            <div className="tweets-newspaper-info">
                                <p>Noticia</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Home
