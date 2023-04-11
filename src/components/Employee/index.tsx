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
  const employees: IEmployee[] = useSelector(
    (state: RootState) => state.users.users
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className=''>
    
        <TableContainer
          component={Paper}
          
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
              {Array.isArray(employees) &&
                employees.map((employee, index) => (
                  <EmployeeItem
                    key={employee.id}
                    index={index}
                    employee={employee}
                  />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
     </div>
    
  );
}

export default Employee;

