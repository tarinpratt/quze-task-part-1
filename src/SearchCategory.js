import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store from './store';


class SearchCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchedCategories: ''    
        }
    }   
      static defaultProps = {
        store: {
          catalogues: []
        }
      };

      searchCategories = e => {
        this.setState({ searchedCategories: e.target.value })
      };

      render() {
//search select for categories
        const list = store.catalogues.map((i, index, arr) => {
          return i.quzeCategory;
        })
        const reduced = list.reduce((unique, item) => {
          return unique.includes(item) ? unique : [...unique, item]
        }, []);
        const categoriesSorted = reduced.sort();
//filter function
          const categoryFilter = store.catalogues.filter(categories => categories.quzeCategory == this.state.searchedCategories).map((filteredCategory, index) => (
            <ul key={index} className="filteredResults">
                <li>
                <img 
                src={filteredCategory.imgUrl}
                alt="catalogue"
                className="responsive"
                />
                </li>
                <li>
                  <h2>{filteredCategory.title}</h2>
                </li>
                <li>
               <Link to={`/catalogue/${filteredCategory.courseId}`}>
                    <button className="moreDetailsButton">More Details</button>
               </Link>
             </li>
            </ul> )); 
            
    return(
        <div className="search">
          <h2>Categories</h2>
          <select value={this.state.searchedCategories} onChange={this.searchCategories}>
          {categoriesSorted.map((category, index) => {
           return (
             <option key={index} value={category}> {category} </option>
           )
         })}
          </select>
        <section className="searchResults">{categoryFilter}</section>
        </div>
    )
    }
}
    export default SearchCategory;