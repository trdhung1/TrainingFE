
import { Table, Divider, Button, Badge, Image, Pagination, Modal } from 'antd';import type { ColumnsType } from 'antd/es/table';
import { iEmployeeType } from '../../types/employee.type';
import './listEmployees_style.scss'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import employeeApi from '../../api/employee.api';
import { useAppDispatch } from '../../store/store';
import { getAllEmployees } from '../../store/slices/employee.slice';
import { useState } from 'react';
import ModalCreate from '../../common/ModalCreate/ModalCreate';

const ListEmployees = (props: any) => {
    const {listEmployeesByPage, isOpenCreateOrUpdate, handleToggleModal} = props;
    const [selectedEmployee, setSelectedEmployee] = useState<iEmployeeType>({});
    const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);
    const [currentId, setCurrentId] = useState<number>(0);
    const dispatch = useAppDispatch();

    const handleToggle = () => {
        setIsOpenConfirm(!isOpenConfirm);
    }
    const handleDelete = async (inputId: number) => {
        try {
            await employeeApi.deleteEmployeeById(inputId);
            dispatch(getAllEmployees());
            handleToggle();
        } catch (e) {
            console.log(e);        
        }
    }

    const columns: ColumnsType<iEmployeeType> = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            render: (item) => (
                <Image
                    width={80}
                    src='https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
                />
            )
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Age',
            dataIndex: 'age',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
        },
        {
            title: 'Country',
            dataIndex: 'country',
        },
        {
            title: 'IsAvailable',
            render: (item) => (
                item?.isAvailable ? <Badge status="success"  text="Active"/> : <Badge status="error"  text="Not Active"/>     
            )
        },
        {
            title: 'Actions',
            render: (item) => (
                <div className='options'>
                    <Button type="primary" onClick={() => {
                        handleToggleModal();
                        setSelectedEmployee(item)
                    }} icon={<EditOutlined />}/>
                    <Button type="primary" onClick={() => {
                        setCurrentId(item?.id);
                        handleToggle();
                        
                        }} icon={<DeleteOutlined />} danger/>
                </div>
            )
        },
    ];
    
    
    return (
        <div className='listEmployess'>
          <Divider>Middle size table</Divider>
          <div className='table-data'>
            <Table columns={columns} dataSource={listEmployeesByPage} size="middle" pagination = {false}/>
          </div>
          <Modal title="Confirmation" open={isOpenConfirm} onOk={() => handleDelete(currentId)} onCancel={handleToggle}>
            <p>Are you sure to delete this user?</p>
          </Modal>
          <ModalCreate 
            isOpenCreateOrUpdate={isOpenCreateOrUpdate} 
            handleToggleModal={handleToggleModal} 
            selectedEmployee={selectedEmployee}
            setSelectedEmployee={setSelectedEmployee}
          />
        </div>
      )
};

export default ListEmployees;