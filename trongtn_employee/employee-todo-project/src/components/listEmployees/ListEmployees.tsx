import { Table, Divider, Button, Badge, Image, Pagination, Modal } from "antd";
import type { ColumnsType } from "antd/es/table";
import { iEmployeeType } from "../../types/employee.type";
import "./listEmployees_style.scss";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import employeeApi from "../../api/employee.api";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getAllEmployees } from "../../store/slices/employee.slice";
import { useState } from "react";
import ModalCreateOrUpdate from "../../common/modalCreateOrUpdate/ModalCreateOrCreate";
import { toast } from "react-toastify";

const ListEmployees = (props: any) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.employees.isLoading);
  const { listEmployeesByPage, isOpenCreateOrUpdate, handleToggleModal } =
    props;
  const [selectedEmployee, setSelectedEmployee] = useState<iEmployeeType>({});
  const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);
  const [currentId, setCurrentId] = useState<number>(0);

  const handleToggle = () => {
    setIsOpenConfirm(!isOpenConfirm);
  };
  const handleDelete = async (inputId: number) => {
    try {
      await employeeApi.deleteEmployeeById(inputId);
      dispatch(getAllEmployees());
      handleToggle();
      toast.success("Delete employee succeed!");
    } catch (e) {
      toast.error("Error from server!");
    }
  };

  const columns: ColumnsType<iEmployeeType> = [
    {
      title: "Avatar",
      render: (item) => {
        return <Image width={80} src={`${item?.avatar}`} />;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Country",
      dataIndex: "country",
    },
    {
      title: "Available",
      render: (item) =>
        item?.isAvailable ? (
          <Badge status="success" text="Active" />
        ) : (
          <Badge status="error" text="Not Active" />
        ),
    },
    {
      title: "Actions",
      render: (item) => (
        <div className="options">
          <Button
            type="primary"
            onClick={() => {
              handleToggleModal();
              setSelectedEmployee(item);
            }}
            icon={<EditOutlined />}
          />
          <Button
            type="primary"
            onClick={() => {
              setCurrentId(item?.id);
              handleToggle();
            }}
            icon={<DeleteOutlined />}
            danger
          />
        </div>
      ),
    },
  ];

  return (
    <div className="listEmployess">
      <div className="table-data">
        <Table
          columns={columns}
          dataSource={listEmployeesByPage}
          size="middle"
          pagination={false}
          loading={isLoading}
          rowKey="id"
        />
      </div>
      <Modal
        title="Confirmation"
        open={isOpenConfirm}
        onOk={() => handleDelete(currentId)}
        onCancel={handleToggle}
      >
        <p>Are you sure to delete this user?</p>
      </Modal>
      <ModalCreateOrUpdate
        isOpenCreateOrUpdate={isOpenCreateOrUpdate}
        handleToggleModal={handleToggleModal}
        selectedEmployee={selectedEmployee}
        setSelectedEmployee={setSelectedEmployee}
      />
    </div>
  );
};

export default ListEmployees;
