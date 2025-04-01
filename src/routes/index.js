import config from "../config";
import AdminLayout from "../layouts/AdminLayout";
import AdminProducts from "../pages/AdminProducts";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PageNotFound from "../pages/NotFound";
import ProductDetail from "../pages/ProductDetail";
import Products from "../pages/Products";
import Register from "../pages/Register";
import UserProfile from "../pages/UserProfile";

const routes = [
  {
    path: config.routes.home,
    component: Home,
  },
  {
    path: config.routes.products,
    component: Products,
  },
  {
    path: config.routes.productDetail,
    component: ProductDetail,
  },
  {
    path: config.routes.login,
    component: Login,
    layout: null,
  },
  {
    path: config.routes.register,
    component: Register,
    layout: null,
  },
  {
    path: config.routes.adminProducts,
    component: AdminProducts,
    layout: AdminLayout,
    protected: true,
  },
  {
    path: config.routes.userProfile,
    component: UserProfile,
  },
  {
    path: config.routes.notFound,
    component: PageNotFound,
  },
];

export default routes;
