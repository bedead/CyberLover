import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';
// Initialize Stripe with a dynamic API version to avoid type issues
const stripe = stripeSecretKey 
  ? new Stripe(stripeSecretKey, {
      apiVersion: '2023-10-16' as any, // Force type cast to avoid API version restrictions
    })
  : null;

export async function POST(request: Request) {
    try {
        const { credits, price } = await request.json();

        // Check if Stripe is properly initialized
        if (!stripe) {
            return NextResponse.json(
                { error: 'Stripe is not configured. Please set the STRIPE_SECRET_KEY environment variable.' },
                { status: 500 }
            );
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `${credits} AI Companion Credits`,
                        },
                        unit_amount: Math.round(price * 100), // Convert to cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
            metadata: {
                credits: credits.toString(),
            },
        });

        return NextResponse.json({ sessionId: session.id });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json(
            { error: 'Failed to create checkout session' },
            { status: 500 }
        );
    }
} 