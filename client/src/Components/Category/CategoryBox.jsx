
import React from 'react'
import { Link } from 'react-router-dom';
import './Category.css';
// import AOS from 'aos'
// import 'aos/dist/aos.css'

function CategoryBox(props) {
    // useEffect(() => {
    //     AOS.init({
    //         duration: 1000,
    //         easing: 'ease-in-out',
    //         once: true
    //     })
    // }, [])
    const abc = `/category/${props.title}`;
    return (

        <div className="CategoryCard">
            <div className="Categorycontent">
                <h2 className="title">{props.title}</h2>
                <p className="copy">{props.content}</p>
                {/* <button className="btn">Shop Now</button> */}
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