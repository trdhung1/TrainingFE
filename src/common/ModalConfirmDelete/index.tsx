import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModalDelete } from "../../store/modalSlice";
import { AppDispatch, RootState } from "../../store/store";
import { deleteEmployee, fetchUsers, IEmployee} from "../../store/employeeSlice";

function ModalConfirmDelete() {
  const dispatch = useDispatch<AppDispatch>();
  const employeeID = useSelector((state: RootState) => state.users.employeeID);
  const employees = useSelector((state: RootState) => state.users.users);
  const originalEmployee: any =
    Array.isArray(employees) &&
    employees.find((employee: IEmployee) => employee.id === employeeID);


  const handleCloseModalConfirmDelete = () => {
    dispatch(closeModalDelete());
  };

  const handleDelete = async () => {
    await dispatch(deleteEmployee(employeeID));
    await dispatch(fetchUsers());
    handleCloseModalConfirmDelete();
  };

  return (
    <Fragment>
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-10 z-10"></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md p-6 z-20 min-w-[400px]">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Confirm Delete</h2>
        </div>
        <div className="mb-4">
          <p>Are you sure you want to delete <span className='text-red-600 mx-2'>{originalEmployee?.name}</span>?</p>
        </div>
        <div className="flex justify-end">
          <button
            className="mr-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
            onClick={handleCloseModalConfirmDelete}
          >
            <span>Cancel</span>
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
            onClick={handleDelete}
          >
            <span>Delete</span>
          </button>
        </div>
      </div>
    </Fragment>
  );
}

export default ModalConfirmDelete;
