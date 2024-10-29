
import { FC } from "react"
import styles from "./PopUpChekEnterprise.module.css"

import { useAppDispatch, useAppSelector } from "../../../hooks/redux"
import { Button } from "react-bootstrap"
import { removeActiveEnterprise } from "../../../redux/slices/ActiveEnterpriseReducer"
interface IDisplayPopUp{
    displayModalCheckEnterprise:boolean
    setdisplayModalCheckEnterprise:Function

}
export const PopUpChekEnterprise :FC<IDisplayPopUp> = ({displayModalCheckEnterprise,setdisplayModalCheckEnterprise}) => {
    const dispach=useAppDispatch()
    const elementActive = useAppSelector(
        (state) => state.ActiveEntrepriseReducer.activeEnterprise
    )
    const handleCloseModal=()=>{
        setdisplayModalCheckEnterprise(false)
        dispach(removeActiveEnterprise())
    }   
return (
    <div className={styles.main_background_cointainer} style={{display:displayModalCheckEnterprise ? "flex" : "none"}}>
        <div className={styles.main_modal_container}>
            <h1 style={{marginLeft:"30%", marginBottom:"3rem"}}>Empresa</h1>
            
            <h1 className={styles.text_font_format}>Nombre:{elementActive?.name}</h1>
            <h1 className={styles.text_font_format}>Razon social:{elementActive?.sR}</h1>
            <h1 className={styles.text_font_format}>Cuit:{elementActive?.cuit}</h1>
            <h1 className={styles.text_font_format}>Logo:
                <img src={elementActive?.logo} style={{width:"10rem"}} /></h1>
            <div className={styles.button_container}>
                <Button className={styles.button_Style} variant="danger"  onClick={()=>{
                    handleCloseModal()
                }}>Cerrar</Button>
            </div>
        </div>
    </div>
)
}
