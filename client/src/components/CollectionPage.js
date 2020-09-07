import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { apiUrl } from '../config';

import Container from 'react-bootstrap/Container';

function CollectionPage () {
  const collectionIds = useSelector(state => Object.keys(state.collection));
  const [collection, setCollection] = useState([]);

  useEffect(() => {
    async function fetchData() {
      console.log(`${apiUrl}/games/ids=${collectionIds.join(",")}`)
      const response = await fetch(`${apiUrl}/games/ids=${collectionIds.join(",")}`);
      const responseData = await response.json();
      setCollection(responseData.games);
    }
    fetchData();
  }, [])

  return (
    <Container>
      <div style={{ textAlign: "center" }}>
        <div style={{ marginTop: "100px" }} />
        <h4>Your Collection</h4>
      </div>
      <div className="divider"></div>
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
