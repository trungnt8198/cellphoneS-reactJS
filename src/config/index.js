const config = {
  routes: {
    home: "/",
    login: "/login",
    register: "/register",
    products: "/products",
    userProfile: "/p/:username",
    productDetail: "/products/:slug",
    adminProducts: "/admin/products",
    notFound: "*",
  },
};

export default config;
