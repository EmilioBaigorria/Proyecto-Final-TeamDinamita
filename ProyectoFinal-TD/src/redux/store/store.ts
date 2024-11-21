import { configureStore } from '@reduxjs/toolkit'
import ActiveEntrepriseReducer from "../slices/ActiveEnterpriseReducer"
import ActiveOfficeReducer from "../slices/ActiveOfficeReducer"
import enterprisesReducer from "../slices/empresasSlice"
import sucursalesReducer from "../slices/sucursalSlice"
import ActiveAlergenoReducer from "../slices/ActiveAlergenoReducer"
import ActiveProductoReducer from '../slices/ActiveProductoReducer'
import productosReducer from "../slices/productosSlice"
import categoriaSlice from "../slices/categoriaSlice"


export const store = configureStore({
  reducer: {
    ActiveEntrepriseReducer: ActiveEntrepriseReducer,
    ActiveOfficeReducer: ActiveOfficeReducer,
    ActiveAlergenoReducer: ActiveAlergenoReducer,
    ActiveProductoReducer: ActiveProductoReducer,
    enterprises: enterprisesReducer,
    sucursales: sucursalesReducer,
    productos: productosReducer,
    categorias: categoriaSlice,
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch