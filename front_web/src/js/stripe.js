import { loadStripe } from '@stripe/stripe-js';
import axios from "axios";

const stripeKey = process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY;
// const stripeKey = "pk_test_51OIGBKKfdlsNCGTnyxFs1IzyDJ1Wfe4TKOpDgeDyyubqHixilJu2an4WBdktNWgAUqfPMV6fw8eLNjf6QumdqC9X00g6whFvLS"

if (!stripeKey) {
    throw new Error("Stripe publishable key is missing. Please set VUE_APP_STRIPE_PUBLISHABLE_KEY in your environment variables.");
}
const stripePromise = await loadStripe(stripeKey);

export const bookGroup = async (groupID, userID) => {
    const { data } = await axios.get(`http://localhost:8000/pay/checkout-session/${groupID}/${userID}`);
    const session = data.session;

    // const stripe = await stripePromise;

    await stripePromise.redirectToCheckout({
        sessionId: session.id
    });
};

/*
To use environment variables from docker-compose in a Vue app, you typically:
1. Define them in your docker-compose.yml under the environment section.
2. Pass them to your frontend container, often via build args or by serving them as .env files.
3. In Vue, use variables prefixed with VUE_APP_ (e.g., VUE_APP_STRIPE_PUBLISHABLE_KEY).
4. Access them in code with process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY.

Example docker-compose.yml snippet:
    frontend:
        build:
            context: .
            args:
                - VUE_APP_STRIPE_PUBLISHABLE_KEY=your_key_here
        environment:
            - VUE_APP_STRIPE_PUBLISHABLE_KEY=your_key_here

In your Vue code:
    const stripePromise = await loadStripe(process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY);

Make sure to restart your containers after changing environment variables.
*/