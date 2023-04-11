import { Button, TextField } from "@mui/material";
import { useState } from "react";
import Employee from "../../components/Employee";
import Header from "../../layouts/Header";
import { openModalEdit } from "../../store/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import EmployeeModal from "../../common/ModalEdit";
import { searchUser } from "../../store/employeeSlice";

function EmployeePage() {
  const dispatch = useDispatch<AppDispatch>();
  const modalEditIsOpen = useSelector(
    (state: RootState) => state.modal.modalEditIsOpen
  );

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async () => {
    await dispatch(searchUser(searchTerm.trim()));
    setSearchTerm("");
  };

  const handleOpenModalEdit = () => {
    dispatch(openModalEdit("add"));
  };

  return (
    <>
     
        <Header />
        <div className='flex items-center mt-32 justify-center'>
          <TextField
            name='search'
            label='Search'
            variant='outlined'
            size='small'
            value={searchTerm}
            className='w-[385px]'
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              marginRight: "20px",
            }}
          />
          <Button variant='contained' onClick={handleSearch}>
            Search
          </Button>
          <Button
            variant='contained'
            style={{ marginLeft: "125px" }}
            color='success'
            onClick={handleOpenModalEdit}
          >
            Add
          </Button>
        </div>
        <div className='mx-auto mt-12 flex justify-center'>
          <Employee />
        </div>
     

      {modalEditIsOpen && <EmployeeModal />}
    </>
  );
}

export default EmployeePage;
