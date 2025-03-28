import type { FC } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { createProductSchema } from "@entities/product/api/useCreateProduct";
import { Button } from "@shared/ui/button";
import {
  FormProvider,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@shared/ui/form";
import { Input } from "@shared/ui/input";
import { updateProductSchema } from "../api/useUpdateProduct";

type FormData = {
  name: string;
  description: string;
  price: number;
  sku: string;
  discount?: number | undefined;
  image?: File | undefined;
};

type CreateFormProps = {
  type: "create";
};

type UpdateFormProps = {
  type: "update";
  initialValues: Partial<FormData>;
};

type Props = (CreateFormProps | UpdateFormProps) & {
  isPending: boolean;
  $handler: (formData: FormData) => void;
};

const ProductForm: FC<Props> = (props) => {
  const form = useForm<FormData>({
    // @ts-ignore temp
    resolver: zodResolver(
      props.type === "create" ? createProductSchema : updateProductSchema,
    ),
    defaultValues:
      props.type === "update"
        ? props.initialValues
        : {
            name: "",
            description: "",
            price: 0,
            discount: undefined,
            sku: "",
            image: undefined,
          },
  });

  function onSubmit(formData: FormData) {
    props.$handler(formData);
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название товара</FormLabel>
              <FormControl>
                <Input placeholder="Принтер, коньки..." {...field} />
              </FormControl>
              <FormDescription>Name of the product.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Описание товара</FormLabel>
              <FormControl>
                <Input placeholder="Опишите товар..." {...field} />
              </FormControl>
              <FormDescription>Description of the product.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Цена</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Введите цену..."
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormDescription>Price of the product.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="discount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Скидка</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Введите скидку..."
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                Discounted price of the product.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sku"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Артикул</FormLabel>
              <FormControl>
                <Input placeholder="Введите артикул..." {...field} />
              </FormControl>
              <FormDescription>SKU of the product.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel>Изображение</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      onChange(file);
                    }
                  }}
                />
              </FormControl>

              <FormDescription>
                {typeof value === "string" ? value : value?.name}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <Button type="submit" disabled={props.isPending}>
            {props.type === "update" ? "Обновить товар" : "Добавить товар"}
          </Button>
          <Button
            type="reset"
            onClick={(e) => {
              e.preventDefault();
              form.reset();
            }}
            variant="secondary"
            disabled={props.isPending}
          >
            Сбросить
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ProductForm;
