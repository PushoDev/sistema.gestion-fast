import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { TaskProvider } from "./context/TaskContext.tsx";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <TaskProvider>
        <BrowserRouter>
          <App />
          <Toaster />
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  </StrictMode>
);
