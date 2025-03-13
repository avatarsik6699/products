import { useCreateProduct } from "@entities/product/api/useCreateProduct";
import ProductForm from "@entities/product/ui/product-form";
import type { FC } from "react";
import { useCallback } from "react";
import { toast } from "sonner";

const CreateProductPage: FC = () => {
  const $create = useCreateProduct({
    onSuccess: () => {
      toast.success("Товар успешно создан!");
    },
    onError: (error) => {
      toast.error("Ошибка при создании товара", {
        description: error.message || "Попробуйте позже",
      });
    },
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col gap-5 w-1/2">
        <h3 className="text-2xl font-semibold">Добавление товара</h3>
        <ProductForm
          type="create"
          isPending={$create.isPending}
          $handler={useCallback(
            (formData) => {
              $create.mutate(formData);
            },
            [$create],
          )}
        />
      </div>
    </div>
  );
};

export default CreateProductPage;
