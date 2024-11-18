import { FC } from 'react'
import { ISucursal } from '../../../types/dtos/sucursal/ISucursal'
import Styles from "./OfficeCard.module.css"
import { Button } from 'react-bootstrap'
import { useAppDispatch } from '../../../hooks/redux'
import { setActiveOfficeReducer } from '../../../redux/slices/ActiveOfficeReducer'
import noImage from "../../../assets/images/noImage.jpeg";
import { useNavigate } from 'react-router-dom'

interface IOfficeCardCard {
    office: ISucursal
    setDisplayOffice: Function
    setDisplayPopUpEditOffice: Function
}
export const OfficeCard: FC<IOfficeCardCard> = ({ office, setDisplayOffice, setDisplayPopUpEditOffice }) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleOpenModalSeeOffice = () => {
        setDisplayOffice(true)
        dispatch(setActiveOfficeReducer({ element: office }))
    }

    const handleOpenModalEditOffice = () => {
        setDisplayPopUpEditOffice(true)
        dispatch(setActiveOfficeReducer({ element: office }))
    }

    const handleNavigate = () => {
        navigate(`/admin`)
        dispatch(setActiveOfficeReducer({ element: office }))
    }

    return (
        <div className={Styles.main_container_card}>
            <div className={Styles.upperText_container}>
                {office?.nombre}
            </div>
            <div>
                <h1 className={Styles.open_and_close_times_container}>
                    {office?.horarioApertura} - {office?.horarioCierre}
                </h1>
            </div>
            <div>
                <img src={office?.logo ?? noImage} alt="Logo" />
            </div>
            <div className={Styles.buttons_container}>
                <Button variant="outline-success" onClick={handleNavigate}>
                    <span className="material-symbols-outlined">apartment</span>
                </Button>
                <Button variant="outline-primary" onClick={handleOpenModalEditOffice}>
                    <span className="material-symbols-outlined">edit</span>
                </Button>
                <Button variant="outline-warning" onClick={handleOpenModalSeeOffice}>
                    <span className="material-symbols-outlined">visibility</span>
                </Button>
            </div>
        </div>
    )
}
