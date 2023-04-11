import { Button, Form, Input, Modal } from "antd";
import employeeApi from "../../api/employee.api";
import { iEmployeeType } from "../../types/employee.type";
import { useAppDispatch } from "../../store/store";
import { getAllEmployees } from "../../store/slices/employee.slice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function ModalCreateOrUpdate(props: any) {
  const dispatch = useAppDispatch();
  const {
    selectedEmployee,
    setSelectedEmployee,
    isOpenCreateOrUpdate,
    handleToggleModal,
  } = props;
  const [form] = Form.useForm();
  useEffect(() => {
    if (selectedEmployee && JSON.stringify(selectedEmployee) !== "{}") {
      form.setFieldsValue({
        name: selectedEmployee?.name,
        age: selectedEmployee?.age,
        phone: selectedEmployee?.phone,
        country: selectedEmployee?.country,
      });
    }
  }, [selectedEmployee]);

  const handleSubmit = async (data: iEmployeeType) => {
    if (selectedEmployee && JSON.stringify(selectedEmployee) !== "{}") {
      try {
        await employeeApi.update(selectedEmployee?.id, {
          ...data,
          isAvailable: selectedEmployee?.isAvailable,
          avatar: selectedEmployee?.avatar,
        });
        dispatch(getAllEmployees());
        toast.success("Update employee succeed!");
        handleToggleModal();
        form.resetFields();
        setSelectedEmployee({});
      } catch (e) {
        toast.error("Error from server!");
      }
    } else {
      try {
        await employeeApi.create({
          ...data,
          avatar:
            "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
          isAvailable: false,
        });
        dispatch(getAllEmployees());
        toast.success("Create a new employee succeed!");
        handleToggleModal();
        form.resetFields();
      } catch (e) {
        toast.error("Error from server!");
      }
    }
  };
  return (
    <div className="modal-create">
      <Modal
        title={
          selectedEmployee && JSON.stringify(selectedEmployee) !== "{}"
            ? "Update employee"
            : "Create a new employee"
        }
        open={isOpenCreateOrUpdate}
        onCancel={() => {
          handleToggleModal();
          setSelectedEmployee({});
          form.resetFields();
        }}
        footer={null}
      >
        <Form
          form={form}
          layout="vertical"
          size="middle"
          onFinish={handleSubmit}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                validator: (_, value) =>
                  !value?.trim()
                    ? Promise.reject(new Error("Please input name!"))
                    : Promise.resolve(),
                message: "Please input name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Age"
            name="age"
            rules={[
              {
                validator: (_, value) =>
                  !value?.trim()
                    ? Promise.reject(new Error("Please input age!"))
                    : Promise.resolve(),
                message: "Please input age!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                validator: (_, value) =>
                  !value?.trim()
                    ? Promise.reject(new Error("Please input phone!"))
                    : Promise.resolve(),
                message: "Please input phone!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Country"
            name="country"
            rules={[
              {
                validator: (_, value) =>
                  !value?.trim()
                    ? Promise.reject(new Error("Please input country!"))
                    : Promise.resolve(),
                message: "Please input country!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <div
            className="options"
            style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
          >
            <Form.Item>
              <Button
                onClick={() => {
                  setSelectedEmployee({});
                  handleToggleModal();
                  form.resetFields();
                }}
              >
                Cancel
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="button">
                Confirm
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default ModalCreateOrUpdate;
