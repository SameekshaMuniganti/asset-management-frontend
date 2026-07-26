import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import UserDashboard from "./pages/UserDashboard";
import Category from "./pages/Category";
import Employee from "./pages/Employee";
import Asset from "./pages/Asset";
import Assignment from "./pages/Assignment";
import Profile from "./pages/Profile";

import MyAssets from "./pages/MyAsset";

import ProtectedRoute from "./components/ProtectedRoute";
import RoleProtectedRoute from "./components/RoleProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />

        

        {/* Admin Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute allowedRoles={["ADMIN"]}>
                <Dashboard />
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        />

        {/* User Dashboard */}
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute allowedRoles={["USER"]}>
                <UserDashboard />
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        />

        {/* Categories */}
        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute allowedRoles={["ADMIN"]}>
                <Category />
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        />

        {/* Employees */}
        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute allowedRoles={["ADMIN"]}>
                <Employee />
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        />

        {/* Assets */}
        <Route
          path="/assets"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute allowedRoles={["ADMIN"]}>
                <Asset />
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        />

        {/* Assignments */}
        <Route
          path="/assignments"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute allowedRoles={["ADMIN"]}>
                <Assignment />
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <RoleProtectedRoute allowedRoles={["ADMIN", "USER"]}>
                <Profile />
              </RoleProtectedRoute>
            </ProtectedRoute>
          }
        />
        <Route path="/my-assets" element={<MyAssets />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;