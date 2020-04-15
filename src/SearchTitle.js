import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import store from './store';


class SearchTitle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchedTitle: ''  
        }
    }   
      static defaultProps = {
        store: {
          catalogues: []
        }
      };
    
      searchTitle = e => {
        this.setState({ searchedTitle: e.target.value })
      };

      render() {
//search select for titles
        const titleList = store.catalogues.map((i, index, arr) => {
          return i.title;
        })
        const reducedTitle = titleList.reduce((unique, item) => {
          return unique.includes(item) ? unique : [...unique, item]
        }, []);
        const titlesSorted = reducedTitle.sort();
    
   //filter functions
        const titleFilter = store.catalogues.filter(titles => titles.title === this.state.searchedTitle).map((filteredTitle, index) => (
          <ul key={index} className="filteredResults">
              <li>
                <img 
                src={filteredTitle.imgUrl}
                alt="catalogue"
                className="responsive"
                />
              </li>
             <li>
               <h2>{filteredTitle.title}</h2>
             </li>
             <li>
               <Link to={`/catalogue/${filteredTitle.courseId}`}>
                   <button className="moreDetailsButton">More Details</button>
               </Link>
             </li>
           </ul> ));           
    return (
        <div className="search">
        <h2>Titles</h2>
          <select className="searchTitleSelect" value={this.state.searchedTitle} onChange={this.searchTitle}>
          <option value="none">Select a Title</option>
          {titlesSorted.map((title, index) => {
           return (
             <option key={index} value={title}> {title} </option>
           )
         })}
          </select>
        <section className="searchResults">{titleFilter}</section>
        </div>
        )
    }
}
    export default SearchTitle;