import { Navigate } from "react-router-dom";

interface iPrivateProps {
  children: React.ReactElement;
}

function PrivateRoute({ children }: iPrivateProps) {
  const accessToken = JSON.parse(localStorage.getItem("access_token") || "{}");
  return accessToken?.isLoggedIn ? <>{children}</> : <Navigate to="/login" />;
}

export default PrivateRoute;
