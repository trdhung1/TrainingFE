import { createSlice } from "@reduxjs/toolkit";


export interface IModalState {
    modalEditIsOpen: boolean;
    modalDeleteIsOpen: boolean;
    modalType?: string;
}


const initialState: IModalState = {
  modalEditIsOpen: false,
  modalDeleteIsOpen: false,
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
  },
});

const { actions, reducer } = modalSlice;

export const {
  openModalEdit,
  closeModalEdit,
  openModalDelete,
  closeModalDelete,
} = actions;

export default reducer;
