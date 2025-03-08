import { useEffect, type FC } from "react";
import "./app.css";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { Outlet } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Button } from "@shared/ui/button";

const client = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, retry: false },
    mutations: { retry: false },
  },
});

const App: FC = () => {
  return (
    <QueryClientProvider client={client}>
      <div>
        {/* <Header /> */}
        <Button>R</Button>
        <main>
          <Outlet />
        </main>

        <TanStackRouterDevtools />
      </div>
    </QueryClientProvider>
  );
};

export default App;
