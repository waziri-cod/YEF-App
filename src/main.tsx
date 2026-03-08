/**
 * ============================================
 * APPLICATION ENTRY POINT
 * ============================================
 * Main entry point for the React application
 * Initializes the app and mounts it to the DOM
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Get root element
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found. Make sure there's a div with id='root' in your HTML.");
}

// Create React root and render app
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
