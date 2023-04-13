import { useState, memo } from "react";
import { Modal, TextField, Button, Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  IEmployee,
  addEmployee,
  editEmployee,
  fetchUsers,
} from "../../store/employeeSlice";
import { AppDispatch, RootState } from "../../store/store";
import { closeModalEdit } from "../../store/modalSlice";

interface FormData {
  name: string;
  age: number;
  email: string;
  phone: string;
  address: string;
}

function EmployeeModal() {
  const dispatch = useDispatch<AppDispatch>();

  const modalType = useSelector((state: RootState) => state.modal.modalType);
  const employeeID = useSelector((state: RootState) => state.users.employeeID);
  const employees = useSelector((state: RootState) => state.users.users);
  const originalEmployee: any =
  Array.isArray(employees) &&
  employees.find((employee: IEmployee) => employee.id === employeeID);

  const [employee, setEmployee] = useState({
    name: modalType === "edit" ? originalEmployee?.name || " " : "",
    age: modalType === "edit" ? originalEmployee?.age || " " : "",
    email: modalType === "edit" ? originalEmployee?.email || " " : "",
    phone: modalType === "edit" ? originalEmployee?.phone || " " : "",
    address: modalType === "edit" ? originalEmployee?.address || " " : ""
  });

  const {name, age, email, phone, address} = employee
  
  const handleCloseModalEdit = () => {
    dispatch(closeModalEdit());
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleSave = async (data: FormData) => {
    if (modalType === "add") {
      const employee: IEmployee = {
        name: data.name.trim(),
        age: data.age,
        email: data.email.trim(),
        phone: data.phone.trim(),
        address: data.address.trim(),
        img: "https://www.w3schools.com/howto/img_avatar.png",
      };
      await dispatch(addEmployee(employee));
      handleCloseModalEdit();
    } else {
      const employee: IEmployee = {
        ...originalEmployee,
        name: data.name.trim() !== "" ? data.name.trim() : originalEmployee.name,
        age: data.age !== 0 ? data.age : originalEmployee.age,
        email: data.email.trim() !== "" ? data.email.trim() : originalEmployee.email,
        phone: data.phone.trim() !== "" ? data.phone.trim() : originalEmployee.phone,
        address: data.address.trim() !== "" ? data.address.trim() : originalEmployee.address,

      };
      await dispatch(editEmployee(employee));
      await dispatch(fetchUsers());
      handleCloseModalEdit();
    }
  };

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 480,
    bgcolor: "rgb(255, 255, 255)",

    // border: "2px solid #000",
    boxShadow: 6,
    p: 4,
  };

  return (
    <div>
      <Modal
        open={true}
        onClose={handleCloseModalEdit}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        hideBackdrop={true}
      >
        <Box sx={style}>
          <Typography variant='h6' component='h2' mb={3}>
            {modalType === "add" ? "Add Employee" : "Edit Employee"}
          </Typography>
          <Typography display='flex' flexDirection='column'>
            <TextField
              {...register("name", {
                required: modalType === "add" ? true : false,
              })}

              name='name'
              label='Employee Name'
              variant='outlined'
              InputLabelProps={{
                shrink: true,
              }}
            
              margin='normal'           
              value ={name}
              onChange={(e) => setEmployee({...employee, name: e.target.value})}
            

            />
            {errors.name && (
              <span style={{ color: "red", fontSize: "14px" }}>
                Name is required, please try again
              </span>
            )}
            <TextField
              {...register("age", { pattern: /^(1[8-9]|[2-9][0-9])$/})}
              name='age'
              label='Age'
              variant='outlined'
              margin='normal'
              type='number'
              value={age}
              onChange={(e) => setEmployee({...employee, age: e.target.value})}
            />
            {errors.age && (
              <span style={{ color: "red", fontSize: "14px" }}>
                Age is invalid, please try between 18-99 again
              </span>
            )}
            <TextField
              {...register("email", { pattern: /^\S+@\S+$/i})}
              name='email'
              label='Email'
              variant='outlined'
              margin='normal'
              type='email'
              InputLabelProps={{ shrink: true }}
             
              value={email}
              onChange={(e) => setEmployee({...employee, email: e.target.value})}
            />
            {errors.email && (
              <span style={{ color: "red", fontSize: "14px" }}>
                Email is invalid, please try again
              </span>
            )}
            <TextField
              {...register("phone",{ pattern: /^(0|84)[0-9]{8,9}$/})
              }
              name='phone'
              label='Phone'
              variant='outlined'
              margin='normal'
              type='tel'
              InputLabelProps={{ shrink: true }}
              placeholder='+(84)'
              value={phone}
              onChange={(e) => setEmployee({...employee, phone: e.target.value})}
            />
            {errors.phone && (
              <span style={{ color: "red", fontSize: "14px" }}>
                Phone is invalid, please try again
              </span>
            )}
            <TextField
              {...register("address", 
              { pattern: /^(?!\s*$).+/ })}
              name='address'
              label='Address'
              variant='outlined'
              margin='normal'
              multiline
              InputLabelProps={{ shrink: true }}
        
              value={address}
              onChange={(e) => setEmployee({...employee, address: e.target.value})}
            />
            <Button
              variant='contained'
              color='primary'
              sx={{ mt: 2 }}
              onClick={handleSubmit(handleSave)}
            >
              {modalType === "add" ? "Add" : "Edit"}
            </Button>
            <Button
              variant='outlined'
              color='secondary'
              onClick={handleCloseModalEdit}
              sx={{ mt: 1 }}
            >
              Cancel
            </Button>
          </Typography>
        </Box>
      </Modal>
      <div
        className='overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-10 z-10
      '
      ></div>
    </div>
  );
}

export default memo(EmployeeModal);
