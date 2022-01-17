import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
     const priceForStripe = price * 100;
     const publishableKey = 'pk_test_51ILxlJG616nDdjAY0bM05QigwvKHtoaxNYarfhl9R0dFbh02Ufuxm6ZJ8YmliLIlz5WjWhIRcdmfGwGFbkYHos6S00RC5lmEh7';

     const onToken = token => {
        //  console.log(token);
        axios({
            url: 'payment',
            method: 'post',
            data: {
                amount: priceForStripe,
                token 
            }
        })
        .then(response => {
            alert('Payment successful');
        })
        .catch(error =>{
            console.log('Payment error: ', JSON.parse(error));
            alert(
                'There was an issue with your payment. Please sure you use the provided credit card'
            );
        });
     };

     return (
        <StripeCheckout
            label = 'Pay Now'
            name = 'CRWN Clothing ltd.'
            billingAddress
            shippingAddress
            image = 'https://svgshare.com/i/CUz.svg'
            description = {`Your Total Price is $ ${price}`}
            amount = { priceForStripe }
            panelLabel = 'Pay as you Wish'
            token = { onToken }
            stripeKey = { publishableKey }
        />
     );
};

export default StripeCheckoutButton;