import PropTypes from "prop-types";
import { Navigate, useLocation } from "react-router-dom";
import config from "../../config";
import { useUser } from "../../hooks/useUser";

function ProtectedRoute({ children }) {
  const location = useLocation();

  const { user, loading } = useUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    const path = encodeURIComponent(location.pathname);
    return <Navigate to={`${config.routes.login}?continue=${path}`} />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
