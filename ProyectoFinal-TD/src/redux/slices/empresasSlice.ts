import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IEmpresa } from '../../types/dtos/empresa/IEmpresa';

interface EmpresasState {
  enterprises: IEmpresa[];
}

const initialState: EmpresasState = {
  enterprises: [],
};

const empresasSlice = createSlice({
  name: 'empresas',
  initialState,
  reducers: {
    setEmpresas(state, action: PayloadAction<IEmpresa[]>) {
      state.enterprises = action.payload;
    },
    addEmpresa(state, action: PayloadAction<IEmpresa>) {
      state.enterprises.push(action.payload);
      console.log(state.enterprises.toString())
    },
  },
});

export const { setEmpresas, addEmpresa } = empresasSlice.actions;
export default empresasSlice.reducer;
