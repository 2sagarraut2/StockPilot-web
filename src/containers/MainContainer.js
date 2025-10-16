import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from "./Header";
import Error from "../components/Error";
import Dashboard from "./Dashboard";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import appStore, { persistor } from "../utils/redux/appStore";
import Title from "../components/Title";
import { lazy, Suspense, useEffect, useState } from "react";
import Login from "../containers/Login";
import ProtectedRoute from "../components/ProtectedRoute";

// Lazy-loaded components
const ProductComponent = lazy(() => import("./Product"));
const CategoryComponent = lazy(() => import("./Category"));
const StockInOutComponent = lazy(() => import("./StockInOut"));

// Lightweight fallback for Suspense
const SuspenseFallback = () => (
  <div
    style={{
      height: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.2rem",
    }}
  >
    Loading...
  </div>
);

// App Layout
const AppLayout = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Header />

      <div className="flex-1 overflow-y-auto bg-gray-50">
        <Title />
        <Outlet />
      </div>
    </div>
  );
};

// Optimized router
const appRouter = createBrowserRouter([
  {
    path: "/login",
    element: <Login />, // public route
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/", element: <Dashboard /> },
      {
        path: "/products",
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <ProductComponent />
          </Suspense>
        ),
      },
      {
        path: "/categories",
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <CategoryComponent />
          </Suspense>
        ),
      },
      {
        path: "/stockInOut",
        element: (
          <Suspense fallback={<SuspenseFallback />}>
            <StockInOutComponent />
          </Suspense>
        ),
      },
      { path: "*", element: <Error /> },
    ],
  },
]);

const MainContainer = () => {
  return (
    <Provider store={appStore}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={appRouter} />
      </PersistGate>
    </Provider>
  );
};

export default MainContainer;
