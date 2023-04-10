import { Button, Checkbox, Form, Input } from "antd";
import authApi from "../../api/auth.api";
import { authActions } from "../../store/slices/auth.slice";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { Navigate, useNavigate } from "react-router-dom";
import "./login_style.scss";

function Login() {
  const accessToken = JSON.parse(localStorage.getItem("access_token") || "{}");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.auth.isLoading);

  const onFinish = async (inputData: { email: string; password: string }) => {
    try {
      dispatch(authActions.login(inputData));
      const response = await authApi.login(inputData);
      if (response.status === 200) {
        dispatch(authActions.loginSuccess(inputData));
        localStorage.setItem(
          "access_token",
          JSON.stringify({
            isLoggedIn: true,
            token: response.data.token,
          })
        );
        navigate("/");
      } else {
        dispatch(authActions.loginFailed(inputData));
      }
    } catch (e) {
      dispatch(authActions.loginFailed(inputData));
    }
  };
  return accessToken?.isLoggedIn ? (
    <Navigate to="/" />
  ) : (
    <div className="login">
      <div className="text">Login</div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        labelAlign="left"
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button loading={isLoading} type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default Login;
