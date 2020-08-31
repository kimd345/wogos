import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import GameCard from './GameCard'

function StorePage (props) {

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
                <GameCard />
                <GameCard />
                <GameCard />
                <GameCard />
                <GameCard />
                <GameCard />
                <GameCard />
                <GameCard />
                <GameCard />
            </div>
        </Container>
        </>
    )
}

export default StorePage;
