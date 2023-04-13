import { useDispatch, useSelector } from "react-redux";
import {
  Typography,
  TableCell,
  TableRow,
  IconButton,
  Avatar,
} from "@mui/material";
import { IEmployee, setEmployeeID } from "../../../store/employeeSlice";
import { Check, Close, Delete, Edit } from "@mui/icons-material";
import { AppDispatch } from "../../../store/store";
import { memo } from "react";
import { RootState } from "../../../store/store";
import EmployeeModal from "../../../common/ModalEdit";
import ConfirmDeleteModal from "../../../common/ModalConfirmDelete";
import { openModalEdit, openModalDelete } from "../../../store/modalSlice";

interface EmployeeItemProps {
  employee: IEmployee;
  index: number;
}

function EmployeeItem(props: EmployeeItemProps): JSX.Element {
  const { employee, index } = props;

  const dispatch = useDispatch<AppDispatch>();
  const { modalEditIsOpen, modalDeleteIsOpen } = useSelector(
    (state: RootState) => state.modal
  );

  const handleOpenModalEdit = async () => {
    await dispatch(setEmployeeID(employee.id!));
    await dispatch(openModalEdit("edit"));
  };

  const handleOpenModalConfirmDelete = async () => {
    await dispatch(setEmployeeID(employee.id!));
    await dispatch(openModalDelete());
  };

  
  return (
    <>
      <TableRow key={employee.id}>
        <TableCell>
          <Typography variant='body1'>{index}</Typography>
        </TableCell>
        <TableCell>
          <div className='flex items-center'>
            <Avatar src={employee?.img} alt={employee?.name} sx={{ mr: 2 }} />
            <Typography variant='body1'>{employee?.name}</Typography>
          </div>
        </TableCell>
        <TableCell>
          <Typography variant='body1' className='flex items-center'>
            {employee.isAvailable ? (
              <span>
                <Check color='primary' />
                <span className='ml-2'>Active</span>
              </span>
            ) : (
              <span>
                <Close color='error' />
                <span className='ml-2'>Inactive</span>
              </span>
            )}
          </Typography>
        </TableCell>
        <TableCell>
          <Typography variant='body1'>{employee?.age}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant='body1'>{employee?.email}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant='body1'>{employee?.phone}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant='body1'>{employee?.address}</Typography>
        </TableCell>
        <TableCell>
          <Typography variant='body1'>
            <IconButton onClick={handleOpenModalEdit}>
              <Edit color='primary' />
            </IconButton>
            <IconButton onClick={handleOpenModalConfirmDelete}>
              <Delete color='error' />
            </IconButton>
          </Typography>
        </TableCell>
      </TableRow>
      {modalEditIsOpen && <EmployeeModal />}
      {modalDeleteIsOpen && <ConfirmDeleteModal />}
    </>
  );
}

export default memo(EmployeeItem);
