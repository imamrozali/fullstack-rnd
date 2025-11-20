import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

async function enableMSW() {
  if (import.meta.env.VITE_API_MOCKING === "enabled") {
    const { worker } = await import("./mocks/browser.ts");

    return worker.start({
      serviceWorker: {
        url: `${import.meta.env.VITE_BASE_PATH || "/"}mockServiceWorker.js`,
      },
      onUnhandledRequest: "warn",
    });
  }
}

enableMSW().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
