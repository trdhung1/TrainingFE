import Table from 'react-bootstrap/Table';
import { useEffect, useState, useMemo } from 'react';
import ListEmployee from './ListEmployee/ListEmployee';
import ReactPaginate from 'react-paginate';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEmployees } from '../../store/reducer'
import Profile from './Profile/Profile';
import styles from './Employee.module.scss'
import { IoMdAddCircleOutline } from 'react-icons/io'
import PopupForm from '../../common/PopupForm/PopupForm';

function TableEmployee({ itemsPerPage = 5 }) {

    const dispatch = useDispatch()
    const listEmployee = useSelector((state) => state.employeesReducer.listEmployee)
    const [open, setOpen] = useState(false)
    const [itemOffset, setItemOffset] = useState(0);

    const currentItems = useMemo(() => {

        const endOffset = itemOffset + itemsPerPage;
        return listEmployee.slice(itemOffset, endOffset);

    }, [listEmployee, itemOffset, itemsPerPage])

    const pageCount = useMemo(() => {

        return Math.ceil(listEmployee.length / itemsPerPage);

    }, [listEmployee, itemsPerPage]);

    const handlePageClick = (event) => {

        const newOffset = (event.selected * itemsPerPage) % listEmployee.length;

        setItemOffset(newOffset);
    };

    useEffect(() => {
        dispatch(fetchEmployees())
    }, [dispatch])

    const [showA, setShowA] = useState(false);
    const toggleShowA = () => setShowA(!showA);

    const handleClose = () =>{

        setOpen(false)
    }

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ width: '85%', margin: 'auto' }}>
                <Table striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th className='d-flex m-auto' >Id</th>
                            <th >Name</th>
                            <th>Age</th>
                            <th className='d-flex m-auto' >Phone</th>
                            <th>Country</th>
                            <th>Image</th>
                            <th>Change</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            currentItems.map((list, index) => (
                                <ListEmployee key={index} list={list} />
                            ))
                        }
                    </tbody>
                </Table>

                <ReactPaginate
                    previousLabel={"previous"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination justify-content-center"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active"}
                />
            </div>
            <button className={styles.create_btn} onClick={() => setOpen(true)} >Create Employee <IoMdAddCircleOutline /></button>
            <PopupForm open={open} handleClose={handleClose} />
            <Profile />
        </div>

    );
}

export default TableEmployee;