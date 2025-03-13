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
    .string({ required_error: "Name is required" })
    .min(1, { message: "Name must be at least 1 character long" })
    .max(255, { message: "Name cannot exceed 255 characters" }),

  description: z
    .string({ required_error: "Description is required" })
    .min(1, { message: "Description must be at least 1 character long" })
    .max(512, { message: "Description cannot exceed 512 characters" }),

  price: z
    .number({ required_error: "Price is required" })
    .min(0, { message: "Price must be greater than or equal to 0" }),

  discount: z
    .number()
    .min(0, { message: "Discount must be greater than or equal to 0" })
    .optional(),

  sku: z
    .string({ required_error: "SKU is required" })
    .min(1, { message: "SKU must be at least 1 character long" })
    .max(100, { message: "SKU cannot exceed 100 characters" }),

  image: z.instanceof(File).optional(),
});
