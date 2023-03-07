import React, { useState, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import HandleDialogs from 'src/Setup/Util/HandleDialogs';

import { AuthContext } from 'src/Setup/Contexts/AuthContext';

import './styles.scss';

export default function MyPackage(props) {

    const auth = useContext(AuthContext);    

    const navigate = useNavigate();        

    const [toLocation, setToLocation] = useState('');        

    const handleDialogsRef = useRef();

    const handleDialogAction = (setting) => {        
        handleDialogsRef.current.handleAction(setting);
      }

    const handleClick = (e, packageID) => {
                
        e.preventDefault();
        
        if(auth.authState.status) 
        {
            // navigate(`/payment/${packageID}`); 
            navigate('/checkout/'+packageID)           
        } 
        else 
        {
            // setToLocation(`/checkout/${packageID}`); // Redirect to given route after login.            
            handleDialogAction("Login")
            
        }        
    }
         
    return (
        <div className="card">
            <div className="cardHeading">
                <span className="priceTag">Fra {Number(props.price)},-</span>
                <h2>{props.name}</h2>
            </div>

            <ul>
                <li>
                   <h2> Days {props.duration} </h2>
                </li>
                <li>
                   <h2> Tests {props.numberoftests} </h2>
                </li>
            </ul>
            
            <Link 
                to='#' 
                onClick = { (e) => {
                    handleClick(e, props.id);                    
                }

                } 
            >
                Get It
            </Link>    
            <HandleDialogs ref={handleDialogsRef} />        
        </div>
    );
}