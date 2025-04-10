import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { Children, Fragment, useEffect, useRef, useState } from "react";
import style from "./Accordion.module.scss";
function Accordion({
  children,
  defaultIndex = 0,
  onChange,
  collapseOthers = false,
  className,
}) {
  const items = Children.toArray(children);
  const [openedItems, setOpenedItems] = useState([defaultIndex]);
  const [currentIndex, setCurrentIndex] = useState(defaultIndex);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const prevIndex = useRef(currentIndex);

  useEffect(() => {
    if (prevIndex.current !== currentIndex && typeof onChange === "function") {
      onChange(currentIndex);
    }
    prevIndex.current = currentIndex;
  }, [currentIndex, onChange]);

  const handleOnclick = (index) => {
    setCurrentIndex(index);

    if (collapseOthers) {
      if (openedItems.includes(index)) {
        setOpenedItems([]);
      } else {
        setOpenedItems([index]);
      }
      return;
    }

    if (openedItems.includes(index)) {
      setOpenedItems((prev) => [...prev.filter((item) => item !== index)]);
    } else {
      setOpenedItems((prev) => [...prev, index]);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      setHighlightedIndex((prev) => {
        return prev === items.length - 1 ? 0 : prev + 1;
      });
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      setHighlightedIndex((prev) => {
        return prev === 0 ? items.length - 1 : prev - 1;
      });
    }
    if (event.key === "Enter") {
      handleOnclick(highlightedIndex);
      setCurrentIndex(highlightedIndex);
    }
  };

  const handleMouseDown = () => {
    setHighlightedIndex(-1);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("mousedown", handleMouseDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("mousedown", handleMouseDown);
    };
  });

  return (
    <div className={className || style.wrapper}>
      {items.map((item, index) => {
        const active = openedItems.includes(index);
        const highlighted = highlightedIndex === index;
        return (
          <Fragment key={index}>
            <div
              className={`${
                highlighted ? style.item__header__highlighted : ""
              } ${style.item__header} ${
                active ? style.item__header__active : ""
              }`}
              onClick={() => handleOnclick(index)}
            >
              <span>{item.props.header}</span>
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`${style.item__header__icon} ${
                  active ? style.item__header__icon__active : ""
                }`}
              />
            </div>
            <div
              className={`${style.item__content} ${
                active ? style.item__content__active : ""
              }`}
            >
              {item.props.children}
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}

Accordion.propTypes = {
  children: PropTypes.node,
  defaultIndex: PropTypes.number,
  onChange: PropTypes.func,
  collapseOthers: PropTypes.bool,
  className: PropTypes.string,
};

export default Accordion;
