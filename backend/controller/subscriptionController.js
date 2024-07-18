
const moment = require('moment');

const [monthly, biyearly, yearly] = ['price_1PdfgZ01hABKBF0gdRIMJBFp', 'price_1PdfhA01hABKBF0gU0dGLozj', 'price_1PdfiO01hABKBF0gMkm169vB'];

const stripe = require("stripe")('sk_test_51Oz5el01hABKBF0gIItdBBUC4yZh9gP4l8AqRSzWmKqtEjJ1iK7fnbHLmucEVBlUYUkaXe1Oiy2YpaPjcFFgqLlJ00hRD7Wb1U')

// Function to create a new Stripe checkout session for subscription
const stripeSession = async(plan) => {
    try {
        const session = await stripe.checkout.sessions.create({
            mode: "subscription",
            payment_method_types: ["card"],
            line_items: [
                {
                    price: plan,
                    quantity: 1
                },
            ],
            success_url: `http://localhost:5173/success`,
            cancel_url: `http://localhost:5173/`
        });
        return session;
    }catch (e){
        return e;
    }
};

// Controller function to handle the creation of a new subscription
const createSubscription = async (req, res) => {
    console.log("req.body is", req.body)
    const plan = req.body.plan;
    console.log("plan", typeof plan)
    let planId = null;
    if(plan == 19.99) planId = monthly;
    else if(plan == 99.99) planId = biyearly;
    else if(plan == 179.99) planId = yearly;

    try{
        console.log("PlanId ---", planId)
        const session = await stripeSession(planId);
        console.log("SESSION ----->",session)
        const userId = req.body.userId;
      
        console.log("userId here in controller", userId)
     
        return res.json({session})

    }catch(error){
        res.send(error)
    }
};


// Controller function to handle successful payment callback from Stripe
const handlePaymentSuccess = async (req, res) => {
    console.log("sessionId request.body", req.body);
    const { sessionId } = req.body;
  
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
        console.log("----------- HERE In Success Method ----------")
      if (session.payment_status === 'paid') {
          const subscriptionId = session.subscription;
          try {
            const userId = req.body.userId
            console.log("------UserId=====", userId)
            const subscription = await stripe.subscriptions.retrieve(subscriptionId);
            console.log("subscription.current_period_start", moment.unix(subscription.current_period_start).format('YYYY-MM-DD'))
            console.log("subscription.current_period_end", moment.unix(subscription.current_period_end).format('YYYY-MM-DD'))
            const planId = subscription.plan.id;
            const planType = subscription.plan.interval === "month" ? "monthly" : "yearly";
            console.log("planType::", planType)
            const startDate = moment.unix(subscription.current_period_start).format('YYYY-MM-DD');
            const endDate = moment.unix(subscription.current_period_end).format('YYYY-MM-DD');
            const durationInSeconds = subscription.current_period_end - subscription.current_period_start;
            const durationInDays = moment.duration(durationInSeconds, 'seconds').asDays();
           
            // Create Subscription and Update user
            
            try {

                // const savedSubscription = await subscriptionMo.save();
                // console.log("Subscription saved:", savedSubscription);
                // const subscriptionEndDate = moment(savedSubscription.planEndDate);
                // console.log("subscriptionEndDate", subscriptionEndDate)
                // const currentDate = moment();
                // console.log("currentDate", currentDate)
                // const isSubscribed = subscriptionEndDate.isAfter(currentDate);
                // console.log("subscriptionEndDate.isAfter(currentDate)", subscriptionEndDate.isAfter(currentDate))
                // console.log("isSubscribed: ", isSubscribed);
                // const user = await User.findById(currentUser.userId);

                // user.isSubscribed = isSubscribed;

                // await user.save();
                // console.log("User updated:", user);
            } catch (error) {
                console.error("Error saving subscription:", error);
            }

              
            } catch (error) {
              console.error('Error retrieving subscription:', error);
            }
          return res.json({ message: "Payment successful" });
        } else {
          return res.json({ message: "Payment failed" });
        }
      } catch (error) {
        res.send(error);
      }
};

module.exports = {
    createSubscription,
    handlePaymentSuccess
};
