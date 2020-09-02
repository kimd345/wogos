import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { addToCart } from '../actions/cart';
import { useDispatch } from 'react-redux';

function GameCard ({ id, title, price }) {
    const [hovered, setHovered] = useState(false);
    const dispatch = useDispatch();

    const handleButtonClick = e => {
        dispatch(addToCart(id))
    }

    return (
        <Link to={"/game/" + id}>
        <div className="game-card"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}>
            <div className="game-card__pic">
                
            </div>
            <div className="game-card__title">{title}</div>
            <div className={hovered ? "game-card__info-hovered" : "game-card__info"}>
                <div className={hovered ? "game-card__os hidden" : "game-card__os"}>windows icon</div>
                <div className="game-card__buyblock">
                    <div className="game-card__buyblock-price">
                        $ {price}
                    </div>
                    <div className={hovered ? "game-card__buyblock-button" : "game-card__buyblock-button hidden"}>
                        <button onClick={handleButtonClick}>cart icon</button>
                    </div>
                </div>
            </div>
        </div>
        </Link>
    )
}

export default GameCard;
