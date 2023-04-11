import { logout } from '../../store/authSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';


function Header() {

  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-gray-800 text-white flex justify-between items-center px-6 py-4 fixed top-0 left-0 w-full z-10">
      <div className="text-xl font-bold">My App</div>
      <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
        onClick={handleLogout}
      >
        Sign Out
      </button>
    </header>
  );
};

export default Header;
