import { useParams } from "@tanstack/react-router";
import { useOneProduct } from "@entities/product/api/useOneProduct";
import { ProductDetailsCard } from "@entities/product/ui/product-detail";

const ProductDetailsPage = () => {
  const { productId } = useParams({ strict: false });

  const $product = useOneProduct({
    variables: { productId: Number(productId) },
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-8">Product Details</h1>
      <ProductDetailsCard product={$product.data} />
    </div>
  );
};

export default ProductDetailsPage;
