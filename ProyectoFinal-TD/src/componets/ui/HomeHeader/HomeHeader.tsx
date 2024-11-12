
import { useAppSelector } from '../../../hooks/redux'
import { IEmpresa } from '../../../types/dtos/empresa/IEmpresa'
import { Button } from 'react-bootstrap'
import styles from "./HomeHeader.module.css"
import { FC } from 'react'
interface IHomeHeader{
    setDisplayPopUpCreateOffice:Function
    setDisplayListOffice:Function,
}
export const HomeHeader :FC<IHomeHeader> = ({setDisplayPopUpCreateOffice,setDisplayListOffice}) => {
    const activeEnterprise : IEmpresa |null =useAppSelector(
        (state)=>state.ActiveEntrepriseReducer.activeEnterprise
    )
    const handleOpenModa=()=>{
        setDisplayPopUpCreateOffice(true)
    }
    const handleReload=()=>{
        setDisplayListOffice(false)
        setDisplayListOffice(true)
    }
return (
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
            <Button variant="info" onClick={handleOpenModa}>Agregar sucursal</Button>
        </div>
    </div>
)
}
