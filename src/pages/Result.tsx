import { useEffect, useState } from 'react';
import { searchGoogle } from '../apiCalls';
import '../pages/Result.css'

function Result() {
    const [confidencePercentage, setConfidencePercentage] = useState<number | null>(null);

    useEffect(() => {
        searchGoogle('example keywords')
            .then((confidence) => {
                setConfidencePercentage(confidence);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div className="result-container">
            <div className="cards-container">
                <div className="card">
                    <h1>Sentiment</h1>
                    <div className="thermometer">
                        {confidencePercentage !== null && <p>Confidence percentage: {confidencePercentage}%</p>}
                    </div>
                    <p></p>
                </div>
                <div className="card">
                    <h1>Last sentiments</h1>
                    <div className="card-information">
                        <div className="square-card"></div>
                        <p>January 20%</p>
                    </div>
                </div>
                <div className="card">
                    <h1>Next update</h1>
                    <div className="card-information">
                        <p>The next update will be in X time</p>
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
    )
}

export default Result;