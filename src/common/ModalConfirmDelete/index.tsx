import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { closeModalDelete } from "../../store/modalSlice";
import { AppDispatch, RootState } from "../../store/store";
import { deleteEmployee, fetchUsers } from "../../store/employeeSlice";

function ConfirmDeleteModal() {
  const dispatch = useDispatch<AppDispatch>();
  const employeeID = useSelector((state: RootState) => state.users.employeeID);

  const handleCloseModalConfirmDelete = () => {
    dispatch(closeModalDelete());
  };

  const handleDelete = async () => {
    await dispatch(deleteEmployee(employeeID));
    await dispatch(fetchUsers());
    handleCloseModalConfirmDelete();
  };

  return (
    <div>
      <Dialog open={true} hideBackdrop={true}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText >
            Are you sure you want to delete this employee?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color='primary'
            variant='outlined'
            onClick={handleCloseModalConfirmDelete}
          >
            Cancel
          </Button>
          <Button color='error' variant='contained' onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <div
        className='overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-10 z-10'
      ></div>
    </div>
  );
}

export default ConfirmDeleteModal;
