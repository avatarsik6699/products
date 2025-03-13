import { useOneProduct } from "@entities/product/api/useOneProduct";
import { useUpdateProduct } from "@entities/product/api/useUpdateProduct";
import ProductForm from "@entities/product/ui/product-form";
import { useParams } from "@tanstack/react-router";
import type { FC } from "react";
import { useCallback } from "react";
import { toast } from "sonner";

const UpdateProductPage: FC = () => {
  const { productId } = useParams({ strict: false });

  const $product = useOneProduct({
    variables: { productId: Number(productId) },
    select: (data) => {
      return {
        ...data,
        image: data.photoFileName,
      };
    },
  });

  const $update = useUpdateProduct({
    onSuccess: () => {
      toast.success("Товар успешно обновлён!");
    },
    onError: (error) => {
      toast.error("Ошибка при обновлении товара", {
        description: error.message || "Попробуйте позже",
      });
    },
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col gap-5 w-1/2">
        <h3 className="text-2xl font-semibold">Редактирование товара</h3>
        <ProductForm
          type="update"
          initialValues={$product.data}
          isPending={$update.isPending}
          $handler={useCallback(
            (formData) => {
              $update.mutate({
                productId: Number(productId),
                dataToUpdate: formData,
              });
            },
            [$update, productId],
          )}
        />
      </div>
    </div>
  );
};

export default UpdateProductPage;
