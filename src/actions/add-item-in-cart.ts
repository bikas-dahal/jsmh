'use server'

import prisma from "@/lib/prisma";
import { redis } from "@/lib/redis";
import { Cart } from "@/schemas/cart-interface";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export const addItemInCart = async (productId: string, quantity: number) => {

    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user) {
        return redirect('/');
    }

    const cart: Cart | null = await redis.get(`cart:${user.id}`);

    const selectedProduct = await prisma.product.findUnique({
        where: { id: productId },
        select: {
            id: true,
            name: true,
            price: true,
            images: true,
        },
    });

    if (!selectedProduct) {
        console.log('No product found');
        throw new Error('No product found');
    }

    let myCart: Cart;

    if (!cart || !cart.items || !cart.items.length) {
        myCart = {
            userId: user.id,
            items: [
                {
                    id: selectedProduct.id,
                    name: selectedProduct.name,
                    price: selectedProduct.price,
                    quantity,
                    imageString: selectedProduct.images[0],
                },
            ],
        };
    } else {
        let itemFound = false;

        myCart = {
            userId: user.id,
            items: cart.items.map((item) => {
                if (item.id === productId) {
                    itemFound = true;
                    item.quantity += quantity; // Update quantity
                }
                return item;
            }),
        };

        if (!itemFound) {
            myCart.items.push({
                id: selectedProduct.id,
                name: selectedProduct.name,
                price: selectedProduct.price,
                quantity,
                imageString: selectedProduct.images[0],
            });
        }
    }

    await redis.set(`cart:${user.id}`, myCart);

    revalidatePath('/');
};
