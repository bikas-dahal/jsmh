'use server'

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import {parseWithZod} from '@conform-to/zod'
import { productSchema } from "@/schemas/product";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createProduct(prevState: unknown, formData: FormData) {
    const {getUser} = getKindeServerSession();

    const user = await getUser();

    const adminEmail = ['bikkyofficial@gmail.com', 'bikkydahal@gmail.com'];

    if (!user || !adminEmail.includes(user.email!)) throw new Error("Unauthorized");

    const submission = parseWithZod(formData, {
        schema: productSchema,
    })

    if (submission.status !== 'success') {
        return submission.reply()
    }

    const flattenImageUrls = submission.value.images.flatMap((url: string) => (url.split(',').map((url: string) => url.trim())))

    await prisma.product.create({
        data: {
            name: submission.value.name,
            description: submission.value.description,
            status: submission.value.status,
            price: submission.value.price,
            images: flattenImageUrls,
            category: submission.value.category,
            isFeatured: submission.value.isFeatured
        }
    })

    redirect('/dashboard/products')
}