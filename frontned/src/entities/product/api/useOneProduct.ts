import { createSuspenseQuery } from "react-query-kit";
import { api } from "./endpoints";
import type { Product } from "@shared/api/models";

export namespace UseOneProductTypes {
  export type Response = Product;
  export type Variables = {
    productId: number;
  };
}

export const useOneProduct = createSuspenseQuery({
  queryKey: ["product-one"],
  fetcher: (
    variables: UseOneProductTypes.Variables,
  ): Promise<UseOneProductTypes.Response> => {
    return api.one(variables.productId);
  },
});
