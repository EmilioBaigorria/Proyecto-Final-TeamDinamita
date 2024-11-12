
import { useAppSelector } from '../../../hooks/redux'
import { Button } from 'react-bootstrap'
import styles from "./HomeHeader.module.css"
import { FC } from 'react'
interface IHomeHeader{
    setDisplayPopUpCreateOffice:Function
    setDisplayListOffice:Function,
}
export const HomeHeader :FC<IHomeHeader> = ({setDisplayPopUpCreateOffice,setDisplayListOffice}) => {
    const activeEnterprise =useAppSelector(
        (state)=>state.ActiveEntrepriseReducer.activeEnterprise
    )
    const handleOpenModal=()=>{
        setDisplayPopUpCreateOffice(true)
    }
    const handleReload=()=>{
        console.log("working")
        setDisplayListOffice(false)
        
    }
    
return (
    <>
    <div className={styles.main_header_container}>
        <div className={styles.text_container}>
            <h1 className={styles.text}>Sucursales de: {activeEnterprise?.nombre}</h1>
        </div>
        <div>
            <Button variant="link" onClick={handleReload}><span className="material-symbols-outlined">
            frame_reload
            </span></Button>
        </div>
        <div className={styles.button_container}>
            <Button variant="info" onClick={handleOpenModal}>Agregar sucursal</Button>
        </div>
    </div>
    </>
)
}

