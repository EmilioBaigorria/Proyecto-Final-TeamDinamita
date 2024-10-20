import { FC } from 'react'
import { ICompany } from '../../../types/ICompany'
import { CompanyCard } from '../CompanyCard/CompanyCard'
interface IListComapany{
    companyList:ICompany[]
}
export const ListCompany : FC<IListComapany> = ({companyList}) => {
return (
    <div>
        {
            companyList.map((company)=>(
                <CompanyCard company={company}/>
            ))
        }
    </div>
)
}
