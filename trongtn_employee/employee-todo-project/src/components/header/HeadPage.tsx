import { Button, Input } from "antd"
import './headerPage_style.scss'
import { PlusCircleOutlined } from "@ant-design/icons"
import { useState } from "react"
import ModalCreate from "../../common/ModalCreate/ModalCreate";

function HeaderPage(props: any) {
    const {isOpenCreateOrUpdate, handleToggleModal} = props;
    // const [isOpenModalCreate, setIsOpenModalCreate] = useState<boolean>(false);
    // const handleToggleModal = () => {
    //     setIsOpenModalCreate(!isOpenModalCreate);
    // }
    return <div className="header-page">
        <div className="text">
            Employees Management
        </div>
        <div className="options">
            <Input placeholder="Search" />
            <Button onClick={handleToggleModal}><PlusCircleOutlined />Add new employees</Button>
        </div>
        <ModalCreate isOpenModalCreate={isOpenCreateOrUpdate} handleToggleModal={handleToggleModal}/>
    </div>
}

export default HeaderPage