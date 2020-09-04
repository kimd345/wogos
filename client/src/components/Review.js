import React from 'react'

const Review = (review) => {
  const { title, body, star_rating, user } = review.props
  return (
    <>
      <div>
        <div>
          <h1>{title}</h1>
          <p>By: {user}</p>
        </div>
        <div>
          <p>{body}</p>
        </div>
        <p>Rating: {star_rating} out of 5 Stars</p>
      </div>
    </>
  )
}

export default Review