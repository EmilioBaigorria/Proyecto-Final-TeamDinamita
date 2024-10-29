import  { FC } from 'react'
import { ISucursal } from '../../../types/dtos/sucursal/ISucursal'

import { OfficeCard } from '../OfficeCard/OfficeCard'
interface IListOffice{
    offices : ISucursal[]
}
export const ListOffice : FC<IListOffice> = ({offices}) => {
return (
    <div>
        {
            offices.map((office)=>(
                <OfficeCard office={office}/>
            ))
        }
    </div>
)
}
