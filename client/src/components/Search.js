import React from 'react';
import { NavLink } from 'react-router-dom';
import './Search.css';
import loader from '../loader.gif'
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
    if (!query) return;
    const response = await fetch(`${apiUrl}/games/search=${query}`);
    if (response.ok) {
      const responseData = await response.json();
      console.warn(responseData)
      const resultNotFoundMsg = ! responseData.search_results.length
                              ? 'NO RESULTS FOUND. Try adjusting your search.'
                              : '';
      this.setState({ 
        results: responseData.search_results,
        message: resultNotFoundMsg,
        loading: false
      })
    }
  };

  handleOnInputChange = e => {
    const query = e.target.value;
    if (!query) {
      this.setState( { query, results: {}, message: '' } );
    } else {
      this.setState( { query: query, loading: true, message: '' }, () => {
        this.fetchSearchResults(query);
      });
    }
  };

  renderSearchResults = () => {
    const { results } = this.state;
    if (Object.keys(results).length && results.length) {
      return (
        <div className='results-container'>
          {results.map(result => {
            return (
              <NavLink key={result.id} to={`/game/${result.id}`} className='result-item'>
                {/* <div className='image-wrapper'>
                  <img className='result-image' src={result.image_url} alt='' />
                </div> */}
                <h6 className='result-title'>{result.title}</h6>
              </NavLink>
            )
          })}
        </div>
      )
    }
  };

  render() {
    const { query, loading, message } = this.state;
    return (
      <div className='container'>
        {/*Search Input*/}
        <label className='search-label' htmlFor='search-input'>
          <i className='fa fa-search search-icon' />
          <input
            type='text'
            name='query'
            value={query}
            id='search-input'
            placeholder='Search...'
            onChange={this.handleOnInputChange}
          />
        </label>
        {/*Error Message*/}
          {message && <p className='message'>{message}</p>}
        {/*Loader*/}
        <img src={loader} className={`search-loading ${ loading ? 'show' : 'hide'}`} alt='' />
        {/*Results*/}
          { this.renderSearchResults()}
      </div>
    )
  }
}

export default Search;