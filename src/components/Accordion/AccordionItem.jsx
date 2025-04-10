import React from "react";

import PropTypes from "prop-types";
function AccordionItem({ children }) {
  return children;
}

AccordionItem.propTypes = {
  children: PropTypes.node,
  header: PropTypes.string,
  className: PropTypes.string,
};
export default AccordionItem;
