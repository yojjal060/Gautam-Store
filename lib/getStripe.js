import { loadStripe } from "@stripe/stripe-js";

let stripePromise;

const getStripe = () => {
    if(!stripePromise) {
        // Hardcoding the publishable key (since env vars aren't working)
        stripePromise = loadStripe("pk_test_51RRaLTGX1mGTJWxQTqJSKJaWqhzhhEpm7IXSBpgxk6KRl5z0wXEcW30Zj1R8ekrrEo9AUTuFQhz9tQHnOxu0EZjL00eE6yI8we");
    }

    return stripePromise;
}

export default getStripe;