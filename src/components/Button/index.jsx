import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import clsx from "clsx";

import styles from "./Button.module.scss";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Button({
  children,
  icon,
  to = "",
  href = "",
  className = "",
  primary = false,
  secondary = false,
  rounded = false,
  size = "very-small",
  disabled = false,
  loading = false,
  type = "button",
  onClick,
}) {
  let Component = "button";
  const passProps = { type };

  if (to) {
    Component = Link;
    passProps.to = to;
  }
  if (href) {
    Component = "a";
    passProps.href = href;
  }

  const handleClick = () => {
    if (disabled || loading) return;
    onClick && onClick();
  };

  return (
    <Component
      {...passProps}
      className={clsx(styles.wrapper, className, {
        [styles.primary]: primary,
        [styles.secondary]: secondary,
        [styles.rounded]: rounded,
        [styles[size]]: size,
        [styles.disabled]: disabled || loading,
      })}
      onClick={handleClick}
    >
      {loading ? (
        <FontAwesomeIcon icon={faSpinner} spin />
      ) : (
        <>
          {icon && (
            <FontAwesomeIcon
              icon={icon}
              size="2xs"
              style={{ width: "20px", height: "20px", marginRight: "3px" }}
            />
          )}
          <span>{children}</span>
        </>
      )}
    </Component>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  to: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.object,
  primary: PropTypes.bool,
  secondary: PropTypes.bool,
  rounded: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium", "large"]),
  type: PropTypes.oneOf(["button", "submit"]),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
