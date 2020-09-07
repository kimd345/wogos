import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Container from 'react-bootstrap/Container';

function CollectionPage () {
  const collection = useSelector(state => Object.keys(state.collection));

  useEffect(() => {
    
  }, [])

  return (
    <Container>
      <div style={{ textAlign: "center" }}>
        <div style={{ marginTop: "100px" }} />
        <h1>Collection</h1>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {collection.map(item =>
          <div className="game-card" style={{ width: "200px" }}>
            <div className="game-card__pic"
              style={{
                backgroundImage: `url(${item.image_url})`,
                height: "140px"
              }} />
            <div className="game-card__title"
              style={{ fontWeight: "600" }}>
              {item.title}
            </div>
          </div>)}
      </div>
    </Container>
  )
}

export default CollectionPage;
