import {
  productCreate,
  productFindAll,
  productFindOne,
  productRemove,
  productUpdate,
} from "@shared/api/products";

export const productApi = {
  list: productFindAll,
  one: productFindOne,
  create: productCreate,
  remove: productRemove,
  update: productUpdate,
};
