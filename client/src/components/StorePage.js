import React, { useState, useEffect } from 'react';

import { apiUrl } from '../config'

import Container from 'react-bootstrap/Container';

import GameCard from './GameCard'

function StorePage (props) {
    const [games, setGames] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(apiUrl + '/games');
            const responseData = await response.json();
            setGames(responseData.games)
        }
        fetchData();
    }, []);

    const gameCards = games.map((game) => <GameCard key={game.id} title={game.title} price={game.price} />);

    return (
        <>
        <div className="divider"></div>
        <Container>
            SEARCH BAR
        </Container>
        <Container className="store-container">
            <div className="store-contianer__left">
                Filters
            </div>
            <div className="store-container__right">
                {gameCards}
            </div>
        </Container>
        </>
    )
}

export default StorePage;
