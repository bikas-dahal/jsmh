'use server'

import prisma from "@/lib/prisma";
import { bannerSchema } from "@/schemas/banner";
import { parseWithZod } from "@conform-to/zod";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export async function createBanner(prevState: any, formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
  
    const adminEmail = ['bikkyofficial@gmail.com', 'bikkydahal@gmail.com'];

    if (!user || !adminEmail.includes(user.email!)) redirect("/dashboard/banner");
  
    const submission = parseWithZod(formData, {
      schema: bannerSchema,
    });
  
    if (submission.status !== "success") {
      return submission.reply();
    }
  
    await prisma.banner.create({
      data: {
        title: submission.value.title,
        imageString: submission.value.imageString,
      },
    });
  
    redirect("/dashboard/banner");
  }
  