import { TableCell, TableRow } from "@mui/material";
import { IEmployee } from "../../../store/employeeSlice";


interface EmployeeItemProps {
  employee: IEmployee;
}

function EmployeeItem(props: EmployeeItemProps): JSX.Element {
  const { employee } = props;

  return (
    <TableRow key={employee.id}>
      <TableCell className='text-gray-700 align-middle'>
        {employee.id}
      </TableCell>
      <TableCell className='text-gray-700 align-middle'>
        {employee.name}
      </TableCell>
      <TableCell className='text-gray-700 align-middle'>
        {employee?.isAvailable}
      </TableCell>
      <TableCell className='text-gray-700 align-middle'>
        {employee.age}
      </TableCell>
      <TableCell className='text-gray-700 align-middle'>
        {employee.email}
      </TableCell>
      <TableCell className='text-gray-700 align-middle'>
        {employee.phone}
      </TableCell>
      <TableCell className='text-gray-700 align-middle'>
        {employee.address}
      </TableCell>
    </TableRow>
  );
}

export default EmployeeItem;
