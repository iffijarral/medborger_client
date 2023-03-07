import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
// Material UI components
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';

import MenuIcon from '@mui/icons-material/Menu';

import { MenuPages } from 'src/Setup/Data';

function MobileMenu(props) {
    const [anchorElNav, setAnchorElNav] = React.useState(null);    

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };
    console.log(MenuPages)

    return (
        <Fragment>
            <Box sx={{ flexGrow: 1, display: { sm: 'flex', md: 'none' } }}>
                <IconButton
                    sx={{ backgroundColor: "#056aa8" }}
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}

                >
                    <MenuIcon sx={{ color: 'white' }} />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                        display: { sm: 'block', md: 'none' },
                    }}
                >
                    {MenuPages.map((page, index) => (
                        <MenuItem key={index} onClick={handleCloseNavMenu}>
                            <Link key={page.name} to={page.url}>{page.name}</Link>
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
        </Fragment>
    )
}

export default MobileMenu