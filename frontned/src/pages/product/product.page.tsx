import { useOneProduct } from "@entities/product/api/useOneProduct";
import { Link, useParams } from "@tanstack/react-router";
import { Edit } from "lucide-react";
import ProductDetail from "./components/product-detail";

const ProductDetailsPage = () => {
  const { productId } = useParams({ strict: false });

  const $product = useOneProduct({
    variables: { productId: Number(productId) },
  });

  return (
    <>
      <div className="flex items-center justify-between gap-2 mb-5">
        <h1 className="text-3xl font-bold">{$product.data.name}</h1>
        <Link
          to="/update-product/$productId"
          params={{ productId: String(productId) }}
          className="inline-flex gap-1 items-center size-fit translate-y-2"
        >
          Редактировать товар
          <Edit className="mr-2 h-4 w-4" />
        </Link>
      </div>
      <ProductDetail />
    </>
  );
};

export default ProductDetailsPage;
