import React from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import { FactsData } from 'src/Setup/Data';
import './styles.scss';

export default function Facts() {

    return (
        <section>
            <h2 style={{ textAlign: 'center' }}>Some Interesting Facts About Denmark</h2>            

                <div className="factsWrapper">
                    <Carousel emulateTouch={true} showThumbs={false} infiniteLoop={true}>
                        {
                            FactsData.map((data, index) => (

                                <Fact key={index} {...data} />

                            ))
                        }
                    </Carousel>
                </div>
            

        </section>
    );
}

const Fact = (props) => {
    
    return (
        <div>
            <img src={props.pic} alt={props.description} />
            <h3>{props.description}</h3>
        </div>
    );
}