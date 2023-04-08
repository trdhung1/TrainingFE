import { Button, Input } from 'antd';
import './headerPage_style.scss';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import ModalCreate from '../../common/ModalCreate/ModalCreate';
import { iEmployeeType } from '../../types/employee.type';
import useDebounce from '../../hooks/useDebounce';

function HeaderPage(props: any) {
  const { handleSearch, isOpenCreateOrUpdate, handleToggleModal } = props;
  const [textSearch, setTextSearch] = useState<string>('');
  const nameSearch = useDebounce(textSearch, 500);

  useEffect(() => {
    handleSearch(nameSearch);
  }, [nameSearch]);

  return (
    <div className="header-page">
      <div className="text">Employees Management</div>
      <div className="options">
        <Input
          onChange={(e) => {
            setTextSearch(e.target.value);
          }}
          placeholder="Search name"
        />
        <Button onClick={handleToggleModal}>
          <PlusCircleOutlined />
          Add new employees
        </Button>
      </div>
      <ModalCreate
        isOpenModalCreate={isOpenCreateOrUpdate}
        handleToggleModal={handleToggleModal}
      />
    </div>
  );
}

export default HeaderPage;
