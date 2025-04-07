import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./Loading.module.scss";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const Loading = () => {
  return (
    <div className={style.wrapper}>
      <FontAwesomeIcon icon={faCircleNotch} size="4x" spin />
    </div>
  );
};

export default Loading;
