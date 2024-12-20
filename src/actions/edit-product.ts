'use server'

import prisma from "@/lib/prisma";
import { productSchema } from "@/schemas/product";
import { parseWithZod } from "@conform-to/zod";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export async function editProduct(prevState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    const adminEmail = ['bikkyofficial@gmail.com', 'bikkydahal@gmail.com'];
  
    if (!user || !adminEmail.includes(user.email!)) {
      return redirect("/");
    }
  
    const submission = parseWithZod(formData, {
      schema: productSchema,
    });
  
    if (submission.status !== "success") {
      return submission.reply();
    }
  
    const flattenUrls = submission.value.images.flatMap((urlString) =>
      urlString.split(",").map((url) => url.trim())
    );
  
    const productId = formData.get("productId") as string;
    await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        name: submission.value.name,
        description: submission.value.description,
        category: submission.value.category,
        price: submission.value.price,
        isFeatured: submission.value.isFeatured === true ? true : false,
        status: submission.value.status,
        images: flattenUrls,
      },
    });
  
    redirect("/dashboard/products");
  }