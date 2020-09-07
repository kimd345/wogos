import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { postReview } from '../actions/games'
import { Form, Button, Container } from 'react-bootstrap'

const ReviewForm = props => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [rating, setRating] = useState(0)
  const user = useSelector(state => state.auth.user)
  const gameID = props.gameID


  const handleSubmit = e => {
    e.preventDefault()
    postReview({
      'user_id': user.id,
      'game_id': gameID,
      'title': title,
      'body': body,
      'star_rating': rating
    })
    setRating(1)
    setBody('')
    setTitle('')
    props.setNewReview(true)
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="reviewForm.ControlInput1">
          <Form.Label>Subject:</Form.Label>
          <Form.Control type="text" placeholder='Title' value={title} onChange={e => setTitle(e.target.value)}></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Game Rating:</Form.Label>
          <Form.Control as="select" value={rating} onChange={e => setRating(e.target.value)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="reviewForm.controlTextarea1">
          <Form.Label>Review:</Form.Label>
          <Form.Control as="textarea" rows="3" placeholder='Leave your review here!' value={body} onChange={e => setBody(e.target.value)}>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </Container>
  )
}

export default ReviewForm