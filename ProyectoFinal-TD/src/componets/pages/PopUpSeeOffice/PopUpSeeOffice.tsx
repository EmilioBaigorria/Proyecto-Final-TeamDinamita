import { Button } from "react-bootstrap"
import style from "./PopUpSeeOffice.module.css"
import { FC } from "react"
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal"
import { useAppSelector } from "../../../hooks/redux"

interface IPopUpSeeOffice {
    setDisplayPopUpOffice: Function
    displayPopUpOffice: boolean
}

export const PopUpSeeOffice: FC<IPopUpSeeOffice> = ({setDisplayPopUpOffice, displayPopUpOffice}) => {

    const activeOffice : ISucursal | null = useAppSelector(
        (state)=>state.ActiveOfficeReducer.activeOffice
    )

    return (

        <div className={style.mainDiv} style={{display: displayPopUpOffice ? "flex" : "none"}}>
            <div className={style.popUpOffice}>

                <div>

                    <h2>{activeOffice?.empresa.nombre}</h2>
                    <div>{activeOffice?.logo}</div>
                    <p>{activeOffice?.nombre}</p>
                    <p>Domicilio</p>
                    <div>Google maps</div>
                    <p>Hora apertura</p>
                    <p>Hora cierre</p>
                    <p>Casa matriz</p>

                    <Button variant="secondary" onClick={()=>{
                        setDisplayPopUpOffice(false)
                    }}>
                        Cerrar
                    </Button>

                </div>

            </div>
        </div>
  
    )
}
