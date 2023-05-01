import React from 'react'
import { Link } from 'react-router-dom';
import './Category.css';

function CategoryBox(props) {
    const abc = `/category/${props.title}`;

    return (

        <div className="CategoryCard">
            <div className="Categorycontent">
                <h2 className="title">{props.title.toUpperCase()}</h2>
                <p className="copy">{props.content}</p>
                <Link to={abc}>
                    <button className="btn">
                        SHOP NOW
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default CategoryBox