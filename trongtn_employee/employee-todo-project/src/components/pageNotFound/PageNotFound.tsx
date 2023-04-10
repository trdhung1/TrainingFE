import { Button, Result } from "antd";
import { Link } from "react-router-dom";
import "./pageNotFound_style.scss";

function PageNotFound() {
  return (
    <div className="page-not-found">
      <Result
        status="404"
        title="404"
        subTitle="Xin lỗi, trang bạn đang vào không tồn tại."
        extra={
          <Button type="default">
            <Link to="/">Quay lại Trang chủ</Link>
          </Button>
        }
      />
    </div>
  );
}

export default PageNotFound;
