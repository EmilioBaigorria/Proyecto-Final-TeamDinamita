import { FC } from 'react'
import { ICompany } from '../../../types/ICompany'
import { CompanyCard } from '../CompanyCard/CompanyCard'
interface IListComapany{
    companyList:ICompany[]
}
export const ListCompany : FC<IListComapany> = ({companyList}) => {
return (
    <div style={{
        display:"flex",
        flexDirection:"column",
        gap:"1rem"
    }}>
        {
            companyList.map((company)=>(
                <CompanyCard company={company}/>
            ))
        }
    </div>
)
}
