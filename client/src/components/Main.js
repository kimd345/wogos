import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import { apiUrl } from '../config';

function Main (props) {
    const highlights = [
        { title: "test", image_url: "https://media.rawg.io/media/games/fd6/fd6a1eecd3ec0f875f1924f3656b7dd9.jpg" }
    ];

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    useEffect(() => {

    });

    return (
        <>
        <div className="divider" />
        <Container style={{marginTop: "10px"}}>
            <i className="fa fa-thumb-tack"/>
            <span style={{ marginLeft: "8px", fontWeight: "600" }}>
                Highlights
            </span>
            <Carousel
                nextIcon={<i aria-hidden="true" class="fa fa-chevron-circle-right" style={{ fontSize: "45px" }}/>}
                prevIcon={<i aria-hidden="true" class="fa fa-chevron-circle-left " style={{ fontSize: "45px" }}/>}
                activeIndex={index}
                onSelect={handleSelect}
                className="carousel">
                {highlights.map(highlight =>
                    <Carousel.Item style={{ margin: "10px 0px"}}>
                        <div style={{ backgroundImage: `url(${highlight.image_url})`, height: "480px", borderRadius: "3px"}}>
                        </div>
                        <Carousel.Caption>
                            {highlight.title}
                        </Carousel.Caption>
                    </Carousel.Item>
                )}
            </Carousel>
        </Container>
        </>
    )
}

export default Main;

