import { Navigate } from "react-router-dom";

function PrivateRoute({ children }: any) {
  const accessToken = JSON.parse(localStorage.getItem("access_token") || "{}");
  return accessToken?.isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
}

export default PrivateRoute;
