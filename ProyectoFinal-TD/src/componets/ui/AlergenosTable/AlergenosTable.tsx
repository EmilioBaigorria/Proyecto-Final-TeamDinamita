import { FC } from "react"
import { IAlergenos } from "../../../types/dtos/alergenos/IAlergenos"
import { Button } from "react-bootstrap"
import styles from "./AlergenosTable.module.css"

interface IAlergenosTable{
    alergeno:IAlergenos
}

export const AlergenosTable: FC<IAlergenosTable> = ({alergeno}) => {
return (
    <>
    
        <div className={styles.main_container}>
            <div className={styles.main_upper_container}>
                <h3 style={{fontSize:"1.6rem"}}>{alergeno.denominacion}</h3>
                <div className={styles.buttons_container}>
                    <Button variant="light">
                        <span className="material-symbols-outlined">
                            visibility
                        </span>
                    </Button>
                    <Button variant="light">
                    <span className="material-symbols-outlined">
                        edit
                    </span>
                    </Button>
                    <Button variant="light">
                        <span className="material-symbols-outlined">
                            delete_forever
                        </span>
                    </Button>
                </div>
                
            </div>
            <div className={styles.main_dropdown_container}>
                    
            </div>
        </div>
    </>
)
}
