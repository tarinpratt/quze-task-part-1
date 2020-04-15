import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store from './store';


class SearchRating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchedRatings: ''  
        }
    }
      static defaultProps = {
        store: {
          catalogues: []
        }
      };

      searchRatings = e => {
        this.setState({ searchedRatings: e.target.value })
      };

      render() {
//search select for ratings
        const ratingList = store.catalogues.map((i, index, arr) => {
          return i.providerRatings;
        })
        const reducedRating = ratingList.reduce((unique, item) => {
          return unique.includes(item) ? unique : [...unique, item]
        }, []);
        const ratingsSorted = reducedRating.sort(); 
        ratingsSorted.pop();      
//filter functions
          const ratingFilter = store.catalogues.filter(ratings => ratings.providerRatings == this.state.searchedRatings).map((filteredRating, index) => (
            <ul key={index} className="filteredResults">
                <li>
                <img 
                src={filteredRating.imgUrl}
                alt="catalogue"
                className="responsive"
                />
                </li>
                <li>
                  <h2>{filteredRating.title}</h2>
                </li>
                <li>
               <Link to={`/catalogue/${filteredRating.courseId}`} className="moreDetailsLink">
                    <button className="moreDetailsButton">More Details</button>
               </Link>
             </li>
            </ul> ));       
    return (
        <div className="search">
          <h2>Ratings</h2>
          <select value={this.state.searchedRatings} onChange={this.searchRatings}>
          <option value="none">Select a Rating</option>
          {ratingsSorted.map((rating, index) => {
           return (
             <option key={index} value={rating}> {rating} </option>
            )
            })}
          </select>
        <section className="searchResults">{ratingFilter}</section>
        </div>
        )
    }
}
    export default SearchRating;