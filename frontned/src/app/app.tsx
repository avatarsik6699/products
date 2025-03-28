import { type FC } from "react";
import "./app.css";
import { Outlet } from "@tanstack/react-router";
import QueryClientProvider from "./query-client";
import { Toaster } from "sonner";
import BackButton from "@shared/ui/enhanced/back-button";
import { DynamicBreadcrumbs } from "@shared/ui/enhanced/dynamic-breadcrumbs";

const App: FC = () => {
  return (
    <QueryClientProvider>
      <header className="flex flex-col gap-4 p-4">
        <div className="flex items-center justify-between">
          <BackButton />
        </div>
        <DynamicBreadcrumbs />
      </header>

      <main className="p-4 bg-background text-foreground">
        <Outlet />
      </main>

      <Toaster />
    </QueryClientProvider>
  );
};

export default App;
