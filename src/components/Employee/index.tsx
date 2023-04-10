import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "../../store/employeeSlice";
import { AppDispatch, RootState } from "../../store/store";
import { IEmployee } from "../../store/employeeSlice";

import EmployeeItem from "./EmployeeItem";

function Employee(): JSX.Element {
  const employees = useSelector((state: RootState) => state.users.users);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <TableContainer component={Paper} className='max-w-[960px]'>
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
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee: IEmployee) => (
            <EmployeeItem key={employee.id} employee={employee} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Employee;
