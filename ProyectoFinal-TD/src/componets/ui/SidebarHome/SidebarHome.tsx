
import { Button } from 'react-bootstrap'
import { ListCompany } from '../ListCompany/ListCompany'
//Por alguna razon no me toma los estilos 
// import styles from './SidebarHome.module.css'


export const SidebarHome = () => {
return (
    <div style={{
        backgroundColor:"#623CEA",
        width:"25vw",
        height:"100vh",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        gap:"1rem"
    }}>
        <div style={{
            marginTop:"1rem",
            color:"white",
            fontSize:"2rem"
        }}>Empresas</div>
        <Button variant="light" style={{
            color:"#8C4BF5"
        }  }>Agregar una empresa</Button>

        {/*Esta informacion es solo un placeholder*/}
        {/*Misteriosamente esta informacion se renderiza por encima del blur del modal*/}
        <ListCompany companyList={[{
            id :"1",
            name:"Capsule Corp",
            sR:"12123",
            cuit:"14232",
            logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHL5KYyweSzNrl-eztRVQQf-wi6HMxOlJAdg&s"
        },
        {
            id :"2",
            name:"Umbrella",
            sR:"12123",
            cuit:"14232",
            logo:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmPh18D98XMKGY638FFXKxthVOjbE6Za8fCQ&s"
        }
        ]}/>
    </div>
    
)
}
