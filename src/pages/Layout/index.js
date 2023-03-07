import React, { useEffect, useContext } from "react";
import { AuthContext } from "src/Setup/Contexts/AuthContext";

import { Outlet } from "react-router-dom";
import Footer from "src/pages/Footer";
import FloatingActionButton from "src/Setup/Util/Fab";
import { NavbarProvider } from 'src/Setup/Contexts/NavbarContext';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/styles';
// Style sheet
import './styles.scss';
import ResponsiveAppBar from "./Menubar";
import UseIdle from "src/Setup/Util/IdleTimerContainer";
import MetaTag from "src/Setup/Util/MetaTag";

const Layout = () => {
  const theme = createTheme()
  const auth = useContext(AuthContext);  

  return (    
    <>
      <NavbarProvider>
        <ThemeProvider theme={theme}>
          <ResponsiveAppBar />
          <UseIdle idleTime={15} />
          <Outlet />
          <Footer />
          <FloatingActionButton />
        </ThemeProvider>
      </NavbarProvider>

      {/* <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/blogs">Blogs</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav> */}
    </>
  )
};

export default Layout;