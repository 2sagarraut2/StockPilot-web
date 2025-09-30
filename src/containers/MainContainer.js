import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Product from "./Product";
import Header from "./Header";
import Error from "../components/Error";
import CategoryTable from "./Category";
import StockAlerts from "../components/StockAlerts";
import Dashboard from "./Dashboard";
import { Provider } from "react-redux";
import appStore from "../utils/redux/appStore";
import Title from "../components/Title";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setStock } from "../utils/redux/stockSlice";

const AppLayout = () => {
  return (
    <div className="flex">
      <Header />

      <div className="flex-1">
        <Title />
        <Outlet />
      </div>
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      { path: "/products", element: <Product /> },
      { path: "/categories", element: <CategoryTable /> },
      { path: "/stock-alerts", element: <StockAlerts /> },

      { path: "*", element: <Error /> },
    ],
  },
]);

const MainContainer = () => {
  return (
    <Provider store={appStore}>
      <RouterProvider router={appRouter} />
    </Provider>
  );
};

export default MainContainer;
