import React from "react";
import { TestimonialData } from 'src/Setup/Data';

// carousel
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import './styles.scss';

export default function Testimonials() {

    return (
        <section className="testimonials">
            
            <h2 style={{ textAlign: 'center' }}>Testimonials</h2>
            <Carousel emulateTouch={true} showThumbs={false} infiniteLoop={true}>
                {
                    TestimonialData.map((data, index) => (

                        <Testimonial key={index} {...data} />


                    ))
                }

            </Carousel>
            
        </section>
    );
}

function Testimonial(props) {
    return (
        <> 
            
                <div className="testimonial">
                    <div className="picArea">
                        <img src={props.pic} alt="Person" />
                    </div>
                    <div>
                        <blockquote>" {props.comments}  " </blockquote>
                        <cite>- {props.name} </cite>
                    </div>
                </div>
           
        </>
    );
}