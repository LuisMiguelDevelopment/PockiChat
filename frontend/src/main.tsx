import { Provider } from "./components/ui/provider";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { PockiContextProvider } from "./context/pocki.context";

createRoot(document.getElementById("root")!).render(
  <PockiContextProvider>
    <StrictMode>
      <Provider>
        <App />
      </Provider>
    </StrictMode>
  </PockiContextProvider>
);
