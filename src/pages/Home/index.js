import React, { Fragment } from 'react'
import Hero from 'src/pages/Home/Hero'
import Info from 'src/pages/Home/Info'
import Blocks from 'src/pages/Home/Blocks'
import Facts from 'src/pages/Home/Facts'
import Testimonials from 'src/pages/Home/Testimonials'
import Banner from 'src/pages/Home/Banner'

const Home = () => {
    
    return (
        <Fragment>
            <Hero />
            <Info />
            <Blocks />
            <Facts />
            <Testimonials />
            <Banner />
        </Fragment>
    )
}

export default Home