import { type FC } from "react";
import "./app.css";
import { Outlet } from "@tanstack/react-router";
import QueryClientProvider from "./query-client";
import { Toaster } from "sonner";

const App: FC = () => {
  return (
    <QueryClientProvider>
      <main className="py-8">
        <Outlet />
      </main>

      <Toaster />
    </QueryClientProvider>
  );
};

export default App;
