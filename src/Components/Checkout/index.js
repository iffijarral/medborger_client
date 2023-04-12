import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
// Stripe components
import { loadStripe } from "@stripe/stripe-js";
import { Elements, ElementsConsumer } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
// to call API
import { getRequest, postRequest } from 'src/Setup/AxiosClient';
// to call Payment API
import { postPaymentRequest } from "src/Setup/AxiosClientPayment";

import { AuthContext } from 'src/Components/Contexts/AuthContext';

// Material ui component
import CircularProgress from '@mui/material/CircularProgress';

import "./Stripe.css";
import { Box } from "@mui/system";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// A reference to Stripe.js initialized with a fake API key.
// Sign in to see examples pre-filled with your key.

const promise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`, { locale: 'en' });

const Checkout = () => {
    const { packageID } = useParams();
    const [packageState, setPackageState] = useState({})
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const [clientSecret, setClientSecret] = useState('')

    var auth = useContext(AuthContext);

    useEffect(() => {
        getPackage()
    }, [])

    useEffect(() => {
        getClientSecret()
    }, [])

    const getPackage = async () => {
        setLoading(true)
        const response = await getRequest('packages/' + packageID)
        setLoading(false)
        if (response.status === 200) {
            setPackageState({ ...response.data })
        } else {
            setError(true)
            setErrorMsg(response.data.message)
        }
    }



    const getClientSecret = async () => {
        const payload = {
            packageID: packageID,
            receipt_email: auth.authState.email
        }
        setLoading(true)
        const response = await postPaymentRequest('create-payment-intent', payload, auth.authState.token)
        if (response.status === 200)
            setClientSecret(response.data.clientSecret)
        else {
            setError(true)
            setErrorMsg(response.data.message)
        }
        setLoading(false)

    }
    const options = {
        // passing the client secret obtained from the server
        clientSecret: clientSecret,
    };
    return (
        <section>
            {
                !error ?
                    loading ? <>Loading..</> :
                        <div style={{ margin: 'auto' }}>
                            <h2 style={{ margin: '0', textAlign: 'center' }}>Package: {packageState.name}</h2>
                            <p style={{ margin: '0', textAlign: 'center', color: '#056aa8' }}>Amount: {packageState.price} dkk</p>
                            {
                                promise && clientSecret ? (
                                    <Elements stripe={promise} options={options}>
                                        <CheckoutForm packageID={packageID} authState={auth.authState} />
                                    </Elements>
                                ) :
                                    <Box style={{display: 'flex', justifyContent: 'center'}}>
                                        <CircularProgress />
                                    </Box>
                            }
                        </div> :
                    <div> {errorMsg} </div>
            }
        </section>
    );
}

export default Checkout