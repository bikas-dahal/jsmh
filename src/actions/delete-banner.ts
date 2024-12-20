'use server'

import prisma from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";

export async function deleteBanner(formData: FormData) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
  
    if (!user || user.email !== "bikkydahal@gmail.com") {
      return redirect("/");
    }
  
    await prisma.banner.delete({
      where: {
        id: formData.get("bannerId") as string,
      },
    });
  
    redirect("/dashboard/banner");
  }