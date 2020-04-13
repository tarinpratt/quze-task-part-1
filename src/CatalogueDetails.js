import React from 'react';
import store from './store';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { Link } from 'react-router-dom';

export default function CatalogueDetails(props) {   
    const courseId = props.match.params.courseId;
    const course = store.catalogues.find(courses =>
        courses.courseId == courseId
      );
   
    return (
        <div className="moreDetailsSection">
            <Link to="/" className="backLink"><button className="backButton"><FontAwesomeIcon icon={faArrowLeft} size="2x" className="arrow"/></button></Link>
            <img 
            src={course.imgUrl}
            alt="catalogue"
            className="responsive"
            />
            <h2>{course.title}</h2>
            <p>{course.shortDescription}</p>
            <a href={course.url} className="goToLink">Go to Course site</a>
            <p>Rated: {course.providerRatings}</p>
            <p>Level: {course.level}</p>
            <p>{course.programType}</p>
            <p>{course.quzeCategory}</p>          
        </div>
    )
}