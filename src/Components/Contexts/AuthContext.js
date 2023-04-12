import React, { createContext, useState, useRef, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
// To call APIs
import { getRequest } from 'src/Setup/AxiosClient';

import MySnackbar from 'src/Components/Util/SnackBar';

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {

    const navigate = useNavigate();

    const [authState, setAuthState] = useState({
        name: '',
        email: '',
        noOfTests: 0,
        status: false, // It will be used for login status
        active: false, // active means if he has purchsed a package and it is not expired        
    });

    const logout = () => {

        setAuthState({});
        Cookies.remove('token');
        navigate('/');
    };

    let snakkebarRef = useRef('');

    // Calling handleSnakkebarAction function from snakkebar component 
    const snakkebarAction = (actionObject) => {
        snakkebarRef.current.handleSnakkebarAction(actionObject); // This function is in SnackBar.js
    }



    const authenticate = async () => {

        if (authState.status) {

            return true;
        }
        else {
            // Fetch token from cookie
            const token = getHTTPonlyCookie()

            // if cookie value i.e token exists or does not expire, then it will be true
            if (token) {

                // Fetch state from server session by sending token
                const response = await getRequest('session/', token);

                if (response.status === 200) {
                    // Fetch state                                        
                    const state = response.data

                    // Set authState
                    setAuthState(state)
                    return true;
                }
                else {
                    console.log(`state is empty`)
                    setAuthState({});

                    // call function to show snakkebar with following data
                    const snakkebarObject = {
                        severity: 'info',
                        message: 'Your session has expired, please login to proceed'
                    }
                    snakkebarAction(snakkebarObject)
                }

            }
            else {
                setAuthState({});
            }
        }
    };
    const setHTTPonlyCookie = (value) => {

        const cookieOptions = {
            expires: 24 / 24, // Set expiration time 5 hours
            httpOnly: true, // Set HTTP-only flag
            secure: true
        };

        // Set cookie with options
        Cookies.set('token', value, cookieOptions);
    };

    const getHTTPonlyCookie = () => {
        // Return cookie value
        return Cookies.get('token');
    };

    return (
        <Fragment>
            <Provider
                value={{
                    authState,
                    setAuthState,
                    logout,
                    authenticate,
                    setHTTPonlyCookie,
                    getHTTPonlyCookie
                }}
            >
                {children}
            </Provider>
            <MySnackbar ref={snakkebarRef} />
        </Fragment>
    );
};

export { AuthContext, AuthProvider };