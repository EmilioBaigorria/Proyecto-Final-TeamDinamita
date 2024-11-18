import { FC } from 'react'
import { ISucursal } from '../../../types/dtos/sucursal/ISucursal'

import { OfficeCard } from '../OfficeCard/OfficeCard'
import styles from "./ListOffice.module.css"

interface IListOffice {
    offices: ISucursal[]
    setDisplayOffice: Function
    setDisplayPopUpEditOffice: Function

}
export const ListOffice: FC<IListOffice> = ({ offices, setDisplayOffice, setDisplayPopUpEditOffice }) => {

    return (
        <div className={styles.grid_container}>
            {offices.map((office) => (
                <OfficeCard 
                    key={office.id} 
                    office={office} 
                    setDisplayOffice={setDisplayOffice}
                    setDisplayPopUpEditOffice={setDisplayPopUpEditOffice} 
                />
            ))}
        </div>

        )
}
