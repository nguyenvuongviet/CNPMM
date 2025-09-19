import { Route } from "react-router-dom";
import UserTemplate from "../pages/UserTemplate";
import Home from "../pages/UserTemplate/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";

const routes = [
  {
    path: "",
    element: UserTemplate,
    children: [
      {
        path: "",
        element: Home,
      },
    ],
  },
  {
    path: "login",
    element: Login,
  },
  {
    path: "register",
    element: Register
  },
];

export const renderRoutes = () => {
  return routes.map((route) => {
    if (route.children) {
      return (
        <Route key={route.path} path={route.path} element={<route.element />}>
          {route.children.map((item) => (
            <Route
              key={item.path}
              path={item.path}
              element={<item.element />}
            />
          ))}
        </Route>
      );
    } else {
      return (
        <Route key={route.path} path={route.path} element={<route.element />} />
      );
    }
  });
};
