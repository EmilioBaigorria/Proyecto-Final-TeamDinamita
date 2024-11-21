
import { useAppSelector } from '../../../hooks/redux'
import { Button } from 'react-bootstrap'
import styles from "./HomeHeader.module.css"
import { FC } from 'react'
interface IHomeHeader {
    setDisplayPopUpCreateOffice: Function
    setDisplayListOffice: Function,
}
export const HomeHeader: FC<IHomeHeader> = ({ setDisplayPopUpCreateOffice, setDisplayListOffice }) => {
    const activeEnterprise = useAppSelector(
        (state) => state.ActiveEntrepriseReducer.activeEnterprise
    )
    const handleOpenModal = () => {
        setDisplayPopUpCreateOffice(true)
    }
    const handleReload = () => {
        setDisplayListOffice(false)
    }

    return (
        <>
            {activeEnterprise ? (
                <div className={styles.main_header_container}>
                    
                    <div className={styles.text_container}>
                        <h1 className={styles.text}>Sucursales de: {activeEnterprise?.nombre}</h1>
                    </div>
                    <div className={styles.button_container}>
                        <button className='btnAdd' onClick={handleOpenModal}>AGREGAR SUCURSAL</button>
                    </div>
                </div>
            ) : (
                <div className={styles.noEnterpriseContainer}>
                    <div className={styles.noEnterpriseMessage}>
                        <h2>Seleccione una empresa para continuar</h2>
                        <p>Seleccione una empresa para ver las sucursales y realizar acciones adicionales.</p>
                    </div>
                </div>
            )}
        </>
    )
}

