import React from 'react';
import './Search.css';

import { apiUrl } from '../config'

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: {},
      loading: false,
      message: '',
    };
  }

  fetchSearchResults = async (query) => {
    const response = await fetch(`${apiUrl}/games/search=${query}`);
    if (response.ok) {
      const responseData = await response.json();
      console.warn(responseData)
    }
  };

  handleOnInputChange = e => {
    const query = e.target.value;
    this.setState( { query: query, loading: true, message: '' }, () => {
      this.fetchSearchResults(query);
    });
  };

  render() {
    const { query } = this.state;
    return (
      <div className="container">
        {/*Search Input*/}
        <label className="search-label" htmlFor="search-input">
          <i className="fa fa-search search-icon" />
          <input
            type="text"
            name="query"
            value={query}
            id="search-input"
            placeholder="Search..."
            onChange={this.handleOnInputChange}
          />
        </label>

      </div>
    )
  }
}

export default Search;