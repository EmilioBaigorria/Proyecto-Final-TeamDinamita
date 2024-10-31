
import { FC } from 'react'
import { ISucursal } from '../../../types/dtos/sucursal/ISucursal'
import Styles from "./OfficeCard.module.css"
import { Button } from 'react-bootstrap'


interface IOfficeCardCard{
    /*El null es unicamente para desarrollo hasta poder obtener infor de sucursal desde la db*/
    office:ISucursal 
}
export const OfficeCard: FC<IOfficeCardCard> = ({office}) => {
  return (
    <div className={Styles.main_container_card}>
        <div className={Styles.upperText_container}>
            {office?.nombre}
        </div>
        <div >
            <h1 className={Styles.open_and_close_times_container}>{office?.horarioApertura}-{office?.horarioCierre}</h1>
        </div>
        <div>
            {/*TO DO VERIFICAR ERROR*/}
            <img src={office?.empresa.logo} style={{width:"5rem"}} />
        </div>
        <div className={Styles.buttons_container}>
            <Button variant="outline-success">
            <span className="material-symbols-outlined">
                apartment
            </span>
            </Button>
            <Button variant="outline-primary">
                <span className="material-symbols-outlined">
                edit
                </span>
            </Button>
            <Button variant="outline-warning">
                <span className="material-symbols-outlined">
                visibility
                </span>
            </Button>
        </div>
    </div>
  )
}
