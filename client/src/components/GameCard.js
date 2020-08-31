import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function GameCard (props) {
    const [hovered, setHovered] = useState(false);

    return (
        <Link>
        <div className="game-card"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}>
            <div className="game-card__pic">
                
            </div>
            <div className="game-card__title">Divinity: Original Sin 2 - Definitive Edition</div>
            <div className={hovered ? "game-card__info-hovered" : "game-card__info"}>
                <div className={hovered ? "game-card__os hidden" : "game-card__os"}>🖥</div>
                <div className="game-card__buyblock">
                    <div className="game-card__buyblock-price">
                        $9.99
                    </div>
                    <div className={hovered ? "game-card__buyblock-button" : "game-card__buyblock-button hidden"}>
                        <button>🛒</button>
                    </div>
                </div>
            </div>
        </div>
        </Link>
    )
}

export default GameCard;
