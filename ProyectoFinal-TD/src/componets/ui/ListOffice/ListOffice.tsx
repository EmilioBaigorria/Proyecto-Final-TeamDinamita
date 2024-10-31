import { FC } from 'react'
import { ISucursal } from '../../../types/dtos/sucursal/ISucursal'

import { OfficeCard } from '../OfficeCard/OfficeCard'
import Styles from "./ListOffice.module.css"
interface IListOffice {
    offices: ISucursal[]
    setDisplayOffice: Function
}
export const ListOffice: FC<IListOffice> = ({ offices, setDisplayOffice }) => {
    return (
        <div className={Styles.main_map_container}>
            {
                offices.map((office) => (
                    <OfficeCard office={office} setDisplayOffice={setDisplayOffice} />
                ))
            }
        </div>
    )
}
