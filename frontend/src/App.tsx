import { Routes, Route } from "react-router-dom";

import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { TasksPage } from "./pages/TasksPage";
import { TaskFormPage } from "./pages/TaskFormPage";
import { ProfilePage } from "./pages/ProfilePage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <main className="container mx-auto px-10">
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Private Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/add-task" element={<TaskFormPage />} />
          <Route path="/tasks/:id" element={<TaskFormPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;

