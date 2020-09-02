import React, { useState } from 'react';
import { Link } from 'react-router-dom'

import { addToCart } from '../actions/cart';
import { useDispatch, useSelector } from 'react-redux';

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});
// formatter.format(2500); /* $2,500.00 */

function GameCard ({ game }) {
    const dispatch = useDispatch();

    const [hovered, setHovered] = useState(false);

    const { id, title, price, sale, image_url } = game;

    const cart = useSelector(state => state.cart.cart);

    const handleButtonClick = e => {
        dispatch(addToCart(id))
    }

    return (
        <>
        <Link to={"/game/" + id}>
        <div className="game-card"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}>
                <div className="game-card__pic" style={{ backgroundImage: `url(${image_url})` }}>
            </div>
            <div className="game-card__title">{title}</div>
            <div className={hovered ? "game-card__info-hovered" : "game-card__info"}>
                <div className={hovered ? "game-card__os hidden" : "game-card__os"}>windows icon</div>
                <div className="game-card__buyblock">
                    <div className="game-card__buyblock-price">
                        {sale
                            ?
                            <div className="game-card__pricetag--sale">
                            <span className="game-card__saletag">-{sale}%</span>
                            <div className="game-card__pricetag">
                                <div>
                                    <span><strike>${price}</strike></span><br />
                                    <span>{formatter.format(price - price * (sale / 100))}</span>
                                </div>
                            </div>
                            </div>
                            :
                            <div className="game-card__pricetag">
                                <span>${price}</span>
                            </div>}
                    </div>
                    <div className={hovered ? "game-card__buyblock-button" : "game-card__buyblock-button hidden"}>
                        <button onClick={handleButtonClick}>cart icon</button>
                    </div>
                </div>
            </div>
        </div>
        </Link>
        </>
    )
}

export default GameCard;
