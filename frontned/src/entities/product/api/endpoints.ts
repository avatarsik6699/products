import {
  productCreate,
  productFindAll,
  productFindOne,
  productRemove,
  productUpdate,
} from "@shared/api/products";

export const api = {
  list: productFindAll,
  one: productFindOne,
  create: productCreate,
  remove: productRemove,
  update: productUpdate,
};
