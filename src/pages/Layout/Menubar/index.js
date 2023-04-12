import React, { useEffect, Fragment, useRef, useState, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';

// Material UI components
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';

import { useMediaQuery } from 'react-responsive'
import { DeviceSize } from 'src/Components/Util/DeviceSize';

// custom components
import MobileNav from './MobileNav';
import AccountButton from './Account';
import HandleDialogs from 'src/Components/Util/HandleDialogs';

import { MenuPages } from 'src/Setup/Data';
// to control navbar state
import { NavbarContext } from 'src/Components/Contexts/NavbarContext';
// styles
import './styles.scss'

function ResponsiveAppBar() {

  const [isHome, setIsHome] = useState(false);

  const location = useLocation();

  const contextNavbar = useContext(NavbarContext)

  const handleDialogAction = (setting) => {
    handleDialogsRef.current.handleAction(setting);
  }

  const handleDialogsRef = useRef();  

  const isMobile = useMediaQuery({ maxWidth: DeviceSize.small });

  useEffect(() => {

    if (location.pathname === '/') {
      setIsHome(true);
    }
    else {
      setIsHome(false);
    }
  }, [location]);

  return (
    <Fragment>
      {contextNavbar.navbar &&
        <AppBar position="static" sx={{ backgroundColor: 'white', boxShadow: isHome ? 'none' : '0px 5px 10px 0px RGB(0 0 0 / 15%)' }}>
          <Container maxWidth="xl" sx={{ padding: '2em', }}>
            <Toolbar disableGutters sx={{ display: 'flex' }}>
              {/* Logo for desktop */}
              <Box sx={{ flex: 1.2, display: { xs: 'none', md: 'flex' } }}>
                <Link className="logo" to="/">Medborgerskabs<span>Prøve</span></Link>
              </Box>

              {/* Menu For mobile */}
              {isMobile && <MobileNav />}

              {/* Menu For non-mobile  */}
              <Box sx={{ flex: 2, display: { xs: 'none', md: 'flex', } }}>
                {MenuPages.map((page) => (
                  <Link key={page.name} to={page.url}>{page.name}</Link>
                ))}
              </Box>

              <AccountButton handleDialogAction={handleDialogAction} />

            </Toolbar>
          </Container>
        </AppBar>
      }
      <HandleDialogs ref={handleDialogsRef} />
    </Fragment>
  );
}
export default ResponsiveAppBar;