import prisma from "@/lib/prisma";
import { redis } from "@/lib/redis";
import { stripe } from "@/lib/stripe";

export async function POST (req: Request) {
    const body = await req.text();

    const signature = req.headers.get('stripe-signature') as string;

    let event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_SECRET_WEBHOOK as string);

    } catch (error) {
        console.log(error);
        return new Response('Webhook Error', { status: 400 });
    }

    switch(event.type) {
        case "checkout.session.completed":{
            const session = event.data.object;

             // Fetch the session with line items
             const expandedSession = await stripe.checkout.sessions.retrieve(
                session.id,
                {
                    expand: ['line_items']
                }
            );

            if (!expandedSession.metadata?.userId) {
                throw new Error('No user ID in session metadata');
            }

            // Calculate total quantity from all line items
            const totalQuantity = expandedSession.line_items?.data.reduce(
                (sum, item) => sum + (item.quantity || 0),
                0
            ) || 0;
            
            await prisma.order.create({
                data: {
                    amount: session.amount_total as number,
                    status: session.status as string,
                    userId: session.metadata?.userId,
                    quantity: totalQuantity,
                }
            })

        await redis.del(`cart:${session.metadata?.userId}`);
        break;      
    }
        default: {
            console.log(`Unhandled event type ${event.type}`);
        } 

    }

    return new Response('OK', { status: 200 });

}