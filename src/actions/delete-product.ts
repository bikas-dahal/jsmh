'use server'

import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export async function deleteProduct(formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const adminEmail = ['bikkyofficial@gmail.com', 'bikkydahal@gmail.com'];
  
    if (!user || !adminEmail.includes(user.email!)) {
      return redirect("/");
    }
  
    await prisma.product.delete({
      where: {
        id: formData.get("productId") as string,
      },
    });
  
    redirect("/dashboard/products");
  }