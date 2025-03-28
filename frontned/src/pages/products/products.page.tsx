import { Link } from "@tanstack/react-router";
import { PlusCircle } from "lucide-react";
import type { FC } from "react";
import { ProductsTable } from "./components/products-table/products-table";

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
      <ProductsTable />
    </>
  );
};

export default ProductsPage;
