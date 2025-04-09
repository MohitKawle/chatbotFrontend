// src/routes/MainRoutes.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

const componentMap = {
  signIn: React.lazy(() => import("../components/authcomp/Signin")),
  register: React.lazy(() => import("../components/authcomp/Register")),
  dashboard: React.lazy(() => import("../pages/Dashboard")),
};

const RoutesConfig = [
  { path: "/signin", element: "signIn", private: false },
  { path: "/register", element: "register", private: false },
  { path: "/", element: "dashboard", private: true },
];

export default function MainRoutes() {
  return (
    <React.Suspense fallback={<h1>Loading...</h1>}>
      <Routes>
        {RoutesConfig.map((route, index) => {
          const Component = componentMap[route.element];
          if (!Component) return null;

          const WrappedElement = route.private ? (
            <ProtectedRoute>
              <Component {...(route.props || {})} />
            </ProtectedRoute>
          ) : (
            <PublicRoute>
              <Component {...(route.props || {})} />
            </PublicRoute>
          );

          return (
            <Route key={index} path={route.path} element={WrappedElement} />
          );
        })}
      </Routes>
    </React.Suspense>
  );
}
