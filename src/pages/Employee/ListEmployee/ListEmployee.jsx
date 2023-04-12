import PopupForm from '../../../common/PopupForm/PopupForm';
import { useState } from 'react';
import {  BiPencil } from 'react-icons/bi'
import Button from '@mui/material/Button';
import ModalDelete from '../../../component/Modal/Modal';
import DeleteIcon from '@mui/icons-material/Delete';

function ListEmployee({ list }) {

    const [modal, setOpenModal] = useState(false);
    const [open, setOpen] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const handleOpenPopup = () => {
        setOpen(true);
    }; 

    const handleClosePopup = () => {
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
                    <Button variant="warning" onClick={handleOpenPopup}> <BiPencil  /></Button>{' '}
                </td>
                <td >
                    <Button className='d-flex m-auto' variant="danger" onClick={handleOpenModal} ><DeleteIcon /> </Button>{' '}
                </td>
                
            {open && <PopupForm list={list} handleClosePopup={handleClosePopup} />
            }

            <ModalDelete modal={modal} handleCloseModal={handleCloseModal} id={list.id} />
            </tr>
        </>
    );
}

export default ListEmployee;