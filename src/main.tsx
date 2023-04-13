import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter as Router } from "react-router-dom";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // React.StrictMode 사용시 MUI에서 findDOMNode 충돌
  <>
    <QueryClientProvider client={client}>
      <ReactQueryDevtools initialIsOpen={false} />

      <Router>
        <App />
      </Router>
    </QueryClientProvider>
  </>
);
