import React from 'react'
import { Card } from 'react-bootstrap'

const Review = (review) => {
  const { title, body, star_rating, user } = review.props
  return (
    <Card>
      <Card.Header as="h5">{star_rating} out of 5 Stars!</Card.Header>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{body}</Card.Text>
        <footer className="blockquote-footer">{user}</footer>
      </Card.Body>
    </Card>
  )
}

export default Review