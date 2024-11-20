import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAlergenos } from "../../types/dtos/alergenos/IAlergenos";

interface IInitialState{
    activeAlergeno:null|IAlergenos
}
const initialState:IInitialState={
    activeAlergeno:null
}
interface PayloadElement{
    element:IAlergenos
}
const ActiveAlergenosReducer=createSlice({
    name:"ActiveAlergenosReducer",
    initialState,
    reducers:{
        setActiveAlergeno(state,action:PayloadAction<PayloadElement>){
            state.activeAlergeno=action.payload.element
        },
        removeActiveAlergeno(state){
            state.activeAlergeno=null
        }
    }
})
export const{setActiveAlergeno,removeActiveAlergeno}=ActiveAlergenosReducer.actions
export default ActiveAlergenosReducer.reducer