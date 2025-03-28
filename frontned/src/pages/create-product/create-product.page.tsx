import {
  createProductSchema,
  useCreateProduct,
} from "@entities/product/api/useCreateProduct";
import { useProductList } from "@entities/product/api/useProductList";
import { zodResolver } from "@hookform/resolvers/zod";
import { DEFAULT_PAGE } from "@shared/constants";
import { DEFAULT_LIMIT } from "@shared/constants";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import ProductFormFooter from "@widgets/ProductForm/components/ProductFormFooter";
import ProductForm from "@widgets/ProductForm/ProductForm";
import type { ProductFormTypes } from "@widgets/ProductForm/ProductForm.types";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const CreateProductPage: FC = () => {
  const client = useQueryClient();
  const navigate = useNavigate();

  const $create = useCreateProduct({
    onSuccess: async () => {
      toast.success("Товар успешно создан!");

      await client.invalidateQueries({
        queryKey: useProductList.getKey(),
        exact: false,
      });

      navigate({
        to: "/",
        search: { page: DEFAULT_PAGE, limit: DEFAULT_LIMIT },
      });
    },
    onError: (error) => {
      toast.error("Ошибка при создании товара", {
        description: error.message || "Попробуйте позже",
      });
    },
  });

  const form = useForm<ProductFormTypes.FormFieldValues>({
    resolver: zodResolver(
      createProductSchema.transform((schema) => ({
        ...schema,
        photo: schema.photo,
      })),
    ),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      sku: "",
      discount: 0,
      photo: undefined,
      category: undefined,
      inStock: false,
    },
  });

  return (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Добавить новый товар</h1>
        <p className="text-muted-foreground">
          Заполните форму для создания нового товара
        </p>
      </div>

      <ProductForm
        form={{
          ...form,
          onSubmit: ({ photo, ...formData }) => {
            console.log(photo, formData);
            $create.mutate({ ...formData, image: photo });
          },
        }}
        Footer={<ProductFormFooter isDisabled={$create.isPending} />}
      />
    </>
  );
};

export default CreateProductPage;
