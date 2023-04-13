import { useEffect, memo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

import ReactPaginate from "react-paginate";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../store/employeeSlice";
import { AppDispatch, RootState } from "../../store/store";
import { IEmployee } from "../../store/employeeSlice";

import EmployeeItem from "./EmployeeItem";

function Employee() {
  const employees: IEmployee[] = useSelector(
    (state: RootState) => state.users.users
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // pagination
  const [pageNumber, setPageNumber] = useState(0);
  const employeesPerPage = 5;
  const pagesVisited = pageNumber * employeesPerPage;

  const displayedEmployees = employees.slice(
    pagesVisited,
    pagesVisited + employeesPerPage
  );

  const pageCount = Math.ceil(employees.length / employeesPerPage);

  const changePage = ({ selected }: any) => {
    setPageNumber(selected);
  };

  return (
    <div className='mb-10'>
      <div className='flex justify-between items-center mb-5'>
        <h1 className='text-3xl font-bold'>Employee List</h1>
      </div>

      <TableContainer
        component={Paper}
        sx={{
          width: "1200px",
        }}
      >
        <Table aria-label='employee table'>
          <TableHead>
            <TableRow className='bg-[#F6BD60]'>
              <TableCell className='font-bold text-gray-700 uppercase align-middle'>
                ID
              </TableCell>
              <TableCell className='font-bold  text-gray-700 uppercase align-middle'>
                Employee Name
              </TableCell>
              <TableCell className='font-bold text-gray-700 uppercase align-middle'>
                Available
              </TableCell>
              <TableCell className='font-bold text-gray-700 uppercase align-middle'>
                Age
              </TableCell>
              <TableCell className='font-bold text-gray-700 uppercase align-middle '>
                Email
              </TableCell>
              <TableCell className='font-bold text-gray-700 uppercase align-middle'>
                Phone
              </TableCell>
              <TableCell className='font-bold text-gray-700 uppercase align-middle'>
                Address
              </TableCell>
              <TableCell className='font-bold text-gray-700 uppercase align-middle'>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(displayedEmployees) &&
              displayedEmployees.map((employee, index) => (
                <EmployeeItem
                  key={employee.id}
                  index={index + pagesVisited + 1}
                  employee={employee}
                />
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {Array.isArray(employees) && employees.length > 0 && (
        <ReactPaginate
          previousLabel={<ChevronLeft className='mr-4 text-3xl' />}
          nextLabel={<ChevronRight className='ml-4' />}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName='flex justify-center mt-5 items-center mx-5'
          pageClassName='w-[32px] h-[32px] rounded-full flex justify-center items-center'
          previousLinkClassName='w-20 h-20 hover:bg-gray-200 rounded'
          nextLinkClassName='w-[32px] h-[32px] rounded-full flex justify-center items-center'
          disabledClassName='opacity-50 cursor-not-allowed'
          activeClassName='bg-blue-500 text-white rounded-full'
        />
      )}
    </div>
  );
}

export default memo(Employee);
