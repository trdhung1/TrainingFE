import { Pagination } from "antd";

function FooterPage(props: any) {
    const {listEmployeesByPage, listEmployees, handleSetPage} = props;
    return (
    <div className="footer">
        <Pagination 
            size="small" 
            total={listEmployees?.length} 
            pageSize = {5}
            showTotal={(total) => (`Showing ${listEmployeesByPage?.length} out of ${total} entries`)}
            onChange={(page) => {
                console.log('check page', page);
                handleSetPage(page);
          }} />
    </div>
    )
}

export default FooterPage;