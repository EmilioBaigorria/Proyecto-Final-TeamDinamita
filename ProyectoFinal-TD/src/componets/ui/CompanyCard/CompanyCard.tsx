import { FC } from 'react'
import { Button, Card } from 'react-bootstrap'
import { ICompany } from '../../../types/ICompany'
interface ICompanyCard{
    company:ICompany 
}
export const CompanyCard :FC<ICompanyCard> = ({company}) => {
return (
    <div>
        <Card style={{ 
            width: '15vw',
            height:"15vh",
        
            }}>
        <Card.Body style={{
            display:"flex",
            flexDirection:"column",
            justifyContent:"center",
            alignItems:"center",
            
        }}>
            <Card.Title >{company.name}</Card.Title>
            <div style={{
                width:"100%",
                height:"100%",
                display:"flex",
                flexDirection:"row",
                gap:"6rem"

            }}>
            <Button style={{
                border:"1px solid #54426B"
            }} variant="light">
                <span className="material-symbols-outlined">
                    visibility
                </span>
            </Button>
            <Button style={{
                border:"1px solid #54426B"
            }} variant="light">
                <span  className="material-symbols-outlined">
                    edit
                </span>
            </Button>
            </div>
        </Card.Body>
    </Card>
    </div>
)
}
