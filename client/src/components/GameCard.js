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
    // TODO CHECK IF IN USER LIBRARY
    const inLibrary = false;

    const handleButtonClick = e => {
        dispatch(addToCart(id))
    }

    return (
        <>
        <div className="game-card"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}>
            <div className={hovered ? "game-card__buyblock-button" : "game-card__buyblock-button hidden"}>
                <Button
                    disabled={inCart}
                    size="sm"
                    block
                    variant="success"
                    onClick={handleButtonClick}>
                        {inCart ? <i class="fa fa-check" /> : <i class="fa fa-cart-plus" /> }
                    </Button>
            </div>
            <div className={inCart ? "game-card__flag cart" : "game-card__flag cart hidden"}>
                {inCart ? <><i class="fa fa-shopping-cart" /><span>IN CART</span></> : ""}
            </div>
            <div className={inLibrary ? "game-card__flag library" : "game-card__flag library hidden"}>
                {inLibrary ? <><i class="fa fa-book" /><span>IN LIBRARY</span></> : ""}
            </div>
            <Link to={"/game/" + id}>
            <div className="game-card__pic" style={{ backgroundImage: `url(${image_url})` }}/>
            <div className="game-card__title">{title}</div>
            <div className={hovered ? "game-card__info-hovered" : "game-card__info"}>
                <div className={hovered ? "game-card__os hidden" : "game-card__os"}>
                    <i class="fa fa-windows"></i>
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
