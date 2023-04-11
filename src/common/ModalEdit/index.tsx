
import { useState } from "react";
import {
  Modal,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";
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
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleCloseModalEdit = () => {
    dispatch(closeModalEdit());
  };

  const modalType = useSelector((state: RootState) => state.modal.modalType);
  const employeeID = useSelector((state: RootState) => state.users.employeeID);
  const employees = useSelector((state: RootState) => state.users.users);

  const originalEmployee: any =
    Array.isArray(employees) &&
    employees.find((employee: IEmployee) => employee.id === employeeID);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      age: 0,
      email: "",
      phone: "",
      address: "",
    },
  });

  const handleSave = async (data: FormData) => {
    if (modalType === "add") {
      const employee: IEmployee = {
        name: data.name,
        age: data.age,
        email: data.email,
        phone: data.phone,
        address: data.address,
        img: "https://www.w3schools.com/howto/img_avatar.png",
      };
      await dispatch(addEmployee(employee));
      handleCloseModalEdit();
    } else {
      const employee: IEmployee = {
        ...originalEmployee,
        name: data.name !== "" ? data.name : originalEmployee.name,
        age: data.age !== 0 ? data.age : originalEmployee.age,
        email: data.email !== "" ? data.email : originalEmployee.email,
        phone: data.phone !== "" ? data.phone : originalEmployee.phone,
        address: data.address !== "" ? data.address : originalEmployee.address,
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
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        hideBackdrop={true} 
      
      >
        <Box sx={style}>
          <Typography variant='h6' component='h2' mb={3}>
            {modalType === "add" ? "Add Employee" : "Edit Employee"}
          </Typography>
          <Typography display='flex' flexDirection='column'>
            <TextField
              {...register("name", { required: modalType === "add" ? true : false})}
              name='name'
              label='Employee Name'
              variant='outlined'
              margin='normal'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && (
              <span style={{ color: "red", fontSize: "14px" }}>
                Name is required
              </span>
            )}
            <TextField
              {...register("age", { pattern: /^[0-9]+$/ })}
              name='age'
              label='Age'
              variant='outlined'
              margin='normal'
              type='number'
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value))}
            />
            {errors.age && (
              <span style={{ color: "red", fontSize: "14px" }}>
                Age is invalid
              </span>
            )}
            <TextField
              {...register("email", { pattern: /^\S+@\S+$/i })}
              name='email'
              label='Email'
              variant='outlined'
              margin='normal'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <span style={{ color: "red", fontSize: "14px" }}>
                Email is invalid
              </span>
            )}
            <TextField
              {...register("phone")}
              name='phone'
              label='Phone'
              variant='outlined'
              margin='normal'
              type='tel'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <TextField
              {...register("address")}
              name='address'
              label='Address'
              variant='outlined'
              margin='normal'
              multiline
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
      <div className="overlay fixed top-0 left-0 w-full h-full bg-black bg-opacity-10 z-10
      ">

      </div>
  </div>
  );
}

export default EmployeeModal;
