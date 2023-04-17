
import { useEffect, useState } from 'react';
import ABOUT_CARDS from '../arrayData/aboutCards';
import { aboutCardsInterface } from '../interfaces/aboutCardsInterface';
import '../pages/About.css'




function About() {

    const [cards, setCards] = useState<aboutCardsInterface[]>([])


    useEffect(() => {
        setCards(ABOUT_CARDS)
    }, []);


    return (
        <div className="about-container">
            <div className="cards-container">
                {
                    cards.map(card => {
                        return (
                            <div className="card" key={card.id}>
                                <div className="card-information">
                                    <h2>{card.title}</h2>
                                    <p>{card.description}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default About;