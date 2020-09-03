import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

import { addToCart } from '../actions/cart';

import { apiUrl, formatter } from '../config'

function GamePage (props) {
  const dispatch = useDispatch();
  const gameId = useParams().id;
  const [game, setGame] = useState({});

  const inCart = useSelector(state => state.cart.items[gameId] != undefined);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${apiUrl}/games/${gameId}`);
      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData)
        setGame(responseData);
      }
    }
    fetchData();
  }, [])

  return (
    <>
      <Container>
        <div className="game-page__buy-block">
          {game.sale ? `-${game.sale}%` : null}
          <div>
            <span><strike>${game.price}</strike></span>
            <h2>{formatter.format(game.price - game.price * (game.sale / 100))}</h2>
          </div>
          {inCart
            ? <Button
              variant="success"
              block>
              <Link to="/checkout">
                Check out now
              </Link>
            </Button>
            : <Button
              variant="success"
              block
              onClick={() => dispatch(addToCart(gameId))}>
              Add to cart
          </Button>
          }
        </div>
      </Container>
      <div className="game-page__banner" style={{ backgroundImage: `url(${game.image_url})` }}></div>
      <Container className="game-page__info">
        <div className="game-page__info title">
          <h1>{game.title}</h1>
        </div>
        <div className="game-page__info desc-details">
          <div className="game-page__info description">
            <h6>Description</h6>
            <p>{game.description}</p>
            <h6>Requirements</h6>
            <p>{game.requirements}</p>
          </div>
          <div className="game-page__info details">
            <h6>Game Details</h6>
            <div className="details__genres">
              <span>Genre:</span>
              <ul>
                {game.genres ? game.genres.map(ele => <li>{ele.genre}</li>) : null}
              </ul>
            </div>
            <br/>
            <div className="details__features">
              <span>Game Features:</span>
              <ul>
                {game.features ? game.features.map(ele => <li>{ele.feature}</li>) : null}
              </ul>
            </div>
          </div>
        </div>
        <div className="game-page__info reviews">
          <h6>Reviews</h6>
        </div>
      </Container>
    </>
  )
}

export default GamePage;
