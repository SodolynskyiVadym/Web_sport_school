import { loadStripe } from '@stripe/stripe-js';
import axios from "axios";

const stripePromise = await loadStripe("pk_test_51OIGBKKfdlsNCGTnyxFs1IzyDJ1Wfe4TKOpDgeDyyubqHixilJu2an4WBdktNWgAUqfPMV6fw8eLNjf6QumdqC9X00g6whFvLS");

export const bookGroup = async (groupID, userID) => {
    const { data } = await axios.get(`http://localhost:8000/pay/checkout-session/${groupID}/${userID}`);
    const session = data.session;

    // const stripe = await stripePromise;

    await stripePromise.redirectToCheckout({
        sessionId: session.id
    });
};
