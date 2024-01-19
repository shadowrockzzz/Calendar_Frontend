import { Injectable } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';

@Injectable({
  providedIn: 'root'
})
export class StripeService {

  constructor() { }

  private stripePromise = loadStripe('pk_test_51OaEFsSCqY0t9WjtAQx2aePczKbl9dpUeRsb5RC6GGDK4RSdTS10mzG0guCD4Rl7DBzdDwlgJmVIjbQl1Erqtcyx00osoZnz9k');

  async checkout(): Promise<void> {
    const stripe = await this.stripePromise;
    const sessionId = await this.createCheckoutSession();
    if(stripe){
      const { error } = await stripe.redirectToCheckout({
        sessionId: sessionId,
      });
      if (error) {
        console.error('Error redirecting to Checkout:', error);
      }
    }
  }

  checkoutSessionId = ""

  private async createCheckoutSession(): Promise<string> {
    const response = await fetch('http://localhost:3030/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId: 'price_1OaF2ESCqY0t9WjtaSFCJmYO',
      }),
    });

    const data = await response.json();
    this.checkoutSessionId = data.id
    localStorage.setItem("sessionId",this.checkoutSessionId)
    return data.id;
  }
}
