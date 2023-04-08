import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteEmployee } from '../../store/reducer'
import { toast } from 'react-toastify';

const style = {
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


function ModalDelete({ modal, handleCloseModal, id }) {

    const dispatch = useDispatch()

    const Delete = () => {
        dispatch(deleteEmployee(id))
        handleCloseModal()
        toast('Delete success');
    }

    return (
        <>
            <Modal
                open={modal}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Are you sure you want to delete this employee?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{
                        mt: 4,
                        float: 'right'
                    }}>
                        <Button variant="outlined" sx={{
                            mr: 2,
                        }} onClick={handleCloseModal} >Cancel</Button>
                        <Button variant="contained" onClick={Delete}>Ok</Button>
                    </Typography>
                </Box>
            </Modal>
        </>
    );
}

export default ModalDelete;