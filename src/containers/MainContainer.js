import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Header from "./Header";
import Error from "../components/Error";
import Dashboard from "./Dashboard";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import appStore from "../utils/redux/appStore";
import Title from "../components/Title";
import { lazy, Suspense, useEffect } from "react";
import Login from "../containers/Login";
import ProtectedRoute from "../components/ProtectedRoute";
const ProductComponent = lazy(() => import("./Product"));
const CategoryComponent = lazy(() => import("./Category"));
import { LoadingOutlined } from "@ant-design/icons";

const AppLayout = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <div className="md:w-55 md:flex-shrink-0 hidden md:block ">
        <Header />
      </div>

      <div className="flex-1 overflow-y-auto bg-gray-50">
        <Title />
        <Outlet />
      </div>
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/login",
    element: <Login />, // login remains public
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/products",
        element: (
          <Suspense fallback={<LoadingOutlined />}>
            <ProductComponent />
          </Suspense>
        ),
      },
      {
        path: "/categories",
        element: (
          <Suspense fallback={<LoadingOutlined />}>
            <CategoryComponent />
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
      {/* <PersistGate loading={<div>Loading...</div>} persistor={persistor}> */}
      <RouterProvider router={appRouter} />
      {/* </PersistGate> */}
    </Provider>
  );
};

export default MainContainer;
