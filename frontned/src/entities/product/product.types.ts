import type { UseOneProductTypes } from "./api/useOneProduct";

export namespace ProductTypes {
  export type Entity = Pick<
    UseOneProductTypes.Response,
    "id" | "name" | "price" | "photoFileName" | "description" | "discount"
  > & {
    category?: string;
    isInStock?: boolean;
  };
  // export type Entity = {
  //   id: number;
  //   name: string;
  //   price: number;
  //   photoFileName: string;
  //   inStock: boolean;
  //   category: string;
  //   description: string;
  //   priceWithDiscount: number;
  //   discount: number;
  // };
}
