import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISucursal } from '../../types/dtos/sucursal/ISucursal';

interface SucursalesState {
  sucursales: ISucursal[];
}

const initialState: SucursalesState = {
  sucursales: [],
};

const sucursalesSlice = createSlice({
  name: 'sucursales',
  initialState,
  reducers: {
    setSucursales(state, action: PayloadAction<ISucursal[]>) {
      state.sucursales = action.payload;
    },
    addSucursal(state, action: PayloadAction<ISucursal>) {
      state.sucursales.push(action.payload);
      console.log(state.sucursales.toString())
    },
  },
});

export const { setSucursales, addSucursal } = sucursalesSlice.actions;
export default sucursalesSlice.reducer;
