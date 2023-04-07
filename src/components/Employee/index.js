import React, { useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers } from '../../store/employeeSlice';

function Employee () {
  const employees = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <TableContainer component={Paper} className='max-w-[960px]'>
      <Table aria-label="employee table" >
        <TableHead>
          <TableRow className='bg-[#F6BD60]'>
            <TableCell className="font-bold text-gray-700 uppercase align-middle">ID</TableCell>
            <TableCell className="font-bold  text-gray-700 uppercase align-middle">Employee Name</TableCell>
            <TableCell className="font-bold text-gray-700 uppercase align-middle">Available</TableCell>
            <TableCell className="font-bold text-gray-700 uppercase align-middle">Age</TableCell>
            <TableCell className="font-bold text-gray-700 uppercase align-middle ">Email</TableCell>
            <TableCell className="font-bold text-gray-700 uppercase align-middle">Phone</TableCell>
            <TableCell className="font-bold text-gray-700 uppercase align-middle">Address</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell className="text-gray-700 align-middle">{employee.id}</TableCell>
              <TableCell className="text-gray-700 align-middle">{employee.name}</TableCell>
              <TableCell className="text-gray-700 align-middle">{employee?.employee_salary}</TableCell>
              <TableCell className="text-gray-700 align-middle">{employee.age}</TableCell>
              <TableCell className="text-gray-700 align-middle">{employee.email}</TableCell>
              <TableCell className="text-gray-700 align-middle">{employee.phone}</TableCell>
              <TableCell className="text-gray-700 align-middle">{employee.address}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Employee;
