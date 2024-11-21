import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductos } from "../../types/dtos/productos/IProductos";

interface ActiveProductoState {
  activeProducto: IProductos | null;
}

const initialState: ActiveProductoState = {
  activeProducto: null,
};


const ActiveProductoReducer = createSlice({
  name: "activeProducto", 
  initialState,
  reducers: {

    setActiveProducto(state, action: PayloadAction<IProductos>) {
      state.activeProducto = action.payload;
    },

    removeActiveProducto(state) {
      state.activeProducto = null;
    },
  },
});


export const { setActiveProducto, removeActiveProducto } = ActiveProductoReducer.actions;

export default ActiveProductoReducer.reducer;
