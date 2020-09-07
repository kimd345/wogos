import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import './Main.css'
import GameCard from './GameCard'
import topGames from './topGames'

function Main(props) {
    const urls = ['https://media.rawg.io/media/games/713/713269608dc8f2f40f5a670a14b2de94.jpg',
        'https://media.rawg.io/media/games/91c/91c4f377c1e09755b60a0102c5252843.jpg',
        'https://media.rawg.io/media/games/b4e/b4e4c73d5aa4ec66bbf75375c4847a2b.jpg'
    ]
    const [index, setIndex] = useState(0);

    const gameCards = Object.values(topGames).map((game) =>
        <GameCard key={game.id} game={game} />);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <>
            <div className="divider" />
            <Container>
                <i className="fa fa-thumb-tack" />
                <span style={{ marginLeft: "8px", fontWeight: "600" }}>
                    Highlights
            </span>
                <Carousel
                    activeIndex={index}
                    onSelect={handleSelect}
                    className="carousel">
                    <Carousel.Item className="carousel">
                        <img src={urls[0]} alt="featured game" />
                    </Carousel.Item>
                    <Carousel.Item className="carousel">
                        <img src={urls[1]} alt="featured game" />
                    </Carousel.Item>
                    <Carousel.Item className="carousel">
                        <img src={urls[2]} alt="featured game" />
                    </Carousel.Item>
                </Carousel>
            </Container>
            <br />
            <Container>
                <div>
                    <h1>Check out these hot titles!</h1>
                    <div className="main_top-games">
                        {gameCards}
                    </div>
                </div>
                <div>
                    <p>
                        Stop by the <span><a href="/games" color="blue">Store</a></span> for more titles!
                    </p>
                </div>
            </Container>
        </>
    )
}

export default Main;

