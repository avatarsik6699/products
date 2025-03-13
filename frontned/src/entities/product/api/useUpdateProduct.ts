import { createMutation } from "react-query-kit";
import { api } from "./endpoints";
import type { UpdateProductDto } from "@shared/api/models";
import { createProductSchema } from "./useCreateProduct";

export namespace UseCreateProductTypes {
  export type Variables = {
    productId: number;
    dataToUpdate: UpdateProductDto;
  };
}

export const useUpdateProduct = createMutation({
  mutationKey: ["product-update"],
  mutationFn: async (variables: UseCreateProductTypes.Variables) => {
    return api.update(variables.productId, variables.dataToUpdate);
  },
});

export const updateProductSchema = createProductSchema.partial();
