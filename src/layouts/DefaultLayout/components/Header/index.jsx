import { faLocationDot, faTableList } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Button from "../../../../components/Button";
import Navigation from "../Navigation";
import SearchForm from "../SearchForm";
import Slider from "../Slider";
import style from "./Header.module.scss";

function Header() {
  return (
    <header>
      <Slider />
      <div className={style.wrapper}>
        <Link to="/home">
          <div className={style.logo__wrapper}>
            <img
              src="./src/assets/app-logo.svg"
              alt="cellphoneS logo"
              width="161px"
              height="30px"
            />
          </div>
        </Link>
        <Button icon={faTableList}>Danh mục</Button>
        <Button icon={faLocationDot}>
          <p>Xem giá tại</p>
          <p>Hà Nội</p>
        </Button>
        <SearchForm />
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
