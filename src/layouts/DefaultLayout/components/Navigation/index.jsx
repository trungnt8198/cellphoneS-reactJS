import {
  faCartShopping,
  faLocationDot,
  faRightFromBracket,
  faSearch,
  faUser,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons/faPhone";
import { useNavigate } from "react-router-dom";
import Button from "../../../../components/Button";
import { useUser } from "../../../../hooks/useUser";
import { logout } from "../../../../services/authService";
import httpRequest from "../../../../utils/httpRequest";
import style from "./Navigation.module.scss";
import { useEffect, useState } from "react";

function Navigation() {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
      httpRequest.removeToken();
      setUser(null);
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className={style.wrapper}>
      <Button to="/" className={style.nav__link} icon={faPhone}>
        <div>
          Gọi mua hàng
          <br />
          1800.2097
        </div>
      </Button>
      <Button to="/" className={style.nav__link} icon={faLocationDot}>
        <div>
          Cửa hàng
          <br />
          gần bạn
        </div>
      </Button>
      <Button to="/" className={style.nav__link} icon={faSearch}>
        <div>
          Tra cứu
          <br />
          đơn hàng
        </div>
      </Button>
      <Button to="/" className={style.nav__link} icon={faCartShopping}>
        <div>
          Giỏ
          <br />
          hàng
        </div>
      </Button>
      {user?.username ? (
        <>
          <Button
            to={`/p/${user.username}`}
            className={style.nav__link}
            icon={faUserCircle}
          >
            <p>{user.firstName}</p>
          </Button>
          <Button
            className={style.nav__link}
            icon={faRightFromBracket}
            onClick={handleLogout}
            loading={loading}
          >
            <p>Đăng Xuất</p>
          </Button>
        </>
      ) : (
        <Button to="/login" className={style.nav__link} icon={faUser}>
          <p>Đăng nhập</p>
        </Button>
      )}
    </nav>
  );
}

export default Navigation;
