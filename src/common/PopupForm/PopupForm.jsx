import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import { addEmployee } from "../../store/reducer";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { memo } from "react";

const style = {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function PopupForm({ list,  open, handleClose, handleClickOpen }) {
    const dispatch = useDispatch()
console.log(list)
    const { register, handleSubmit} = useForm();
    const onSubmit = data => {
        dispatch(addEmployee(data))
        handleClose()
        toast('Create Employee Success');
    }

    return (
        <>
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Create Employee
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 5 }}>
                                <TextField id="outlined-basic"  label="Name" variant="outlined" required sx={{
                                    width: '45%'
                                }}  {...register("name")} />
                                <TextField id="outlined-basic" label="Age" variant="outlined" required sx={{
                                    width: '45%',
                                    marginLeft: '5%'
                                }}  {...register("age")} />
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 5 }}>
                                <TextField id="outlined-basic" label="Phone" variant="outlined" required sx={{
                                    width: '45%'
                                }} {...register("phone")} />
                                <TextField id="outlined-basic" label="Country" variant="outlined" required sx={{
                                    width: '45%',
                                    marginLeft: '5%'
                                }} {...register("country")} />
                            </Typography>
                            <Typography id="modal-modal-description" required sx={{ mt: 5 }}>
                                <TextField type='file' sx={{
                                    width: '95%'
                                }} {...register("img.name")} />
                            </Typography>
                            <Typography id="modal-modal-description" required sx={{ mt: 5, float: 'right' }}>
                                <Button variant="outlined" sx={{
                                    mr: 2,
                                }} onClick={() => handleClose()} >Cancel</Button>
                                <Button variant="contained" type='submit'>Ok</Button>
                            </Typography>
                        </form>
                    </Box>
                </Modal>
            </div>
        </>
    );
}

export default memo(PopupForm);