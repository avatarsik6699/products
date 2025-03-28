export namespace ProductTypes {
  export type Entity = {
    id: number;
    name: string;
    price: number;
    photoFileName: string;
    inStock: boolean;
    category: string;
    description: string;
    priceWithDiscount: number;
  };
}
