import { Button, Result } from "antd";
import { Link } from "react-router-dom";
import "./pageNotFound_style.scss";

function PageNotFound() {
  return (
    <div className="page-not-found">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="default">
            <Link to="/">Back Home</Link>
          </Button>
        }
      />
    </div>
  );
}

export default PageNotFound;
