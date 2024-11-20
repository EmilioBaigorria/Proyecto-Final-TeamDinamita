import { configureStore } from '@reduxjs/toolkit'
import ActiveEntrepriseReducer from "../slices/ActiveEnterpriseReducer"
import ActiveOfficeReducer from "../slices/ActiveOfficeReducer"
import enterprisesReducer from "../slices/empresasSlice"
import sucursalesReducer from "../slices/sucursalSlice"
import ActiveAlergenoReducer from "../slices/ActiveAlergenoReducer"


export const store = configureStore({
  reducer: {
    ActiveEntrepriseReducer:ActiveEntrepriseReducer,
    ActiveOfficeReducer:ActiveOfficeReducer,
    ActiveAlergenoReducer:ActiveAlergenoReducer,
    enterprises: enterprisesReducer,
    sucursales: sucursalesReducer,
  },
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch