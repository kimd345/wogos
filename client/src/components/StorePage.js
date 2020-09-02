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

    const gameCards = games.map((game) => 
        <GameCard key={game.id} game={game} />);

    return (
        <>
        <div className="divider"></div>
        <Container>
            <div>
                SEARCH BAR
            </div>
            <div>
                tabs
            </div>
            <div className="store-container">
                <div className="store-container__left">
                    <span>Price</span>
                    <ul>
                        <li><input type="checkbox"></input>over $1</li>
                        <li><input type="checkbox"></input>over $1</li>
                        <li><input type="checkbox"></input>over $1</li>
                        <li><input type="checkbox"></input>over $1</li>
                        <li><input type="checkbox"></input>over $1</li>
                    </ul>
                    <br />
                    <span>Features</span>
                    <ul>
                        <li><input type="checkbox"></input>achievements</li>
                        <li><input type="checkbox"></input>achievements</li>
                        <li><input type="checkbox"></input>achievements</li>
                        <li><input type="checkbox"></input>achievements</li>
                        <li><input type="checkbox"></input>achievements</li>
                    </ul>
                </div>
                <div className="store-container__right">
                    {gameCards}
                </div>
            </div>
        </Container>
        </>
    )
}

export default StorePage;
