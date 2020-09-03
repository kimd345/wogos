import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Pagination from 'react-bootstrap/Pagination'

import GameCard from './GameCard'

import { loadGamesPage } from '../actions/games'

function StorePage (props) {
    const [pageNum, setPageNum] = useState(0);
    const games = useSelector(state => state.games.current_games)
    const dispatch = useDispatch();

    useEffect(() => {
        window.scroll({top: 0, left: 0, behavior: "smooth"});
        dispatch(loadGamesPage(pageNum))
    }, [dispatch, pageNum])

    const gameCards = Object.values(games).map((game) => 
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
                    <Pagination className="store__pagination">
                        <Pagination.Item onClick={() => setPageNum(0)}>default page</Pagination.Item>
                        <Pagination.Item onClick={() => setPageNum(1)}>page 2</Pagination.Item>
                    </Pagination>
                </div>
            </div>
        </Container>
        </>
    )
}

export default StorePage;
