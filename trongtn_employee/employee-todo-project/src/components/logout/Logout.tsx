import { LogoutOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useAppDispatch } from "../../store/store";
import { authActions } from "../../store/slices/auth.slice";
import { useNavigate } from "react-router-dom";

function Logout() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(authActions.logout());
    localStorage.removeItem("access_token");
    navigate("/login");
  };
  return (
    <div className="logout">
      <Button onClick={handleLogout}>
        <LogoutOutlined />
      </Button>
    </div>
  );
}

export default Logout;
