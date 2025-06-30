// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { DentalProvider } from "./context/DentalContext";
import { initializeDataOnce } from "./utils/helpers"; // ✅ Correct import

import "./index.css";

// ✅ Initialize mock data only once
initializeDataOnce();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <DentalProvider>
          <App />
        </DentalProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
