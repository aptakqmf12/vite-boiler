import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter as Router } from "react-router-dom";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <ReactQueryDevtools initialIsOpen={false} />

      <React.StrictMode>
        <Router>
          <App />
        </Router>
      </React.StrictMode>
    </QueryClientProvider>
  </React.StrictMode>
);
