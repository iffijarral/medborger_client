import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
// Material UI components
import Box from '@mui/material/Box';

//Moble Menu
import MobileMenu from '../MobileMenu';

export default function MobileNav(props) {
    return (
        <Fragment>
            <MobileMenu {...props} />
            
            <Box sx={{ flexGrow: 1, display: { sm: 'flex', md: 'none' } }}>
              <Link className="logo" to="/">Medborgerskabs<span>Prøve</span></Link>
            </Box>
        </Fragment>
    )
}
