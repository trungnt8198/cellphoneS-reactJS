import PropTypes from "prop-types";
function Tab({ children, className }) {
  return <div className={className}>{children}</div>;
}

Tab.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
export default Tab;
