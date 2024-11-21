import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProductos } from '../../types/dtos/productos/IProductos';

interface ProductosState {
  productos: IProductos[];
}

const initialState: ProductosState = {
  productos: [],
};

const productosSlice = createSlice({
  name: 'productos',
  initialState,
  reducers: {
    setProductos(state, action: PayloadAction<IProductos[]>) {
      state.productos = action.payload;
    },
    addProducto(state, action: PayloadAction<IProductos>) {
      state.productos.push(action.payload);
    },
    removeProducto(state, action: PayloadAction<number>) {
      state.productos = state.productos.filter((producto) => producto.id !== action.payload);
    },
    updateProducto(state, action: PayloadAction<IProductos>) {
      const index = state.productos.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.productos[index] = action.payload;
      }
    },
  },
});

export const { setProductos, addProducto, removeProducto, updateProducto } = productosSlice.actions;
export default productosSlice.reducer;
