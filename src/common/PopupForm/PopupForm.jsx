import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { addEmployee, putEmployee } from "../../store/reducer";
import Modal from '@mui/material/Modal';


const style = {
    position: 'fixed',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'white',
    border: '1px solid #000',
    boxShadow: 24,
    p: 4,
    zIndex: 999,

};

function PopupForm({ list, handleClosePopup , setList}) {
    const dispatch = useDispatch()

    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        const employee = {
            ...data,
            img: 'https://reqres.in/img/faces/9-image.jpg'
        };

        if (!list) {
            dispatch(addEmployee(employee))
            toast('Create Employee Success');

        } else {
            const id = list.id
            dispatch(putEmployee({ id, data: employee }))
            toast('Update Employee Success');
        }
        handleClosePopup()
    }


    return (
        <>
            <div>
                <Modal
                    open
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                {list ? 'Update Employee' : 'Create Employee'}
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 5 }}>
                                <TextField id="outlined-basic" defaultValue={list && list.name} label="Name" variant="outlined" required sx={{
                                    width: '45%'
                                }}  {...register("name")} />
                                <TextField id="outlined-basic" defaultValue={list && list.age} label="Age" variant="outlined" required sx={{
                                    width: '45%',
                                    marginLeft: '5%'
                                }}  {...register("age")} />
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 5 }}>
                                <TextField id="outlined-basic" defaultValue={list && list.phone} label="Phone" variant="outlined" required sx={{
                                    width: '45%'
                                }} {...register("phone")} />
                                <TextField id="outlined-basic" defaultValue={list && list.country} label="Country" variant="outlined" required sx={{
                                    width: '45%',
                                    marginLeft: '5%'
                                }} {...register("country")} />
                            </Typography>
                            <Typography id="modal-modal-description" required defaultValue='https://reqres.in/img/faces/9-image.jpg' sx={{ mt: 5 }}>
                                <TextField type='file' sx={{
                                    width: '95%'
                                }} {...register("img")} />
                            </Typography>
                            <Typography id="modal-modal-description" required sx={{ mt: 5, float: 'right' }}>
                                <Button variant="outlined" sx={{
                                    mr: 2,
                                }} onClick={() => handleClosePopup()} >Cancel</Button>
                                <Button variant="contained" type='submit'>Ok</Button>
                            </Typography>
                        </form>
                    </Box>
                </Modal>
            </div>
        </>
    );
}

export default PopupForm;