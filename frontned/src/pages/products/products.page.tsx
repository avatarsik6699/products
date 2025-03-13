import type { FC } from "react";
import ProductList from "./components/products-list";
import { Link } from "@tanstack/react-router";
import { SquarePlus } from "lucide-react";

const ProductsPage: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-1/2">
        <div className="flex items-center w-full mb-5 gap-2">
          <h1 className="text-3xl font-bold">Товары</h1>
          <Link to="/create-product">
            <SquarePlus className="translate-y-1" />
          </Link>
        </div>
        <ProductList />
      </div>
    </div>
  );
};

export default ProductsPage;
