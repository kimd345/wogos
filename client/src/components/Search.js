import React from 'react';
import { Link } from 'react-router-dom';
import './Search.css';
import loader from '../assets/loader.gif'
import { apiUrl } from '../config'

class Search extends React.Component {
  constructor() {
    super();
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
              <Link key={result.id} onClick={this.deleteSearch} to={`/game/${result.id}`} className='result-item'>
                <div className='image-wrapper'>
                  <img className='result-image' src={result.image_url} alt='' />
                </div>
                <div className='result-text-container'>
                  <h6 className='result-title'>{result.title}</h6>
                  <h6 className='result-subtitle'>
                    {result.genres.slice(0,2).map(genreObj => {
                      return genreObj.genre
                    }).join(', ')}
                    {' | '}
                    {result.features.slice(0,2).map(featureObj => {
                      return featureObj.feature
                    }).join(', ')}
                  </h6>
                </div>
                <div className='result-price-container'>
                  <h6 className='result-price-label'>${result.price}</h6>
                </div>
              </Link>
            )
          })}
        </div>
      )
    }
  };

  deleteSearch = () => {
    this.setState({ query: '', results: {}, message: '' });
  };

  render() {
    const { query, loading, message } = this.state;
    return (
      <div className='container'>
        {/*Search Input*/}
        <label className='search-label' htmlFor='search-input'>
          <i className='fa fa-search search-icon' style={{marginRight: '10px'}} />
          <input
            type='text'
            name='query'
            value={query}
            id='search-input'
            placeholder=''
            onChange={this.handleOnInputChange}
          />
        </label>
        {/*Error Message*/}
          {message && <p className='message'>{message}</p>}
        {/*Loader*/}
        <img src={loader} className={`search-loading ${ loading ? 'show' : 'hide'}`} alt='' style={{}} />
        {/*Results*/}
          { this.renderSearchResults()}
      </div>
    )
  }
}

export default Search;