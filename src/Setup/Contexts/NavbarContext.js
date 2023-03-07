import { createContext, useState } from "react";

const NavbarContext = createContext(null);

const { Provider } = NavbarContext; 

const NavbarProvider = ({ children }) => {
    const [navbar, setNavbar] = useState(true);

    return (
        <Provider
            value={{
                navbar,
                setNavbar
            }}
        >
            {children}
        </Provider>
    )
};

export { NavbarContext, NavbarProvider };