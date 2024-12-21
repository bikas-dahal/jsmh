'use server'

import { redis } from "@/lib/redis";
import { Cart } from "@/schemas/cart-interface";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function delItem(formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
  
    if (!user) {
      return redirect("/");
    }
  
    const productId = formData.get("productId");
  
    let cart: Cart | null = await redis.get(`cart:${user.id}`);
  
    if (cart && cart.items) {
      const updateCart: Cart = {
        userId: user.id,
        items: cart.items.filter((item) => item.id !== productId),
      };
  
      await redis.set(`cart:${user.id}`, updateCart);
    }
  
    revalidatePath("/", 'layout');
  }