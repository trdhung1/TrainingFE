import PopupForm from '../../../common/PopupForm/PopupForm';
import { useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai'
import Button from '@mui/material/Button';
import ModalDelete from '../../../component/modal/Modal';
import DeleteIcon from '@mui/icons-material/Delete';

function ListEmployee({ list }) {

    const [modal, setOpenModal] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <tr>
                <td>{list.id}</td>
                <td>{list.name}</td>
                <td>{list.age}</td>
                <td>{list.phone}</td>
                <td>{list.country}</td>
                <td><img style={{ height: '70px' }} src={list.img} alt='abv' /></td>
                <td>
                    <Button variant="warning" onClick={handleClickOpen}><AiOutlineDelete /></Button>{' '}
                </td>
                <td >
                    <Button className='d-flex m-auto' variant="danger" onClick={handleOpenModal} ><DeleteIcon /> </Button>{' '}
                </td>
            </tr>
            <PopupForm list={list} open={open} handleClickOpen={handleClickOpen} handleClose={handleClose} />
            <ModalDelete modal={modal} handleCloseModal={handleCloseModal} id={list.id} />
        </>
    );
}

export default ListEmployee;