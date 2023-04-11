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
    <Dialog open={true} onClose={() => {}}
    sx={{
      backgroundColor: "rgba(255,255,255,0.1)",
      opacity: 0.8,
      "& .MuiDialog-paper": {
        backgroundColor: "#fff",
        borderRadius: "10px",
        padding: "20px",
      },
     
    }}
    >
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <DialogContentText className=''>
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
  );
}

export default ConfirmDeleteModal;
