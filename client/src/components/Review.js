import React from 'react'
import Rating from './Rating'
import './Review.css'

const Review = (review) => {
  const { id, title, body, star_rating, user } = review.props
  return (
    <div className="review_card_container">
      <div className="review_card_header_container">
        <p className="review_card_header_user">{user}</p>
      </div>
      <div className="review_card_body_container">
        <div className="review_card_body_titleRating_container">
          <Rating stars={star_rating} user={id} />
          <p className="review_card_body_title">{title}</p>
        </div>
        <p className="review_card_body_text">{body}</p>
      </div>
    </div>
  )
}

export default Review