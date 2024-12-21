import { EditForm } from "@/components/dashboard/edit-form";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

async function getData(productId: string) {
  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

type Params = Promise<{ id: string }>;

export default async function EditRoute({
  params
}: {params: Params}) {


  noStore();

  const { id } = (await params);
  const data = await getData(id);
  return <EditForm data={data} />;
}