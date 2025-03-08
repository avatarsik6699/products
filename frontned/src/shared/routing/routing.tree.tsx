import App from "@app/app";
import ProductsPage from "@pages/products/products.page";
import { createRootRoute, createRoute } from "@tanstack/react-router";

const app = createRootRoute({
  component: App,
});

const products = createRoute({
  getParentRoute: () => app,
  path: "/",
  component: ProductsPage,
});

const about = createRoute({
  getParentRoute: () => app,
  path: "/about",
  component: function About() {
    return <div className="p-2">Hello from About!</div>;
  },
});

export const routeTree = app.addChildren([products, about]);
