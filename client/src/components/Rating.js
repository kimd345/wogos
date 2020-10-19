import React from 'react'

const Rating = props => {
  let count = 0
  const stars = props.stars
  const keyU = props.user
  const arr = []
  while (count < stars) {
    arr.push('\u2605')
    count++
  }
  if (count === stars && count < 5) {
    while (count < 5) {
      arr.push('\u2606')
      count++
    }
  }
  return (
    <div className="review_card_header_rating">{arr.map(el => <span key={keyU}>{el}</span>)}</div>
  )
}

export default Rating