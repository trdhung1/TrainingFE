
import { useDispatch,useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { Link } from 'react-router-dom';
import { openModalSignOut } from '../../store/modalSlice';
import ModalConfirmSignout from '../../common/ModalConfirmSignout';


function Header() {

  const dispatch = useDispatch<AppDispatch>();
  const modalSignOutIsOpen = useSelector((state: RootState) => state.modal.modalSignOutIsOpen);

  const handleOpenModalSignOut = () => {
    dispatch(openModalSignOut());
  };

 

  return (
   <div>
      <header className="bg-gray-800 text-white flex justify-between items-center px-6 py-4 fixed top-0 left-0 w-full z-10">
        <div className="text-xl font-bold">
         <Link to="/">My App</Link>
        
          </div>
        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
          onClick={handleOpenModalSignOut}
        >
          Sign Out
        </button>
      </header>
      {modalSignOutIsOpen && <ModalConfirmSignout />}
      
   </div>

  );
};

export default Header;
