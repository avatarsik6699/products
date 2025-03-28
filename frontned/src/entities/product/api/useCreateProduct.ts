import { createMutation } from "react-query-kit";
import { api } from "./endpoints";
import type { CreateProductDto } from "@shared/api/models";
import { z } from "zod";

export namespace UseCreateProductTypes {
  export type Variables = CreateProductDto;
}

export const useCreateProduct = createMutation({
  mutationKey: ["product-create"],
  mutationFn: async (variables: UseCreateProductTypes.Variables) => {
    return api.create(variables);
  },
});

export const createProductSchema = z.object({
  name: z
    .string({ required_error: "Название обязательно" })
    .min(1, { message: "Название должно содержать минимум 1 символ" })
    .max(255, { message: "Название не может превышать 255 символов" }),

  description: z
    .string({ required_error: "Описание обязательно" })
    .min(1, { message: "Описание должно содержать минимум 1 символ" })
    .max(512, { message: "Описание не может превышать 512 символов" }),

  price: z
    .number({ required_error: "Цена обязательна" })
    .min(0, { message: "Цена должна быть больше или равна 0" }),

  discount: z
    .number({ required_error: "Скидка обязательна" })
    .min(0, { message: "Скидка должна быть больше или равна 0" })
    .max(100, { message: "Скидка не может превышать 100%" })
    .default(0),

  photo: z.instanceof(File).optional(),

  sku: z
    .string({ required_error: "Артикул обязателен" })
    .min(1, { message: "Артикул должен содержать минимум 1 символ" })
    .max(100, { message: "Артикул не может превышать 100 символов" }),

  category: z
    .string({ required_error: "Категория обязательна" })
    .min(1, { message: "Категория должна содержать минимум 1 символ" }),

  inStock: z.boolean().default(false),
});
