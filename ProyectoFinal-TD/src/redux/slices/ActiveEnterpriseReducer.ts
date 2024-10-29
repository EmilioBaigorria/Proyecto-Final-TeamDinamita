import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IEmpresa from "../../types/IEmpresa";

interface IInitialState{
    activeEnterprise : null | IEmpresa
}
const initialState:IInitialState={
    activeEnterprise: null
}
interface PayloadElement{
    element:IEmpresa
}
const ActiveEntrepriseReducer=createSlice({
    name:"ActiveEntrepriseReducer",
    initialState,
    reducers: {
        setActiveEnterprise(state,action:PayloadAction<PayloadElement>){
            state.activeEnterprise=action.payload.element
        },
        removeActiveEnterprise(state){
            state.activeEnterprise=null
        }
    }
})
export const {setActiveEnterprise,removeActiveEnterprise}=ActiveEntrepriseReducer.actions
export default ActiveEntrepriseReducer.reducer