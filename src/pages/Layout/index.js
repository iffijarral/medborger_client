import React, { useEffect, useContext } from "react";
import { AuthContext } from "src/Components/Contexts/AuthContext";

import { Outlet } from "react-router-dom";
import Footer from "src/pages/Footer";
import FloatingActionButton from "src/Components/Util/Fab";
import { NavbarProvider } from 'src/Components/Contexts/NavbarContext';
// Style sheet
import './styles.scss';
import ResponsiveAppBar from "./Menubar";
import UseIdle from "src/Components/Util/IdleTimerContainer";

const Layout = () => {

  return (
    <>
      <NavbarProvider>
        <ResponsiveAppBar />        
        <UseIdle idleTime={15} /> {/* It logs out if system is idle for given time.  */}
        <Outlet />
        <Footer />
        <FloatingActionButton />
      </NavbarProvider>     
    </>
  )
};

export default Layout;