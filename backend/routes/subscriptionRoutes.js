const express = require('express');
const router = express.Router();

let {
    createSubscription, 
    handlePaymentSuccess, 
 } = require('./../controller/subscriptionController');

// Route for creating a subscription checkout session
router.post('/create-subscription-checkout-session', createSubscription);

// Route for handling successful payment
router.post('/payment-success', handlePaymentSuccess);

module.exports = router;
