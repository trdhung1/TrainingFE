import FooterPage from "../footer/FooterPage";
import HeaderPage from "../header/HeadPage";
import ListEmployees from "../listEmployees/ListEmployees";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getAllEmployees } from "../../store/slices/employee.slice";
import { iEmployeeType } from "../../types/employee.type";
import "./mainPage_style.scss";

function MainPage() {
  const dispatch = useAppDispatch();
  const listData = useAppSelector((state) => state.employees.employeesList);
  const [filterEmployees, setFilterEmployees] = useState<iEmployeeType[]>([]);
  const [isOpenCreateOrUpdate, setIsOpenCreateOrUpdate] =
    useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const handleToggleModal = () => {
    setIsOpenCreateOrUpdate(!isOpenCreateOrUpdate);
  };

  const handleReverse = (inputData: iEmployeeType[]) => {
    let length = inputData?.length;
    return inputData?.map(
      (item: iEmployeeType, index: number, arr: iEmployeeType[]) =>
        arr[length - index - 1]
    );
  };
  const handleSetPage = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    dispatch(getAllEmployees());
  }, []);

  const getListEmployeesByPage = (
    listEmployees: iEmployeeType[]
  ): iEmployeeType[] => {
    const lastIndex = page * 4;
    const firstIndex = lastIndex - 4;
    return listEmployees?.slice(firstIndex, lastIndex);
  };

  const handleSearch = (inputString: string) => {
    let result: iEmployeeType[] = [];
    handleReverse(listData)?.forEach((item: iEmployeeType) => {
      if (item?.name?.toLowerCase().indexOf(inputString) !== -1) {
        result.push(item);
      }
    });
    setFilterEmployees(result);
    setPage(1);
  };

  useEffect(() => {
    setFilterEmployees(handleReverse(listData));
  }, [listData]);

  return (
    <div className="employees-manage">
      <HeaderPage
        listEmployees={handleReverse(listData)}
        isOpenCreateOrUpdate={isOpenCreateOrUpdate}
        handleToggleModal={handleToggleModal}
        handleSearch={handleSearch}
      />
      <ListEmployees
        isOpenCreateOrUpdate={isOpenCreateOrUpdate}
        handleToggleModal={handleToggleModal}
        listEmployeesByPage={getListEmployeesByPage(filterEmployees)}
      />
      <FooterPage
        page={page}
        listEmployeesByPage={getListEmployeesByPage(filterEmployees)}
        listEmployees={handleReverse(listData)}
        handleSetPage={handleSetPage}
      />
    </div>
  );
}

export default MainPage;
