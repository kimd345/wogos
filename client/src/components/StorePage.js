import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Pagination from 'react-bootstrap/Pagination'

import GameCard from './GameCard'

import { loadDefaultGames, loadGamesPage } from '../actions/games'

function StorePage (props) {
    const [pageNum, setPageNum] = useState(0);
    const games = useSelector(state => state.games.current_games)
    const dispatch = useDispatch();

    useEffect(() => {
        if (pageNum === 0) dispatch(loadDefaultGames())
        else dispatch(loadGamesPage(pageNum))
    }, [pageNum])

    const gameCards = Object.values(games).map((game) => 
        <GameCard key={game.id} game={game} />);

    return (
        <>
        <div className="divider"></div>
        <Container>
            <div>
                {/* TODO: style and format, purely to test functionality */}
                control page #
                <Pagination>
                    <Pagination.Item onClick={() => setPageNum(0)}>default page</Pagination.Item>
                    <Pagination.Item onClick={() => setPageNum(1)}>page 2</Pagination.Item>
                </Pagination>
            </div>
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
