import React, { useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'

function Main (props) {
    const urls = ['https://media.rawg.io/media/games/713/713269608dc8f2f40f5a670a14b2de94.jpg',
        'https://media.rawg.io/media/games/91c/91c4f377c1e09755b60a0102c5252843.jpg',
        'https://media.rawg.io/media/games/b4e/b4e4c73d5aa4ec66bbf75375c4847a2b.jpg'
        ]
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <>
        <div className="divider" />
        <Container>
        <span>⭐️ Highlights</span>
            <Carousel
                activeIndex={index}
                onSelect={handleSelect}
                className="carousel">
                <Carousel.Item className="carousel">
                    <img src={urls[0]} />
                </Carousel.Item>
                <Carousel.Item className="carousel">
                    <img src={urls[1]} />
                </Carousel.Item>
                <Carousel.Item className="carousel">
                    <img src={urls[2]} />
                </Carousel.Item>
            </Carousel>
        </Container>
        </>
    )
}

export default Main;

