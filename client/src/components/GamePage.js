import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';

import Review from './Review'
import ReviewForm from './ReviewForm'

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'

import { addToCart } from '../actions/cart';

import { apiUrl, formatter } from '../config'

function GamePage() {
  const dispatch = useDispatch();
  const gameId = useParams().id;
  const [game, setGame] = useState({});
  const [newReview, setNewReview] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const user = useSelector(state => state.auth.user)
  const inCart = useSelector(state => state.cart.items[gameId] !== undefined);
  const inCollection = useSelector(state => state.collection[gameId] !== undefined)
  const reviewed = game.reviews ? game.reviews.filter(el => parseInt(el.user_id, 10) === user.id).length > 0 : false

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${apiUrl}/games/${gameId}`);
      if (response.ok) {
        const responseData = await response.json();
        setGame(responseData);
      }
      setLoaded(true);
    }
    fetchData();
  }, [gameId, newReview])

  if (!loaded) {
    return null;
  }

  return (
    <>
      <Container style={{ position: "relative" }}>
        <div className="game-page__buy-block">
          <div>
            {game.sale &&
            <span style={{
              fontSize: "24px",
              fontWeight: "600",
              padding: "10px",
              borderRadius: "5px",
              backgroundColor: "purple",
              color: "white",
              position: "absolute"
            }}>-{game.sale}%</span>}
            <div style={{ textAlign: "right" }}>
              <div><strike>{game.sale ? `$${game.price}` : <br/>}</strike></div>
              <h2 style={{ fontWeight: "600" }}>{formatter.format(game.price - game.price * (game.sale / 100))}</h2>
            </div>
          </div>
          {inCart
            ? <Button
              disabled={inCollection}
              variant="success"
              style={{ height: "65px" }}
              block>
              <Link to="/checkout" style={{ color: "white" }}>
                <i className="fa fa-shopping-cart" /> Check out now
              </Link>
            </Button>
            : <Button
              disabled={inCollection}
              variant="success"
              style={{ height: "65px" }}
              block
              onClick={() => dispatch(addToCart(gameId))}>
              {inCollection
                ? "This game is already in your collection."
                : <><i className="fa fa-cart-plus" /><span> Add to cart</span></>}
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
            <br />
            <div className="details__features">
              <span>Game Features:</span>
              <ul>
                {game.features ? game.features.map(ele => <li>{ele.feature}</li>) : null}
              </ul>
            </div>
          </div>
        </div>
        <div className="game-page__info reviews">
          <h6>User reviews</h6>
          {game.reviews ? game.reviews.map(review => <Review key={review.id} props={review} />) : null}
        </div>
        <div className="game-page__info reviews-form">
          {inCollection && !reviewed ? <ReviewForm setNewReview={setNewReview} gameID={game.id} /> : reviewed ? 'You have already reviewed this game!' : 'You must own this game to leave a review.'}
        </div>
      </Container>
    </>
  )
}

export default GamePage;
