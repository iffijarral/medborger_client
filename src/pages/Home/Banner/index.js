import React from 'react'
import { Link } from 'react-router-dom';
import './styles.scss'
//Material UI
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

export default function Banner() {
    return (
        <section>
            <div className='banner'>
                <h2>
                    Pass this exam, and come closer to your PR  <InsertEmoticonIcon sx={{ color: '#056aa8' }} />
                </h2>
                <Link to="/packages">START NOW</Link>
            </div>
        </section>
    );
}