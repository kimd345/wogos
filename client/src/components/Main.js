import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import './Main.css'
import GameCard from './GameCard'
import topGames from './topGames'

import { apiUrl, formatter } from '../config';
import { useSelector } from 'react-redux';

function Main(props) {
    const [index, setIndex] = useState(0);
    const [carousel, setCarousel] = useState([]);

    const collection = useSelector(state => state.collection)
    const cart = useSelector(state => state.cart.items)

    const gameCards = Object.values(topGames).map((game) =>
        <GameCard key={game.id} game={game} />);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`${apiUrl}/games/ids=21,20,30,12,23`);
            const responseData = await response.json();
            setCarousel(responseData.games);
        }
        fetchData();
    }, []);

    return (
        <>
            <div className="divider" />
            <Container style={{ paddingTop: "10px" }}>
                <i className="fa fa-thumb-tack" />
                <span style={{ marginLeft: "8px", fontWeight: "600"}}>
                    Highlights
                </span>
                <Carousel
                    interval="4000"
                    fade="true"
                    activeIndex={index}
                    onSelect={handleSelect}
                    className="carousel">
                    {carousel.map(item =>
                        <Carousel.Item className="carousel">
                            <div style={{
                                background: "linear-gradient(0deg, rgba(0,0,0,0.34637605042016806) 0%, rgba(126,126,126,0) 50%)",
                                position: "absolute",
                                width: "100%",
                                height: "480px"}}/>
                            <div className="carousel-info">
                                <div className="carousel-info__title">
                                    {item.title}
                                </div>
                                <div style={{display: "flex"}}>
                                    <span style={{
                                        fontSize: "24px",
                                        fontWeight: "600",
                                        padding: "10px",
                                        borderRadius: "5px",
                                        backgroundColor: "purple",
                                        color: "white",
                                    }}>{item.sale ? `-${item.sale}%` : null}</span>
                                    <h2 style={{ fontWeight: "600", alignSelf: "center", margin: "0px 20px" }}>
                                        {formatter.format(item.price - item.price * (item.sale / 100))}
                                    </h2>
                                    <Button
                                        variant="success">
                                        <Link to={`game/${item.id}`} style={{ color: "white"}}>
                                            Go to game page
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                            <div style={{ backgroundImage: `url(${item.image_url})`, height: "480px" }}>
                            </div>
                        </Carousel.Item>)}
                </Carousel>
            </Container>
            <br />
            <Container>
                <div>
                    <i className="fa fa-fire" />
                    <span style={{ marginLeft: "8px", fontWeight: "600"}}>
                        Check out these hot titles!
                    </span>
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

