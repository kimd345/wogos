import React from 'react';

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'


function GamePage (props) {

  return (
    <>
      <Container>
        <div className="game-page__buy-block">
          <h2>$29.99</h2>
          <Button variant="success" block>Add to cart</Button>
          <Button variant="link" block>Wishlist it</Button>
        </div>
      </Container>
      <div className="game-page__banner">black gradient</div>
      <Container className="game-page__info">
        <div className="game-page__info title">
          <h1>TITLE</h1>
        </div>
        <div className="game-page__info screenshots">
          game screenshots
        </div>
        <div className="game-page__info desc-details">
          <div className="game-page__info description">
            game description
            <p>:-)</p>
            <p>:-)</p>
            <p>:-)</p>
            <p>:-)</p>
            <p>:-)</p>
          </div>
          <div className="game-page__info details">
            game details
          </div>
        </div>
        <div className="game-page__info reviews">
          reviews
        </div>
      </Container>
    </>
  )
}

export default GamePage;
