import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategorias } from '../../types/dtos/categorias/ICategorias';

interface CategoriasState {
  categorias: ICategorias[];
}

const initialState: CategoriasState = {
  categorias: [],
};

const categoriaSlice = createSlice({
  name: 'categorias',
  initialState,
  reducers: {
    setCategoria(state, action: PayloadAction<ICategorias[]>) {
      state.categorias = action.payload;
    },
    addCategoria(state, action: PayloadAction<ICategorias>) {
      state.categorias.push(action.payload);
    },
    removeCategoria(state, action: PayloadAction<number>) {
      state.categorias = state.categorias.filter((categorias) => categorias.id !== action.payload);
    },
    updateCategoria(state, action: PayloadAction<ICategorias>) {
      const index = state.categorias.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.categorias[index] = action.payload;
      }
    },
  },
});

export const { setCategoria, addCategoria, removeCategoria, updateCategoria } = categoriaSlice.actions;
export default categoriaSlice.reducer;
