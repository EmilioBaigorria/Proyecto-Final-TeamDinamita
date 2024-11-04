import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISucursal } from "../../types/dtos/sucursal/ISucursal";

// definir interface del initial state
interface IInitialState {

    // puede ser null o del tipo sucursal
    activeOffice: null | ISucursal
}

// seteamos el initial state
const initialState: IInitialState = {
    activeOffice: null
}

// creamos la interface del payload element, o sea la variable global
interface IPayloadElement {
    element: ISucursal
}

// el puto reducer
const ActiveOfficeReducer = createSlice({

    // nombre del reducer
    name: "ActiveOfficeReducer",

    // el estado al iniciarse
    initialState,

    // funciones para modificar las variables
    reducers: {

        //funcion para setear la variable global
        setActiveOfficeReducer(state, action: PayloadAction<IPayloadElement>) {
            state.activeOffice = action.payload.element
        },

        //funcion para eliminar la variable global
        clearActiveOfficeReducer(state) {
            state.activeOffice = null
        }

    }
})

// aca exportamos las funciones y la default
export const { setActiveOfficeReducer, clearActiveOfficeReducer } = ActiveOfficeReducer.actions
export default ActiveOfficeReducer.reducer