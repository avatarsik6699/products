import { createSuspenseQuery } from "react-query-kit";
import { api } from "./endpoints";
import type { Product } from "@shared/api/models";
import type { ProductTypes } from "@entities/product/product.types";

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

export const toEntity = (
  product: UseOneProductTypes.Response,
): ProductTypes.Entity => {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    photoFileName: product.photoFileName ?? "",
    inStock: true,
    description: product.description,
    // TODO: add category
    category: "test",
    // TODO: discount should be max 100
    priceWithDiscount: (100 - product.discount) * product.price,
  };
};
