import React from 'react';
import { Link } from 'react-router-dom';
import 'src/pages/Home/Hero/styles.scss';

const Hero = () => { 
    return (
        <div className="HeaderSection">
            <div className="hero">
                
                <div className="item">
                    <p className="subhead">Success Rate 99.999% !!!</p>
                    <h1>The Best Platform For The Preparation Of Medborgerskabsprøve</h1>

                    <Link to="/packages">Get Started</Link>
                </div> 

                <div className="rightSection">
                    <div className="square">
                        <ul>
                            <li>Comprehensive</li>
                            <li>Up to date</li>
                            <li>Cheapest</li>
                            <li>Secure</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;