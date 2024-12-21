import { CategoriesSelection } from "@/components/frontend/category-selection";
import { FeaturedProducts } from "@/components/frontend/featured-product";
import { Hero } from "@/components/frontend/hero";


export default function Home() {
  return (
    <div>
      <Hero />
      <CategoriesSelection />
      <FeaturedProducts />
    </div>
  );
}
