import { createInfiniteQuery } from "react-query-kit";
import { api } from "./endpoints";
import type {
  FindAllProductsResponseDto,
  ProductFindAllParams,
} from "@shared/api/models";

export namespace UseProductListTypes {
  export type Response = FindAllProductsResponseDto;
  export type Variables = ProductFindAllParams;
}

export const useProductList = createInfiniteQuery({
  queryKey: ["product-list"],
  initialPageParam: 1,
  fetcher: async (
    variables: UseProductListTypes.Variables,
  ): Promise<UseProductListTypes.Response> => {
    return api.list(variables);
  },
  getNextPageParam: (lastPage) => {
    return lastPage.meta?.hasNextPage ? lastPage.meta.page + 1 : null;
  },
});
