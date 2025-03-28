import { createMutation } from "react-query-kit";
import { api } from "./endpoints";

export namespace UseRemoveProductTypes {
  export type Variables = {
    productId: number;
  };
}

export const useRemoveProduct = createMutation({
  mutationKey: ["product-remove"],
  mutationFn: async (variables: UseRemoveProductTypes.Variables) => {
    return api.remove(variables.productId);
  },
});
