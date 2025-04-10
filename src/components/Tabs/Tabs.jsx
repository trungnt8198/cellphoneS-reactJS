import PropTypes from "prop-types";
import { Children, useEffect, useRef, useState } from "react";

function Tabs({ children, defaultIndex = 0, onChange, className }) {
  const tabs = Children.toArray(children);
  const [currentIndex, setCurrentIndex] = useState(defaultIndex);
  const prevIndex = useRef(currentIndex);

  useEffect(() => {
    if (prevIndex.current !== currentIndex && typeof onChange === "function") {
      onChange(currentIndex);
    }
    prevIndex.current = currentIndex;
  }, [currentIndex, onChange]);

  return (
    <div className={className}>
      <div>
        {tabs.map((tab, index) => {
          const active = index === currentIndex;
          return (
            <button
              key={index}
              style={{ color: active ? "red" : "black" }}
              onClick={() => {
                setCurrentIndex(index);
                if (typeof tab.props.onClick === "function") {
                  tab.props.onClick();
                }
              }}
            >
              {tab.props.title}
            </button>
          );
        })}
      </div>
      <div>{tabs[currentIndex]}</div>
    </div>
  );
}

Tabs.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  defaultIndex: PropTypes.number,
  onChange: PropTypes.func,
};

export default Tabs;
