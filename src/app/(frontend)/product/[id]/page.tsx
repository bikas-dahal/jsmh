import { addItemInCart } from "@/actions/add-item-in-cart";
import { FeaturedProducts } from "@/components/frontend/featured-product";
import { ImageSlider } from "@/components/frontend/image-slider";
import { ShoppingBagButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import prisma from "@/lib/prisma";
import { StarIcon } from "lucide-react";
import { unstable_noStore } from "next/cache";
import { notFound } from "next/navigation";


async function getData(productId: string) {
  const data = await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      price: true,
      images: true,
      description: true,
      name: true,
      id: true,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

// type Props = Promise<{ params: { id: string } }>;
type Params = Promise<{ id: string }>;


export default async function ProductIdPage({params}: {params: Params}) {
  unstable_noStore();

  const {id} = await params;
  const data = await getData(id);

  async function addToCart(formData: FormData) {
    'use server';
    const quantity = Number(formData.get('quantity'));
    await addItemInCart(data.id, quantity);
  }


  // const addProducttoShoppingCart = addItemInCart.bind(null, data.id);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start lg:gap-x-24 py-6">
        <ImageSlider images={data.images} />
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
            {data.name}
          </h1>
          <p className="text-3xl mt-2 text-gray-900">${data.price}</p>
          <div className="mt-3 flex items-center gap-1">
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <StarIcon className="h-4 w-4 text-yellow-500 fill-yellow-500" />
          </div>
          <p className="text-base text-gray-700 mt-6">{data.description}</p>

          <form action={addToCart}>
            <Input
              type="number"
              name="quantity"
              required
              defaultValue="1"
              min="1"
              max="10"
              className="w-full mt-4"
            />
            <ShoppingBagButton />
          </form>
        </div>
      </div>

      <div className="mt-16">
        <FeaturedProducts />
      </div>
    </>
  );
}
