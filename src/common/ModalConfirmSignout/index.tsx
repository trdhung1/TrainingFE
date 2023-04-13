import React from "react";
import { useDispatch } from "react-redux";
import { closeModalSignOut } from "../../store/modalSlice";
import { logout } from "../../store/authSlice";
import { AppDispatch } from "../../store/store";
import { ExitToApp } from "@mui/icons-material";

function ModalConfirmSignout(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();

  const handleClose = () => {
    dispatch(closeModalSignOut());
  };

  const handleSignOut = async () => {
    await dispatch(logout());
    handleClose();
  };

  return (
    <>
      <div className='bg-white rounded-lg overflow-hidden shadow-xl fixed z-20 top-[10%] right-[5%]'>
        <div className='px-8 py-4'>
          <h2 className='text-lg font-bold mb-3'>
            Are you sure you want to sign out?
          </h2>
          <div className='flex justify-end'>
            <button
              onClick={handleClose}
              className='px-4 py-2 rounded-md font-medium mr-4 bg-gray-100 text-gray-700 hover:bg-gray-200'
            >
              Cancel
            </button>
            <button className='px-2 py-2 bg-[#2e7d32] rounded-md font-medium text-white hover:bg-[#388e3c]'>
              <ExitToApp onClick={handleSignOut} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalConfirmSignout;
