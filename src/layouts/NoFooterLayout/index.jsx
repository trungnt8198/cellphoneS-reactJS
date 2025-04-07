import { Outlet } from "react-router-dom";
import Header from "../DefaultLayout/components/Header";
import style from "./NoFooterLayout.module.scss";
function NoFooterLayout() {
  return (
    <div>
      <Header />
      <main className={style.main__wrapper}>
        <Outlet />
      </main>
    </div>
  );
}

export default NoFooterLayout;
