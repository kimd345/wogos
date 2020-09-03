import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Pagination from 'react-bootstrap/Pagination'

import GameCard from './GameCard'

import { loadDefaultGames, loadGamesPage } from '../actions/games'

function StorePage(props) {
    const [pageNum, setPageNum] = useState(0);
    const [features, setFeatures] = useState([])
    const [genres, setGenres] = useState([])
    const games = useSelector(state => state.games.current_games)
    const dispatch = useDispatch();

    const handleFeatureChange = e => {
        const checkBox = e.currentTarget
        const newFeatures = checkBox.checked ? features.concat([checkBox.value]) : features.filter(el => el !== checkBox.value)
        setFeatures(newFeatures)
    }

    const handleGenreChange = e => {
        const checkBox = e.currentTarget
        const newGenres = checkBox.checked ? genres.concat([checkBox.value]) : genres.filter(el => el !== checkBox.value)
        setGenres(newGenres)
    }

    useEffect(() => {
        window.scroll({ top: 0, left: 0, behavior: "smooth" });
        dispatch(loadGamesPage(pageNum, features, genres))
    }, [pageNum, features, genres])

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
                        <br />
                        <span>Genre</span>
                        <ul>
                            <li><input type="checkbox" onChange={handleGenreChange} value='action'></input> Action</li>
                            <li><input type="checkbox" onChange={handleGenreChange} value='shooter'></input> Shooter</li>
                            <li><input type="checkbox" onChange={handleGenreChange} value='indie'></input> Indie</li>
                            <li><input type="checkbox" onChange={handleGenreChange} value='strategy'></input> Strategy</li>
                            <li><input type="checkbox" onChange={handleGenreChange} value='casual'></input> Casual</li>
                            <li><input type="checkbox" onChange={handleGenreChange} value='massively multiplayer'></input> Massively Multiplayer</li>
                            <li><input type="checkbox" onChange={handleGenreChange} value='racing'></input> Racing</li>
                            <li><input type="checkbox" onChange={handleGenreChange} value='rpg'></input> RPG</li>
                            <li><input type="checkbox" onChange={handleGenreChange} value='simulation'></input> Simulation</li>
                            <li><input type="checkbox" onChange={handleGenreChange} value='sports'></input> Sports</li>
                            <li><input type="checkbox" onChange={handleGenreChange} value='platformer'></input> Platformer</li>
                            <li><input type="checkbox" onChange={handleGenreChange} value='puzzle'></input> Puzzle</li>
                            <li><input type="checkbox" onChange={handleGenreChange} value='arcade'></input> Arcade</li>
                            <li><input type="checkbox" onChange={handleGenreChange} value='board games'></input> Board Games</li>
                            <li><input type="checkbox" onChange={handleGenreChange} value='family'></input> Family</li>
                            <li><input type="checkbox" onChange={handleGenreChange} value='fighting'></input> Fighting</li>
                            <li><input type="checkbox" onChange={handleGenreChange} value='adventure'></input> Adventure</li>
                        </ul>
                        <br />
                        <span>Features</span>
                        <ul>
                            <li><input type="checkbox" onChange={handleFeatureChange} value='singleplayer'></input> Singleplayer</li>
                            <li><input type="checkbox" onChange={handleFeatureChange} value='multiplayer'></input> Multiplayer</li>
                            <li><input type="checkbox" onChange={handleFeatureChange} value='co-op'></input> Co-op</li>
                            <li><input type="checkbox" onChange={handleFeatureChange} value='steam-trading-cards'></input> Steam-Trading-Cards</li>
                            <li><input type="checkbox" onChange={handleFeatureChange} value='steam achievements'></input> Steam Achievements</li>
                            <li><input type="checkbox" onChange={handleFeatureChange} value='steam cloud'></input> Steam Cloud</li>
                            <li><input type="checkbox" onChange={handleFeatureChange} value='atmospheric'></input> Atmospheric</li>
                            <li><input type="checkbox" onChange={handleFeatureChange} value='full controller support'></input> Full Controller Support</li>
                            <li><input type="checkbox" onChange={handleFeatureChange} value='great soundtrack'></input> Great Soundtrack</li>
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
