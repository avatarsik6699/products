import App from "@app/app";
import CreateProductPage from "@pages/create-product/create-product.page";
import ProductDetailsPage from "@pages/product/product.page";
import ProductsPage from "@pages/products/products.page";
import UpdateProductPage from "@pages/update-product/update-product.page";
import { createRootRoute, createRoute } from "@tanstack/react-router";

const app = createRootRoute({
  component: App,
});

const productsPage = createRoute({
  getParentRoute: () => app,
  path: "/",
  component: ProductsPage,
});

const createProductPage = createRoute({
  getParentRoute: () => app,
  path: "/create-product",
  component: CreateProductPage,
});

const updateProductPage = createRoute({
  getParentRoute: () => app,
  path: "/update-product/$productId",
  component: UpdateProductPage,
});

const productPage = createRoute({
  getParentRoute: () => app,
  path: "/$productId",
  component: ProductDetailsPage,
});

export const routeTree = app.addChildren([
  productsPage,
  createProductPage,
  updateProductPage,
  productPage,
]);
