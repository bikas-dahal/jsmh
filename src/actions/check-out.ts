'use server'

import { redis } from "@/lib/redis";
import { stripe } from "@/lib/stripe";

import { Cart } from "@/schemas/cart-interface";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

// import { revalidatePath } from "next/cache";

import { redirect } from "next/navigation";
import Stripe from "stripe";

export async function checkOut() {

    const { getUser } = getKindeServerSession();

    const user = await getUser();

    if (!user) {
        
        return redirect("/");

    }

    const cart: Cart | null = await redis.get(`cart:${user.id}`);

    if (cart && cart.items) {

        const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = cart.items.map((item) => (
            {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name,
                        images: [item.imageString]
                    },
                    unit_amount: item.price * 100,
                },
                quantity: item.quantity
                
            }
        ))

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            line_items: lineItems,
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel`,
            metadata: {
                userId: user.id
            }
        })

        return redirect(session.url as string);
    }
}