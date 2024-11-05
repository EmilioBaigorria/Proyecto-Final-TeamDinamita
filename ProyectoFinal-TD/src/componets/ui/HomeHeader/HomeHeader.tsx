import React from 'react'
import { useAppSelector } from '../../../hooks/redux'
import { IEmpresa } from '../../../types/dtos/empresa/IEmpresa'
import { Button } from 'react-bootstrap'
import styles from "./HomeHeader.module.css"

export const HomeHeader = () => {
    const activeEnterprise : IEmpresa |null =useAppSelector(
        (state)=>state.ActiveEntrepriseReducer.activeEnterprise
    )
return (
    <div className={styles.main_header_container} >
        <div className={styles.text_container}>
            <h1 className={styles.text}>Sucursales de:{activeEnterprise?.nombre}</h1>
        </div>
        <div className={styles.button_container}>
            <Button variant="info">Agregar sucursal</Button>
        </div>
    </div>
)
}
