import { App } from "App";
import { RainbowProvider } from "Provider";
import React from "react";
import ReactDOM from "react-dom/client";



ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RainbowProvider>
      <App />
    </RainbowProvider>
  </React.StrictMode>
);
