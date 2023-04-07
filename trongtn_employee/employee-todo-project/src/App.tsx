import React, { useEffect, useState } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './store/store';
import { getAllEmployees } from './store/slices/employee.slice';
import ListEmployees from './components/listEmployees/ListEmployees';
import FooterPage from './components/footer/FooterPage';
import { iEmployeeType } from './types/employee.type';
import HeaderPage from './components/header/HeadPage';

function App() {
  const [isOpenCreateOrUpdate, setIsOpenCreateOrUpdate] = useState<boolean>(false);
    const handleToggleModal = () => {
        setIsOpenCreateOrUpdate(!isOpenCreateOrUpdate);
    }
  const [page, setPage] = useState<number>(1);
    const dispatch = useAppDispatch();
    const listData = useAppSelector((state) => state.employees.employeesList);

    const handleSetPage = (page: number) => {
      setPage(page);
    }

    useEffect(() => {
        dispatch(getAllEmployees())
    }, [])

  const getListEmployeesByPage = (): iEmployeeType[] => {
      const lastIndex = page * 5;
      const firstIndex = lastIndex - 5;
      return listData?.slice(firstIndex, lastIndex)
  }
  const  listEmployeesByPage = getListEmployeesByPage();
  return (
    <div className="App">
      <div className='employees-manage'>
        <HeaderPage isOpenCreateOrUpdate = {isOpenCreateOrUpdate} handleToggleModal = {handleToggleModal}/>
        <ListEmployees 
          isOpenCreateOrUpdate = {isOpenCreateOrUpdate} 
          handleToggleModal = {handleToggleModal} 
          listEmployeesByPage = {listEmployeesByPage}
        />
        <FooterPage listEmployeesByPage = {listEmployeesByPage} listEmployees={listData} handleSetPage = {handleSetPage}/>
      </div>
    </div>
  );
}

export default App;
