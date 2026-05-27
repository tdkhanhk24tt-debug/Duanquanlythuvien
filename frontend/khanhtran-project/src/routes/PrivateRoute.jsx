import { Navigate } from "react-router-dom";
import { isAdmin } from "../utils/auth";

function PrivateRoute({ children }) {

  if (!isAdmin()) {
    return <Navigate to="/" />;
  }

  return children;
}

export default PrivateRoute;