
import { FC } from "react"
import styles from "./PopUpChekEnterprise.module.css"

import { useAppSelector } from "../../../hooks/redux"
interface IDisplayPopUp{
    display:boolean,
    setDisplay:Function,

}
export const PopUpChekEnterprise :FC<IDisplayPopUp> = ({display,setDisplay}) => {
    const elementActive = useAppSelector(
        (state) => state.ActiveEntrepriseReducer.activeEnterprise
    )   
return (
    <div className={styles.main_background_cointainer} style={{display:display ? "flex" : "none"}}>
        <div className={styles.main_modal_container}>
            <h1>id del elemento activo:{elementActive?.id}</h1>
            <h1>hola</h1>
        </div>
    </div>
)
}
