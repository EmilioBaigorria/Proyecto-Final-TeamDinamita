import { Button } from "react-bootstrap"
import style from "./PopUpSeeOffice.module.css"
import { FC } from "react"
import { ISucursal } from "../../../types/dtos/sucursal/ISucursal"
import { useAppSelector } from "../../../hooks/redux"

const API_KEY = import.meta.env.VITE_API_KEY_GOOGLE_MAPS;

interface IPopUpSeeOffice {
    setDisplayPopUpOffice: Function
    displayPopUpOffice: boolean
}



export const PopUpSeeOffice: FC<IPopUpSeeOffice> = ({setDisplayPopUpOffice, displayPopUpOffice}) => {

    const activeOffice : ISucursal | null = useAppSelector(
        (state)=>state.ActiveOfficeReducer.activeOffice
    )

    // ! ! ! ! ! !
    // IMPORTANTE: La api key se debe configurar en el archivo .env variable VITE_API_KEY_GOOGLE_MAPS, por temas de seguridad.
    // ! ! ! ! ! !
    
    
    
    const mapDireccion = `${activeOffice?.domicilio.calle} ${activeOffice?.domicilio.numero}, ${activeOffice?.domicilio.localidad.nombre}, ${activeOffice?.domicilio.localidad.provincia.nombre}`
    const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${encodeURIComponent(mapDireccion)}`

    return (

        <div className={style.mainDiv} style={{display: displayPopUpOffice ? "flex" : "none"}}>
            <div className={style.popUpOffice}>

                <div className={style.insideText}>

                    <h2>{activeOffice?.empresa.nombre}</h2>
                    <div><img src={activeOffice?.logo} alt="Logo de la empresa" style={{ maxWidth: "200px", maxHeight: "100px" }}/></div>
                    <p>Sucursal: {activeOffice?.nombre}</p>
                    <p>Domicilio: {activeOffice?.domicilio.calle} {activeOffice?.domicilio.numero}, {activeOffice?.domicilio.localidad.nombre}, {activeOffice?.domicilio.localidad.provincia.nombre}, CP {activeOffice?.domicilio.cp}</p>
                    <div className={style.googleMapsAPI}>
                        <iframe
                            title="Google Maps"
                            src={mapUrl}
                            width="80%"
                            height="20%"
                            style={{ borderRadius: ".4rem" }}
                            loading="lazy"
                        ></iframe>
                    </div>
                    <p>Hora de apertura: {activeOffice?.horarioApertura}</p>
                    <p>Hora de cierre: {activeOffice?.horarioCierre}</p>
                    <p>¿Es casa matriz? {activeOffice?.esCasaMatriz ? "Si" : "No"}</p>

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
