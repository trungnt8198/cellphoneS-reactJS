import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import style from "./DefaultLayout.module.scss";
function DefaultLayout() {
  return (
    <div>
      <Header />
      <main className={style.main__wrapper}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default DefaultLayout;
