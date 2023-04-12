import { useEffect, useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEmployees } from '../../store/reducer';
import styles from './Employee.module.scss';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { Icon } from '@material-ui/core';
import PopupForm from '../../common/PopupForm/PopupForm';
import { BiPencil } from 'react-icons/bi';
import DeleteIcon from '@mui/icons-material/Delete';
import { searchEmployee } from '../../store/reducer';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';


function TableEmployee({ itemsPerPage = 5 }) {

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 160 },
        { field: 'phone', headerName: 'Phone', width: 140 },
        {
            field: 'img',
            headerName: 'Img',
            width: 80,
            renderCell: (params) => (
                <img src={params.value} alt="avatar" style={{ width: '70%', height: 'auto' }} />
            ),
        },
        {
            field: 'age',
            headerName: 'Age',
            type: 'number',
            width: 80,
            marginRight: 20
        },
        {
            field: 'country',
            headerName: 'Country',
            width: 130,
        },
        {
            field: 'edit',
            headerName: 'Edit',
            width: 100,
            renderCell: () => (
                <Icon style={{ color: '#2278CF', fontSize: 20, display: 'flex', flex: 'flex-start' }} onClick={handleOpenPopup} >
                    <BiPencil />
                </Icon>
            ),
        },
        {
            field: 'delete',
            headerName: 'Delete',
            width: 100,
            renderCell: () => (
                <Icon style={{ color: '#2278CF', fontSize: 20, display: 'flex', flex: 'flex-start' }} onClick={() => alert('jdhfj')}>
                    <DeleteIcon />
                </Icon>
            ),
        },

    ];

    const dispatch = useDispatch()

    const listEmployee = useSelector((state) => state.employeesReducer.listEmployee)
    const [open, setOpen] = useState(false)
    const [list, setList] = useState({})

    const rows = listEmployee

    useEffect(() => {
        dispatch(fetchEmployees())
    }, [dispatch])
    const handleOpenPopup = (event) => {
        setOpen(true)
    }

    const handleClosePopup = () => {
        setOpen(false)
        setList({})
    }

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ width: '85%', margin: 'auto' }}>
                <button className={styles.create_btn} onClick={() => handleOpenPopup()} >Create Employee <IoMdAddCircleOutline /></button>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5, 10, 20]}
                        onRowClick={(params) => {
                            setList(params.row)
                        }}
                    />
                    {open && <PopupForm list={list} handleClosePopup={handleClosePopup} />}
                </div>
            </div>
        </div>

    );
}

export default TableEmployee;