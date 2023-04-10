import { Pagination } from "antd";
import "./footer_style.scss";

function FooterPage(props: any) {
  const { page, listEmployeesByPage, listEmployees, handleSetPage } = props;
  return (
    <div className="footer">
      <Pagination
        current={page}
        size="small"
        total={listEmployees?.length}
        pageSize={4}
        showTotal={(total) =>
          `Showing ${listEmployeesByPage?.length} out of ${total} entries`
        }
        onChange={(page) => {
          handleSetPage(page);
        }}
      />
    </div>
  );
}

export default FooterPage;
