import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// Example: checking token in localStorage
const ProtectedRoute = ({ children }) => {
  const user = useSelector((store) => store.user.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
