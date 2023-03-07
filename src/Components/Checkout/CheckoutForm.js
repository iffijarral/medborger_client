import React, { useState, useContext } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { Button, CircularProgress, Typography } from "@mui/material";
// to call API
import { postRequest } from 'src/Setup/AxiosClient';

// Context manager
import { AuthContext } from 'src/Setup/Contexts/AuthContext';

const CheckoutForm = ({ packageID, authState }) => {

  const [succeeded, setSucceeded] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const stripe = useStripe();
  const elements = useElements();

  const authContext = useContext(AuthContext);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        fontFamily: 'Arial, sans-serif',
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setProcessing(true)
    try {
      const result = await stripe.confirmPayment({
        //`Elements` instance that was used to create the Payment Element
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/packages`, // By applying next "redirect: 'if_required'", this return_url becomes useless i.e. we are not using this  
        },
        redirect: 'if_required' // It stops the page to navigate to return_url
      });
      console.log(result)

      handleResult(result) // Perform after payment received operations like display msgs and save payment info into database   

      setProcessing(false)

    } catch (error) {
      setProcessing(false)
      setError(error.message)
    }

  };

  const handleResult = (result) => {

    setDisabled(true) // Disable the pay button to prevent the user to press it again while further operations are being performed

    if (result.error) {
      setError(`Payment declined due to: ${result.error.message}`)
    }
    else {
      switch (result.paymentIntent.status) {
        case 'succeeded':
          if (saveOrder(result)) {
            setSucceeded(true)
            setMessage('Success! Thank you so much for your purchase, be well prepared to succeed.')
          }
          else {
            setMessage('Payment failed. Please try again later or contact the admin. Thanks')
          }

          break;
        case 'processing':
          // setSucceeded(true)
          setMessage("Payment processing. We'll update you when payment is received.")
          break;
        case 'requires_payment_method':
          setMessage('Payment failed. Please try again later or contact the admin. Thanks')
          break;
        default:
          setMessage('Something went wrong.');
          break;

      }

    }
  }

  const saveOrder = async (result) => {
    const payload = {
      txn_id: result.paymentIntent.id,
      payment_gross: result.paymentIntent.amount,
      currency_code: result.paymentIntent.currency,
      payer_emai: result.paymentIntent.receipt_email,
      payment_status: result.paymentIntent.status,
      PackageId: packageID, // coming from props
      UserId: authState.id // coming from props
    }

    const response = await postRequest('payments/save-payment-transaction', payload, authState.token)

    if (response.status === 200) {

      const { paymentId, paymentStatus, ...userData} = response.data

      authContext.setAuthState(userData);

      authContext.saveCookie(userData);

      return true
    }

    return false

  }

  return (
    <form id="" onSubmit={handleSubmit}>
      <PaymentElement options={cardStyle} onChange={handleChange} />
      <Button
        variant="contained"
        style={{ marginTop: '1em' }}
        fullWidth={true}
        disabled={processing || disabled || succeeded}
        id="submit"
        type="submit"
      >
        <span>
          {processing ? (
            <CircularProgress />
          ) : (
            "Pay now"
          )}
        </span>
      </Button>
      {/* Show any error that happens when processing the payment */}
      {error && (
        <div className="card-error" role="alert">
          <Typography color='error' style={{ textAlign: 'center', marginTop: '1em' }}>{error}</Typography>
        </div>
      )}
      {/* Show a success message upon completion */}

      {message && (
        <Typography style={{ marginTop: '1em', color: 'InfoText', textAlign: 'center' }}>{message}</Typography>
      )}
    </form>
  );
}

export default CheckoutForm