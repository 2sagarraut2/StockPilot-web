import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Body from "./Body";
import Header from "./Header";
import Error from "./Error";

const AppLayout = () => {
  return (
    <div>
      <Header />
      <div>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "/", element: <Body /> },
      { path: "*", element: <Error /> },
    ],
  },
]);

const MainContainer = () => {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default MainContainer;
