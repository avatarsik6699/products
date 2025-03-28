import { Link } from "@tanstack/react-router";
import { PlusCircle } from "lucide-react";
import type { FC } from "react";
import ProductsCardsList from "./components/products-cards-list/products-cards-list";
import ProductsFilters from "./components/products-filters/products-filters";
const ProductsPage: FC = () => {
  return (
    <>
      <div className="flex items-center justify-between gap-2 mb-5">
        <h1 className="text-3xl font-bold">Список товаров</h1>
        <Link
          to="/create-product"
          className="inline-flex gap-1 items-center size-fit translate-y-2"
        >
          <PlusCircle className="size-5" />
          Добавить товар
        </Link>
      </div>

      <div className="grid grid-cols-5 gap-4">
        <ProductsFilters className="col-span-1" />

        <ProductsCardsList className="col-span-4" />
      </div>
      {/* <ProductsTable /> */}
    </>
  );
};

export default ProductsPage;
