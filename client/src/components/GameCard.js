import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

import Button from 'react-bootstrap/Button';

import { addToCart } from '../actions/cart';

import { formatter } from '../config';

function GameCard ({ game }) {
    const dispatch = useDispatch();

    const [hovered, setHovered] = useState(false);

    const { id, title, price, sale, image_url } = game;
    const inCart = useSelector(state => state.cart.items[id] !== undefined);

    const handleButtonClick = e => {
        dispatch(addToCart(id))
    }

    return (
        <>
        <div className="game-card"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className={hovered ? "game-card__buyblock-button" : "game-card__buyblock-button hidden"}>
                <Button
                    disabled={inCart}
                    size="sm"
                    variant="success"
                    onClick={handleButtonClick}>
                        {inCart ? "✓" : "✚"}
                    </Button>
            </div>
            <div className={inCart ? "game-card__flag cart" : "game-card__flag cart hidden"}>
                {inCart ? "IN CART" : ""}
            </div>
            <Link to={"/game/" + id}>
            <div className="game-card__pic" style={{ backgroundImage: `url(${image_url})` }}/>
            <div className="game-card__title">{title}</div>
            <div className={hovered ? "game-card__info-hovered" : "game-card__info"}>
                <div className={hovered ? "game-card__os hidden" : "game-card__os"}>
                    W
                </div>
                <div className="game-card__buyblock">
                    <div className="game-card__buyblock-price"
                        style={hovered ? { marginRight: "30px" } : {}}>
                        {sale
                            ?
                            <div className="game-card__pricetag--sale">
                            <span className="game-card__saletag">-{sale}%</span>
                            <div className="game-card__pricetag">
                                <div>
                                    <span className="original-price"><strike>${price}</strike></span><br />
                                    <span>{formatter.format(price - price * (sale / 100))}</span>
                                </div>
                            </div>
                            </div>
                            :
                            <div className="game-card__pricetag">
                                <span>${price}</span>
                            </div>}
                    </div>
                    
                </div>
            </div>
        </Link>
        </div>
        </>
    )
}

export default GameCard;
