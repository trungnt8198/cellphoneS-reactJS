import { Route, Routes } from "react-router-dom";
import routes from "../../routes";
import NoLayout from "../../layouts/NoLayout";
import DefaultLayout from "../../layouts/DefaultLayout";
import ProtectedRoute from "../ProtectedRoute";
import { Fragment } from "react";

function AppRoutes() {
  return (
    <Routes>
      {routes.map((route) => {
        const Component = route.component;
        const Layout =
          route.layout === null ? NoLayout : route.layout || DefaultLayout;
        const AppRoute = route.protected ? ProtectedRoute : Fragment;
        return (
          <Route key={route.path} element={<Layout />}>
            <Route
              path={route.path}
              element={
                <AppRoute>
                  <Component />
                </AppRoute>
              }
            />
          </Route>
        );
      })}
    </Routes>
  );
}

export default AppRoutes;
