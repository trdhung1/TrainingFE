import { createSlice } from "@reduxjs/toolkit";


export interface IModalState {
    modalEditIsOpen: boolean;
    modalDeleteIsOpen: boolean;
    modalSignOutIsOpen: boolean;

    modalType?: string;
}


const initialState: IModalState = {
  modalEditIsOpen: false,
  modalDeleteIsOpen: false,
  modalSignOutIsOpen: false,
};


// slice
const modalSlice = createSlice({
  name: "modal",
  initialState: initialState,
  reducers: {
    openModalEdit: (state,action) => {
      state.modalEditIsOpen = true;
      state.modalType = action.payload;
    },
    closeModalEdit: (state) => {
      state.modalEditIsOpen = false;
    },
    openModalDelete: (state) => {
      state.modalDeleteIsOpen = true;
    },
    closeModalDelete: (state) => {
      state.modalDeleteIsOpen = false;
    },
    openModalSignOut: (state) => {
      state.modalSignOutIsOpen = true;
    },
    closeModalSignOut: (state) => {
      state.modalSignOutIsOpen = false;
    }

  },
});

const { actions, reducer } = modalSlice;

export const {
  openModalEdit,
  closeModalEdit,
  openModalDelete,
  closeModalDelete,
  openModalSignOut,
  closeModalSignOut,
} = actions;

export default reducer;
