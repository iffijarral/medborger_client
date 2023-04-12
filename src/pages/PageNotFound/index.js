import React from 'react';
import { Link } from 'react-router-dom';
import PageNotFoundImg from 'src/Setup/Assets/Images/Page-Not-Found.jpeg';

const PageNotFound = () => {
    return (
        <section>
            <img src={PageNotFoundImg} />
            <p style={{ textAlign: "center" }}>
                <Link to="/">Go to Home </Link>
            </p>
        </section>
    )
}
export default PageNotFound;