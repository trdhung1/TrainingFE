import React, { useEffect, useState } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from './store/store';
import { getAllEmployees } from './store/slices/employee.slice';
import ListEmployees from './components/listEmployees/ListEmployees';
import FooterPage from './components/footer/FooterPage';
import { iEmployeeType } from './types/employee.type';
import HeaderPage from './components/header/HeadPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [isOpenCreateOrUpdate, setIsOpenCreateOrUpdate] =
    useState<boolean>(false);
  const handleToggleModal = () => {
    setIsOpenCreateOrUpdate(!isOpenCreateOrUpdate);
  };
  const [page, setPage] = useState<number>(1);
  const dispatch = useAppDispatch();
  const listData = useAppSelector((state) => state.employees.employeesList);

  const handleSetPage = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    dispatch(getAllEmployees());
  }, []);

  const getListEmployeesByPage = (
    listData: iEmployeeType[]
  ): iEmployeeType[] => {
    const lastIndex = page * 5;
    const firstIndex = lastIndex - 5;
    return listData?.slice(firstIndex, lastIndex);
  };

  const [filterEmployees, setFilterEmployees] = useState<iEmployeeType[]>([]);

  const handleSearch = (inputString: string) => {
    let result: iEmployeeType[] = [];
    listData?.forEach((item: iEmployeeType) => {
      if (item?.name?.toLowerCase().indexOf(inputString) !== -1) {
        result.push(item);
      }
    });
    setFilterEmployees(result);
    setPage(1);
  };

  useEffect(() => {
    setFilterEmployees(listData);
  }, [listData]);

  const listEmployeesByPage = getListEmployeesByPage(filterEmployees);
  console.log(filterEmployees);

  return (
    <div className="App">
      <div className="employees-manage">
        <HeaderPage
          listEmployees={listData}
          isOpenCreateOrUpdate={isOpenCreateOrUpdate}
          handleToggleModal={handleToggleModal}
          handleSearch={handleSearch}
        />
        <ListEmployees
          isOpenCreateOrUpdate={isOpenCreateOrUpdate}
          handleToggleModal={handleToggleModal}
          listEmployeesByPage={listEmployeesByPage}
        />
        <FooterPage
          page={page}
          listEmployeesByPage={listEmployeesByPage}
          listEmployees={listData}
          handleSetPage={handleSetPage}
        />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
