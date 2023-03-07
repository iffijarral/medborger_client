import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from 'src/Setup/Contexts/AuthContext';
import { NavbarContext } from 'src/Setup/Contexts/NavbarContext';
import { getRequest } from 'src/Setup/AxiosClient';

export const TestLogic = ({ snakkebarAction }) => {

    const [testsList, setTestsList] = useState([]);

    var authContext = useContext(AuthContext);
    
    const contextNavbar = useContext(NavbarContext)

    const authState = authContext.authState;

    const navigate = useNavigate();    

    useEffect(() => {
        
        getTests()

    }, []);

    const getTests = async () => {
        const response = await getRequest('tests'); // Fetch Data

        if (response.status) {

            setTestsList(response.data);

        } else {
            return (
                <div> No Data Available</div>
            );
        }
    }

    const handleClick = (index, testID) => {
             
        if (authState.status && index < parseInt(authState.noOfTests)) {
            contextNavbar.setNavbar(false);
            navigate(`/tests/${testID}`);

        }
        else if (index < 2) { // It means if first test button is pressed, then run the test, as its free or example test
            contextNavbar.setNavbar(false);
            navigate(`/tests/${testID}`)
        }
        else {
            // call function to show snakkebar along with following data
            const snakkebarObject = {
                severity: 'info',
                message: 'Please purchase or upgrade your package'
            }
            snakkebarAction(snakkebarObject)            
        }
    }

    return {
        testsList,        
        handleClick  
    }
}