import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { postReview } from '../actions/games'

const ReviewForm = props => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [rating, setRating] = useState(0)
  const user = useSelector(state => state.auth.user)
  const gameID = props.gameID


  const handleSubmit = e => {
    e.preventDefault()
    console.log(user)
    postReview({
      'user_id': user.id,
      'game_id': gameID,
      'title': title,
      'body': body,
      'star_rating': rating
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder='Title' value={title} onChange={e => setTitle(e.target.value)}></input>
      <input type='text' placeholder='Body' value={body} onChange={e => setBody(e.target.value)}></input>
      <select placeholder="Rating" value={rating} onChange={e => setRating(e.target.value)}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  )
}

export default ReviewForm